// Semi, the semicolon from the course video, walks to the concept a slide is about, points at
// it, and acts out the kind of slide: cheers on polls, worries over common errors, dances on
// practical examples. The poses come from the character sheet in assets/mascot/.
// lecture-modern.js loads it on every deck. It is an overlay: no slide content changes.
// A slide may name its concept with data-mascot-target (a CSS selector inside the slide), add
// a short hint with data-mascot-say, and choose a mood with data-mascot-mood. Without a target,
// Semi points at the first glossary term on the slide. Press "m" to hide or show Semi.
(function () {
    'use strict';

    const storageKey = 'cs103-mascot-hidden';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const width = 92;
    const height = 112;
    const runtime = document.currentScript && document.currentScript.src;
    const base = runtime ? runtime.replace(/lecture-mascot\.js(\?.*)?$/, 'assets/mascot/') : 'assets/mascot/';
    // Each mood is a loop of poses from the character sheet: [files, milliseconds per frame].
    // The art faces right, so Semi is mirrored whenever the concept is on the left.
    const poses = {
        point: [['semi-point.png'], 0],
        pointUp: [['semi-point-up.png'], 0],
        listen: [['semi-sit.png', 'semi-sit.png', 'semi-calm.png'], 1600],
        think: [['semi-think.png', 'semi-think.png', 'semi-idea.png'], 1200],
        ask: [['semi-question.png', 'semi-shrug.png', 'semi-confused.png'], 1300],
        wave: [['semi-wave.png', 'semi-wave.png', 'semi-blink.png', 'semi-brows.png', 'semi-wink.png', 'semi-surprised-wave.png'], 450],
        cheer: [['semi-cheer.png', 'semi-sparkle.png', 'semi-laugh.png'], 450],
        proud: [['semi-thumbs.png', 'semi-present.png', 'semi-arms-crossed.png'], 1300],
        excited: [['semi-dance.png', 'semi-crouch.png', 'semi-present.png'], 400],
        worry: [['semi-shock.png', 'semi-surprised.png', 'semi-sad.png'], 900],
        fly: [['semi-walk-1.png', 'semi-run-1.png', 'semi-walk-2.png', 'semi-run-2.png'], 140]
    };
    const moods = ['point', 'listen', 'think', 'ask', 'wave', 'cheer', 'proud', 'excited', 'worry'];
    // Headings would be noise; only the concept itself gets the highlight ring.
    const noRing = 'h1, h2, h3';

    function readHidden() {
        try { return window.localStorage.getItem(storageKey) === '1'; } catch (error) { return false; }
    }

    function writeHidden(value) {
        try { window.localStorage.setItem(storageKey, value ? '1' : '0'); } catch (error) { /* per-viewer convenience only */ }
    }

    const style = document.createElement('style');
    style.textContent = `
.course-mascot{position:fixed;left:0;top:0;width:${width}px;height:${height}px;z-index:40;pointer-events:none;
  transition:transform .9s cubic-bezier(.45,.05,.3,1),opacity .3s;will-change:transform}
.course-mascot[hidden]{display:block;opacity:0}
.course-mascot .cm-body{position:absolute;inset:0;transform-origin:50% 100%;animation:cm-idle 2.6s ease-in-out infinite}
.course-mascot .cm-sprite{position:absolute;inset:0;transform-origin:50% 100%}
.course-mascot.is-flipped .cm-sprite{transform:scaleX(-1)}
.course-mascot img{width:100%;height:100%;object-fit:contain;object-position:50% 100%;filter:drop-shadow(0 5px 6px rgba(0,0,0,.28))}
.course-mascot.is-flying .cm-body{animation:cm-fly .9s ease-in-out}
.course-mascot.mood-point .cm-body,.course-mascot.mood-think .cm-body,.course-mascot.mood-ask .cm-body{animation:cm-wiggle 1.6s ease-in-out infinite}
.course-mascot.mood-listen .cm-body{animation:cm-nod 2.4s ease-in-out infinite}
.course-mascot.mood-cheer .cm-body,.course-mascot.mood-proud .cm-body{animation:cm-jump .75s cubic-bezier(.3,0,.4,1) infinite}
.course-mascot.mood-excited .cm-body,.course-mascot.mood-wave .cm-body{animation:cm-bounce .5s ease-in-out infinite}
.course-mascot.mood-worry .cm-body{animation:cm-shiver .45s ease-in-out infinite}
.course-mascot .cm-extra{position:absolute;font:800 22px/1 Inter,system-ui,sans-serif;opacity:0;transition:opacity .3s}
.course-mascot .cm-q{right:-6px;top:-4px;color:#f2a516;-webkit-text-stroke:1px #5b3416}
.course-mascot .cm-drop{left:8px;top:10px;font-size:18px}
.course-mascot .cm-stars{inset:-10px;font-size:16px;color:#ffd23a}
.course-mascot .cm-stars span{position:absolute}
.course-mascot.mood-think .cm-q{opacity:1;animation:cm-float 1.6s ease-in-out infinite}
.course-mascot.mood-worry .cm-drop{animation:cm-drip 1.4s ease-in infinite}
.course-mascot.mood-cheer .cm-stars,.course-mascot.mood-proud .cm-stars{animation:cm-twinkle .9s ease-in-out infinite}
.course-mascot .cm-bubble{position:absolute;bottom:${height + 6}px;left:50%;transform:translateX(-50%);white-space:nowrap;
  font:600 15px/1.3 Inter,system-ui,sans-serif;padding:5px 11px;border-radius:12px;color:#5a2a00;
  background:#fff3d6;border:2px solid #e8a33a;box-shadow:0 3px 8px rgba(0,0,0,.18);opacity:0;transition:opacity .3s ease .8s}
:root[data-theme="dark"] .course-mascot .cm-bubble{color:#ffe7b8;background:#3a2810;border-color:#d68f22}
.course-mascot.has-bubble:not(.is-flying) .cm-bubble{opacity:1}
.course-mascot-target{outline:3px solid rgba(240,165,40,.9);outline-offset:6px;border-radius:8px;animation:cm-glow 1.6s ease-in-out 2}
@keyframes cm-idle{0%,100%{transform:translateY(0) scale(1,1)}50%{transform:translateY(-3px) scale(.98,1.02)}}
@keyframes cm-wiggle{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg) translateY(-2px)}}
@keyframes cm-nod{0%,100%{transform:rotate(0)}50%{transform:rotate(5deg) translateY(2px)}}
@keyframes cm-jump{0%,100%{transform:translateY(0) scale(1.08,.92)}40%{transform:translateY(-16px) scale(.95,1.06)}70%{transform:translateY(-5px) scale(1,1)}}
@keyframes cm-bounce{0%,100%{transform:translateY(0) scale(1.04,.96)}50%{transform:translateY(-7px) scale(.97,1.03)}}
@keyframes cm-shiver{0%,100%{transform:translateX(0) rotate(0)}25%{transform:translateX(-2px) rotate(-2deg)}75%{transform:translateX(2px) rotate(2deg)}}
@keyframes cm-fly{0%{transform:rotate(0) scale(1)}30%{transform:rotate(-10deg) scale(1.05)}100%{transform:rotate(0) scale(1)}}
@keyframes cm-blink{0%,90%,100%{transform:scaleY(0)}93%{transform:scaleY(1)}96%{transform:scaleY(0)}}
@keyframes cm-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes cm-drip{0%{transform:translateY(-2px);opacity:0}20%{opacity:1}100%{transform:translateY(12px);opacity:0}}
@keyframes cm-twinkle{0%,100%{opacity:1}50%{opacity:.3}}
@keyframes cm-glow{0%,100%{outline-color:rgba(240,165,40,.9)}50%{outline-color:rgba(240,165,40,.3)}}
@media (prefers-reduced-motion: reduce){.course-mascot{transition:none}.course-mascot *,.course-mascot-target{animation:none!important}}
@media print{.course-mascot{display:none}}`;
    document.head.appendChild(style);

    const mascot = document.createElement('div');
    mascot.className = 'course-mascot';
    mascot.setAttribute('aria-hidden', 'true');
    mascot.innerHTML = `<span class="cm-bubble"></span>
<div class="cm-body"><div class="cm-sprite"><img alt="" src="${base}semi-wave.png">
</div>
<span class="cm-extra cm-q">?</span><span class="cm-extra cm-drop">💧</span>
<span class="cm-extra cm-stars"><span style="left:0;top:20px">✦</span><span style="right:0;top:6px">✦</span><span style="right:4px;bottom:30px">✧</span><span style="left:6px;bottom:44px">✧</span></span></div>`;
    document.body.appendChild(mascot);
    const bubble = mascot.querySelector('.cm-bubble');
    const sprite = mascot.querySelector('img');
    Object.values(poses).flatMap(([files]) => files).forEach((file) => { new Image().src = base + file; });

    let hidden = readHidden();
    let target = null;
    let shownSlide = null;
    let mood = 'point';
    let loop = 0;
    let flyTimer = 0;
    let scrollFrame = 0;
    mascot.hidden = hidden;

    function showPose(name) {
        window.clearInterval(loop);
        const [frames, every] = poses[name];
        let frame = 0;
        sprite.src = base + frames[0];
        if (frames.length > 1 && !reducedMotion) {
            loop = window.setInterval(() => {
                frame = (frame + 1) % frames.length;
                sprite.src = base + frames[frame];
            }, every);
        }
    }

    // Full screen uses Reveal's current slide; the windowed reader mode scrolls, so the
    // current slide is the first one still filling the upper part of the viewport.
    function currentSlide() {
        if (document.body.classList.contains('course-reader-mode')) {
            const line = window.innerHeight * 0.35;
            const slides = Array.from(document.querySelectorAll('.reveal .slides section'))
                .filter((section) => !section.querySelector('section'));
            return slides.find((section) => {
                const r = section.getBoundingClientRect();
                return r.height > 0 && r.bottom > line;
            }) || null;
        }
        return window.Reveal && window.Reveal.getCurrentSlide ? window.Reveal.getCurrentSlide() : null;
    }

    function visible(el) {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
    }

    function pickTarget(slide) {
        const wanted = slide.getAttribute('data-mascot-target');
        if (wanted) {
            const found = Array.from(slide.querySelectorAll(wanted)).find(visible);
            if (found) return found;
        }
        return Array.from(slide.querySelectorAll('.course-defined-term')).find(visible) || null;
    }

    // The kind of slide decides how Semi behaves; a slide can override it with data-mascot-mood.
    function moodFor(slide) {
        const chosen = slide.getAttribute('data-mascot-mood');
        if (moods.includes(chosen)) return chosen;
        const heading = (slide.querySelector('h1, h2') || {}).textContent || '';
        if (slide.matches('.course-poll-slide') || /^(poll|quick check)/i.test(heading)) return 'cheer';
        if (slide.matches('.course-story-slide')) return 'listen';
        if (slide.matches('.course-bridge-slide, .lab-practice-slide')) return 'wave';
        if (/^questions/i.test(heading)) return 'ask';
        if (slide.matches('.course-syntax-slide')) return 'think';
        if (slide.matches('.practical-example-slide')) return 'excited';
        if (/error|mistake|pitfall/i.test(heading)) return 'worry';
        if (/^summary/i.test(heading)) return 'proud';
        return 'point';
    }

    function setMood(name) {
        mood = name;
        moods.forEach((each) => mascot.classList.toggle(`mood-${each}`, each === name));
    }

    // Everything Semi must not cover: the slide's content, the deck's own controls, and the
    // course navigation bar.
    const contentSelector = 'h1, h2, h3, p, li, pre, table, figure, img, svg, blockquote, .course-code-editor, .course-stepper-controls, .course-concept-badge';
    const chromeSelector = '.reveal .controls, .reveal .slide-number, .reveal .progress, .course-deck-bar';

    // The windowed reader mode shows neighboring slides above and below, so all of them count;
    // full screen shows one slide (the others are stacked, hidden, at the same place).
    function blockedRects() {
        const own = (el) => mascot.contains(el);
        const reader = document.body.classList.contains('course-reader-mode');
        const content = (reader ? Array.from(document.querySelectorAll('.reveal .slides section')) : [shownSlide])
            .filter((section) => section && !section.querySelector('section') && visible(section))
            .flatMap((section) => Array.from(section.querySelectorAll(contentSelector)))
            .filter((el) => !own(el));
        const chrome = Array.from(document.querySelectorAll(chromeSelector)).filter((el) => !own(el));
        return content.concat(chrome).map((el) => el.getBoundingClientRect()).filter((r) => r.width > 0 && r.height > 0);
    }

    function overlaps(box, rects) {
        return rects.some((r) => box.left < r.right + 6 && box.right > r.left - 6 && box.top < r.bottom + 6 && box.bottom > r.top - 6);
    }

    // Semi plus the speech bubble above it, for a mascot whose top-left corner is at (x, y).
    function footprint(x, y, talking) {
        const bw = talking ? Math.max(width, bubble.offsetWidth) : width;
        const bh = talking ? bubble.offsetHeight + 6 : 0;
        return { left: x + width / 2 - bw / 2, right: x + width / 2 + bw / 2, top: y - bh, bottom: y + height };
    }

    // The free spot nearest the concept: try the four sides first, then scan the screen.
    function freeSpot(focus, talking) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const rects = blockedRects();
        const fits = (x, y) => {
            const box = footprint(x, y, talking);
            return box.left >= 4 && box.right <= vw - 4 && box.top >= 4 && box.bottom <= vh - 4 && !overlaps(box, rects);
        };
        const cx = focus.left + focus.width / 2;
        const cy = focus.top + Math.min(focus.height, 120) / 2;
        const sides = [
            [focus.left - width - 14, cy - height / 2],
            [focus.right + 14, cy - height / 2],
            [cx - width / 2, focus.bottom + 10],
            [cx - width / 2, focus.top - height - 10]
        ];
        const side = sides.find(([x, y]) => fits(x, y));
        if (side) return side;
        let best = null;
        let bestDistance = Infinity;
        for (let y = 4; y + height <= vh - 4; y += 16) {
            for (let x = 4; x + width <= vw - 4; x += 16) {
                const d = Math.hypot(x + width / 2 - cx, y + height / 2 - cy);
                if (d < bestDistance && fits(x, y)) { best = [x, y]; bestDistance = d; }
            }
        }
        return best;
    }

    function place() {
        if (hidden || !shownSlide) return;
        const host = document.fullscreenElement || document.webkitFullscreenElement || document.body;
        if (mascot.parentElement !== host) host.appendChild(mascot);
        const r = target ? target.getBoundingClientRect() : null;
        // With no concept to point at, Semi heads for the slide's lower-left corner.
        const s = shownSlide.getBoundingClientRect();
        const corner = { left: s.left, right: s.left, top: s.bottom - height, bottom: s.bottom, width: 0, height };
        const say = Boolean(bubble.textContent);
        let spot = say ? freeSpot(r || corner, true) : null;
        // The hint is optional: in a narrow margin Semi still comes, without the speech bubble.
        const talking = Boolean(spot);
        if (!spot) spot = freeSpot(r || corner, false);
        mascot.classList.toggle('has-bubble', say && talking);
        // No free space on this screen (a full slide): step aside rather than cover anything.
        mascot.style.opacity = spot ? '' : '0';
        if (!spot) return;
        const [x, y] = spot;
        mascot.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
        // The art faces right with its waving hand on the right; mirror it toward a concept on the left.
        mascot.classList.toggle('is-flipped', Boolean(r) && r.left + Math.min(r.width, 160) / 2 < x + width / 2);
        // Point up at a concept above Semi's head, straight ahead otherwise.
        if (mood === 'point' && !mascot.classList.contains('is-flying')) {
            showPose(r && r.top + Math.min(r.height, 120) / 2 < y ? 'pointUp' : 'point');
        }
    }

    function fly() {
        if (reducedMotion) {
            showPose(mood);
            return;
        }
        mascot.classList.add('is-flying');
        showPose('fly');
        window.clearTimeout(flyTimer);
        flyTimer = window.setTimeout(() => {
            mascot.classList.remove('is-flying');
            showPose(mood);
            place();
        }, 900);
    }

    function update() {
        const slide = currentSlide();
        shownSlide = slide;
        document.querySelectorAll('.course-mascot-target').forEach((el) => el.classList.remove('course-mascot-target'));
        if (!slide || hidden) return;
        target = pickTarget(slide);
        const say = slide.getAttribute('data-mascot-say') || '';
        bubble.textContent = say;
        setMood(moodFor(slide));
        fly();
        // Wait for the slide's own scroll and transition to settle before measuring.
        window.setTimeout(() => {
            place();
            if (target && !target.matches(noRing)) target.classList.add('course-mascot-target');
        }, reducedMotion ? 0 : 350);
    }

    function start() {
        update();
        window.Reveal.on('slidechanged', update);
        window.addEventListener('resize', place);
        // Only the full-screen element's subtree is drawn in full screen, so place() moves Semi
        // into it; it also re-checks on every update, for browsers that switch silently.
        const followFullscreen = () => window.setTimeout(update, 400);
        document.addEventListener('fullscreenchange', followFullscreen);
        document.addEventListener('webkitfullscreenchange', followFullscreen);
        window.addEventListener('scroll', () => {
            window.cancelAnimationFrame(scrollFrame);
            scrollFrame = window.requestAnimationFrame(() => (currentSlide() === shownSlide ? place() : update()));
        }, { passive: true, capture: true });
        document.addEventListener('keydown', (event) => {
            if (event.key !== 'm' || event.metaKey || event.ctrlKey || event.altKey) return;
            if (event.target.closest && event.target.closest('input, textarea, [contenteditable="true"]')) return;
            hidden = !hidden;
            writeHidden(hidden);
            mascot.hidden = hidden;
            update();
        });
    }

    if (!window.Reveal) return;
    if (window.Reveal.isReady && window.Reveal.isReady()) start();
    else window.Reveal.on('ready', start);
}());
