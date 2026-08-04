(function () {
    'use strict';

    const progress = window.CS103Progress;
    const lectureId = progress ? progress.lectureIdFromPath(window.location.pathname) : Number((window.location.pathname.match(/lecture(\d+)/i) || [])[1]);

    const conceptTree = Array.isArray(window.CS103ConceptTree) ? window.CS103ConceptTree : [];
    const allConcepts = conceptTree.flatMap((phase) => phase.modules.flatMap((module) => module.concepts));
    const lectureConcepts = allConcepts.filter((concept) => concept.lecture === lectureId);
    const requestedConceptId = new URLSearchParams(window.location.search).get('concept');
    const requestedConcept = lectureConcepts.find((concept) => concept.id === requestedConceptId) || null;
    const lectureContext = (window.CS103LectureContexts && window.CS103LectureContexts[lectureId]) || null;
    const sessionPlan = (window.CS103SessionPlans && window.CS103SessionPlans[lectureId]) || null;
    const coreAuthoredSlides = sessionPlan ? new Set(sessionPlan) : null;
    let showReferenceSlides = new URLSearchParams(window.location.search).get('mode') === 'reference'
        || Boolean(requestedConcept && coreAuthoredSlides && !coreAuthoredSlides.has(requestedConcept.slide));
    const scheduleSession = window.CS103Schedule && window.CS103Schedule.sessions.find((session) => session.lectureId === lectureId);
    const themeStorageKey = 'cs103-theme';
    const embedded = window.self !== window.top;
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Catches browser-window fullscreen (F11 in Edge/Chrome, menu fullscreen)
    // which never sets document.fullscreenElement but should still present.
    const windowFullscreenQuery = window.matchMedia('(display-mode: fullscreen)');
    const sequence = progress?.lectureSequence || window.CS103Data?.lectureSequence || [];
    const sequenceIndex = sequence.findIndex((lecture) => lecture.id === lectureId);
    const scheduledSequence = scheduleSession ? scheduleSession.sequence : Math.max(1, sequenceIndex + 1);
    const lectureMeta = sequence[sequenceIndex] || { title: `Lecture ${lectureId}` };
    const previousLecture = sequenceIndex > 0 ? sequence[sequenceIndex - 1] : null;
    const nextLecture = sequenceIndex >= 0 && sequenceIndex < sequence.length - 1 ? sequence[sequenceIndex + 1] : null;
    const revealElement = document.querySelector('.reveal');
    let practiceSlide;
    let practiceObserver;
    let revealReady = false;
    let deckPrepared = false;
    let readerMode = false;
    let scrollFrame = 0;
    let preparationTimer = 0;
    let layoutSettleTimer = 0;

    document.body.classList.add('course-modern');
    if (embedded) document.body.classList.add('course-embedded');

    function preferredTheme() {
        const saved = window.localStorage.getItem(themeStorageKey);
        if (saved === 'dark' || saved === 'light') return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme, persist = false) {
        const normalized = theme === 'dark' ? 'dark' : 'light';
        document.documentElement.dataset.courseTheme = normalized;
        document.documentElement.style.colorScheme = normalized;
        document.body.dataset.courseTheme = normalized;
        if (persist) window.localStorage.setItem(themeStorageKey, normalized);
        const button = document.getElementById('course-theme-button');
        if (button) {
            const next = normalized === 'dark' ? 'light' : 'dark';
            button.innerHTML = icon('theme', `${next === 'dark' ? 'Dark' : 'Light'} mode`);
            button.setAttribute('aria-label', `Use ${next} mode`);
            button.setAttribute('aria-pressed', String(normalized === 'dark'));
            button.title = `Use ${next} mode`;
        }
    }

    applyTheme(document.documentElement.dataset.courseTheme || preferredTheme());

    function icon(name, label) {
        const glyphs = { home: '⌂', previous: '←', next: '→', complete: '✓', graph: '◇', fullscreen: '⛶', theme: document.documentElement.dataset.courseTheme === 'dark' ? '☀' : '◐' };
        return `<span class="course-control-icon" aria-hidden="true">${glyphs[name]}</span><span class="course-control-label">${label}</span>`;
    }

    function createDeckBar() {
        if (!revealElement || revealElement.querySelector('.course-deck-bar')) return;
        const bar = document.createElement('nav');
        bar.className = 'course-deck-bar';
        bar.setAttribute('aria-label', 'Lecture and slide navigation');
        bar.innerHTML = `
            <a class="course-deck-home" href="index.html" aria-label="Course home">${icon('home', 'Course')}</a>
            <a class="course-lecture-prev${previousLecture ? '' : ' is-disabled'}" href="${previousLecture ? previousLecture.file : '#'}" aria-label="${previousLecture ? `Previous lecture: ${previousLecture.title}` : 'No previous lecture'}">${icon('previous', 'Lecture')}</a>
            <button class="course-slide-prev" id="course-slide-prev" type="button" aria-label="Previous slide">${icon('previous', 'Slide')}</button>
            <span class="course-deck-title"><small id="course-deck-location">Session ${String(scheduledSequence).padStart(2, '0')} · preparing</small><strong>${lectureMeta.title}</strong></span>
            <button class="course-slide-next" id="course-slide-next" type="button" aria-label="Next slide">${icon('next', 'Slide')}</button>
            <a class="course-lecture-next${nextLecture ? '' : ' is-disabled'}" href="${nextLecture ? nextLecture.file : '#'}" aria-label="${nextLecture ? `Next lecture: ${nextLecture.title}` : 'No next lecture'}">${icon('next', 'Lecture')}</a>
            <button class="deck-complete-button" id="deck-complete-button" type="button">${icon('complete', 'Mark studied')}</button>
            <a class="course-speedrun-link" href="speedrun.html">${icon('graph', 'Graph')}</a>
            <button class="course-theme-button" id="course-theme-button" type="button">${icon('theme', 'Theme')}</button>
            <button class="course-fullscreen-button" id="course-fullscreen-button" type="button">${icon('fullscreen', 'Full screen')}</button>
        `;
        revealElement.appendChild(bar);

        bar.querySelector('#deck-complete-button').addEventListener('click', () => {
            if (!progress) return;
            if (progress.isComplete(lectureId)) progress.markIncomplete(lectureId);
            else progress.markComplete(lectureId);
            updateProgressUI();
        });
        bar.querySelector('#course-slide-prev').addEventListener('click', () => navigateSlide(-1));
        bar.querySelector('#course-slide-next').addEventListener('click', () => navigateSlide(1));
        bar.querySelector('#course-theme-button').addEventListener('click', () => applyTheme(document.documentElement.dataset.courseTheme === 'dark' ? 'light' : 'dark', true));
        bar.querySelector('#course-fullscreen-button').addEventListener('click', toggleFullscreen);
        applyTheme(document.documentElement.dataset.courseTheme || preferredTheme());

        const fullscreenSupported = Boolean(revealElement.requestFullscreen || revealElement.webkitRequestFullscreen);
        if (!fullscreenSupported) bar.querySelector('#course-fullscreen-button').hidden = true;
    }

    function authoredLeafSlides() {
        return leafSlides().filter((section) => !section.matches('.course-extra-slide, [data-course-context], [data-course-continuation]'));
    }

    function annotateAuthoredSlides() {
        authoredLeafSlides().forEach((section, index) => {
            section.dataset.courseAuthoredSlide = String(index + 1);
        });
    }

    function createNoviceOnboardingSlides() {
        if (lectureId !== 1) return [];
        const start = document.createElement('section');
        start.className = 'course-extra-slide course-novice-slide';
        start.innerHTML = `
            <span class="course-extra-kicker">First step · get a working setup</span>
            <h2>A safe setup gets you from the power button to your first command.</h2>
            <ol class="course-novice-steps">
                <li><strong>Power:</strong> press the computer’s power button once and wait.</li>
                <li><strong>Sign in:</strong> ask the instructor or TA if the machine requests credentials you do not have.</li>
                <li><strong>Pointer:</strong> move the mouse; single-click selects, double-click opens.</li>
                <li><strong>Keyboard:</strong> use Backspace to remove text and Enter to confirm a command.</li>
                <li><strong>Ask early:</strong> nothing here is assumed knowledge, and getting stuck is normal.</li>
            </ol>`;
        const screen = document.createElement('section');
        screen.className = 'course-extra-slide course-novice-slide';
        screen.innerHTML = `
            <span class="course-extra-kicker">Digital basics</span>
            <h2>Files, folders, browsers, and terminals make the first program possible.</h2>
            <div class="course-novice-grid">
                <article><strong>Window</strong><span>A rectangular area belonging to one application.</span></article>
                <article><strong>Browser</strong><span>The application used to open this course website.</span></article>
                <article><strong>File</strong><span>A named unit of saved information such as <code>hello.cpp</code>.</span></article>
                <article><strong>Folder</strong><span>A container used to organize files.</span></article>
                <article><strong>Terminal</strong><span>A text interface where commands such as <code>g++</code> are entered.</span></article>
            </div>`;
        return [start, screen];
    }

    function injectNoviceOnboardingSlides() {
        // Motivation before housekeeping: land these after the authored intro
        // block when a lecture has one, so students learn why programming
        // matters before being told where the power button is.
        // Scope to real slides: Reveal mirrors slide classes onto its
        // `.backgrounds` children, and appending into those is silently
        // discarded by the next sync.
        const intro = revealElement ? revealElement.querySelectorAll(':scope > .slides > .course-intro-slide') : [];
        const first = intro[intro.length - 1] || authoredLeafSlides()[0];
        if (!first) return;
        let after = first;
        createNoviceOnboardingSlides().forEach((slide) => {
            after.after(slide);
            after = slide;
        });
    }

    function markReferenceSlides() {
        if (!coreAuthoredSlides) return;
        document.querySelectorAll('[data-course-authored-slide]').forEach((section) => {
            const core = coreAuthoredSlides.has(Number(section.dataset.courseAuthoredSlide));
            section.classList.toggle('course-reference-slide', !core);
            if (!core) section.dataset.courseReference = 'true';
        });
    }

    function updateReferenceButton() {
        const button = document.getElementById('course-reference-toggle');
        if (!button) return;
        button.textContent = showReferenceSlides ? 'Use 55-minute core' : 'Show reference slides';
        button.setAttribute('aria-pressed', String(showReferenceSlides));
    }

    function setReferenceVisibility(show) {
        showReferenceSlides = Boolean(show);
        document.body.classList.toggle('course-show-reference', showReferenceSlides);
        document.body.classList.toggle('course-core-session', !showReferenceSlides);
        document.querySelectorAll('.course-reference-slide').forEach((section) => {
            section.hidden = !showReferenceSlides;
            if (!showReferenceSlides) {
                section.setAttribute('data-visibility', 'hidden');
                section.setAttribute('aria-hidden', 'true');
            } else {
                section.removeAttribute('data-visibility');
                section.removeAttribute('aria-hidden');
            }
        });
        updateReferenceButton();
        if (!window.Reveal || !revealReady) return;
        if (showReferenceSlides) paginateDeck();
        window.Reveal.sync();
        window.Reveal.layout();
        exposeReaderSlides();
        updateSlideUI(currentSlide());
    }

    function checkpointQuestions() {
        const terms = lectureConcepts.map((concept) => concept.term);
        const outcomes = lectureContext ? lectureContext.outcomes : [];
        const firstTerm = terms[0] || lectureMeta.title;
        const secondTerm = terms[1] || firstTerm;
        const lastTerm = terms[terms.length - 1] || firstTerm;
        const practicalTitle = document.querySelector('.practical-example-slide h2')?.textContent || lectureMeta.title;
        return [
            `Explain “${firstTerm}” in one sentence.`,
            firstTerm === secondTerm
                ? `What must be true before you can use today’s main idea safely?`
                : `How is “${secondTerm}” related to “${firstTerm}”?`,
            `Predict the first output of “${practicalTitle}”.`,
            `Give one normal, one boundary, and one invalid input for today’s code.`,
            outcomes[0]
                ? `Can you do this without notes: “${outcomes[0]}”?`
                : `When would you choose “${lastTerm}” — and when would you avoid it?`
        ];
    }

    function createCheckpointSlide(question, index) {
        const minute = (index + 1) * 10;
        const section = document.createElement('section');
        // Students see only the question; the session structure stays as
        // invisible metadata for the instructor and tooling.
        section.className = 'course-extra-slide course-checkpoint-slide';
        section.dataset.courseMinute = String(minute);
        section.dataset.courseCheckpoint = `${index + 1} of 5`;
        section.innerHTML = `
            <!-- Checkpoint ${index + 1} of 5 · minute ${minute} · think 30s → pair → share one sentence -->
            <h2>${question}</h2>`;
        return section;
    }

    function injectCheckpoints() {
        if (document.querySelector('[data-course-minute]')) return;
        const coreSlides = Array.from(document.querySelectorAll('[data-course-authored-slide]'))
            .filter((slide) => !slide.classList.contains('course-reference-slide'));
        if (!coreSlides.length) return;
        const questions = checkpointQuestions();
        questions.forEach((question, index) => {
            const anchorIndex = Math.min(coreSlides.length - 1, Math.ceil(((index + 1) * coreSlides.length) / questions.length) - 1);
            coreSlides[anchorIndex].after(createCheckpointSlide(question, index));
        });
    }

    function decorateConceptSlides() {
        const bySlide = new Map();
        lectureConcepts.forEach((concept) => {
            if (!bySlide.has(concept.slide)) bySlide.set(concept.slide, []);
            bySlide.get(concept.slide).push(concept);
        });
        bySlide.forEach((concepts, slide) => {
            const section = document.querySelector(`[data-course-authored-slide="${slide}"]`);
            if (!section || section.querySelector('.course-slide-reference')) return;
            const badge = document.createElement('div');
            badge.className = 'course-slide-reference';
            badge.setAttribute('aria-label', `Concept reference ${concepts[0].reference}`);
            badge.title = concepts.map((concept) => concept.title).join(' · ');
            badge.innerHTML = `<strong>${concepts[0].reference}</strong><span>${concepts.length} concept${concepts.length === 1 ? '' : 's'}</span>`;
            section.prepend(badge);
        });
    }

    function termPattern(value) {
        const escaped = String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return new RegExp(`(?<![\\p{L}\\p{N}_])${escaped}(?![\\p{L}\\p{N}_])`, 'iu');
    }

    function makeDefinedTerm(text, concept) {
        const term = document.createElement('dfn');
        const tooltip = document.createElement('span');
        const tooltipId = `definition-${concept.id}`;
        term.className = 'course-defined-term';
        term.tabIndex = 0;
        term.dataset.concept = concept.id;
        term.setAttribute('aria-describedby', tooltipId);
        term.append(document.createTextNode(text));
        tooltip.className = 'course-term-tooltip';
        tooltip.id = tooltipId;
        tooltip.setAttribute('role', 'tooltip');
        tooltip.textContent = concept.definition;
        term.appendChild(tooltip);
        return term;
    }

    function wrapFirstTechnicalTerm(section, concept) {
        const aliases = [concept.term, ...(concept.aliases || [])]
            .filter(Boolean)
            .sort((left, right) => right.length - left.length);
        const walker = document.createTreeWalker(section, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
                const parent = node.parentElement;
                if (!parent || parent.closest('pre, code, a, script, style, textarea, dfn, .course-slide-reference, .course-glossary-introductions')) return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            }
        });
        const textNodes = [];
        while (walker.nextNode()) textNodes.push(walker.currentNode);

        for (const alias of aliases) {
            const pattern = termPattern(alias);
            for (const textNode of textNodes) {
                const match = pattern.exec(textNode.nodeValue);
                if (!match) continue;
                const before = textNode.nodeValue.slice(0, match.index);
                const matched = textNode.nodeValue.slice(match.index, match.index + match[0].length);
                const after = textNode.nodeValue.slice(match.index + match[0].length);
                const fragment = document.createDocumentFragment();
                if (before) fragment.appendChild(document.createTextNode(before));
                fragment.appendChild(makeDefinedTerm(matched, concept));
                if (after) fragment.appendChild(document.createTextNode(after));
                textNode.replaceWith(fragment);
                return true;
            }
        }
        return false;
    }

    function decorateTechnicalTerms() {
        const conceptsBySlide = new Map();
        lectureConcepts.forEach((concept) => {
            if (!conceptsBySlide.has(concept.slide)) conceptsBySlide.set(concept.slide, []);
            conceptsBySlide.get(concept.slide).push(concept);
        });
        conceptsBySlide.forEach((concepts, slide) => {
            const section = document.querySelector(`[data-course-authored-slide="${slide}"]`);
            if (!section) return;
            const fallback = concepts.filter((concept) => !wrapFirstTechnicalTerm(section, concept));
            if (!fallback.length) return;
            const introductions = document.createElement('aside');
            introductions.className = 'course-glossary-introductions';
            introductions.setAttribute('aria-label', 'Technical terms introduced on this slide');
            const label = document.createElement('span');
            label.textContent = 'New terms';
            introductions.appendChild(label);
            fallback.forEach((concept) => introductions.appendChild(makeDefinedTerm(concept.term, concept)));
            section.appendChild(introductions);
        });

        const supplemental = Array.isArray(window.CS103SupplementalGlossary)
            ? window.CS103SupplementalGlossary.filter((entry) => entry.lecture === lectureId)
            : [];
        // Supporting vocabulary can first appear in generated onboarding,
        // learning-path, checkpoint, or practical-example slides. Walk the
        // complete rendered deck in reading order so the first visible use—not
        // merely the first authored Markdown use—receives the definition.
        const orderedSlides = leafSlides();
        supplemental.forEach((entry) => {
            for (const section of orderedSlides) {
                if (wrapFirstTechnicalTerm(section, entry)) break;
            }
        });
    }

    function focusRequestedConcept() {
        if (!requestedConcept || !window.Reveal) return;
        const target = document.querySelector(`[data-course-authored-slide="${requestedConcept.slide}"]`);
        if (!target) return;
        target.classList.add('course-requested-concept');
        if (readerMode) {
            target.scrollIntoView({ behavior: reduceMotionQuery.matches ? 'auto' : 'smooth', block: 'start' });
            updateSlideUI(target);
            return;
        }
        const indices = window.Reveal.getIndices(target);
        if (indices) window.Reveal.slide(indices.h, indices.v, indices.f);
    }

    function createNavigationSlide() {
        const section = document.createElement('section');
        section.className = 'course-extra-slide course-navigation-slide';
        section.setAttribute('data-course-navigation', String(lectureId));

        const kicker = document.createElement('span');
        kicker.className = 'course-extra-kicker';
        kicker.textContent = 'Course navigation';

        const heading = document.createElement('h2');
        heading.textContent = nextLecture ? `Choose the next step: ${nextLecture.title}.` : 'Choose a concept to revisit after the course.';

        const navigation = document.createElement('nav');
        navigation.className = 'lecture-end-nav';
        navigation.setAttribute('aria-label', 'End of lecture navigation');
        navigation.innerHTML = `
            ${previousLecture ? `<a href="${previousLecture.file}"><span>← Previous</span><strong>${previousLecture.title}</strong></a>` : '<span class="is-disabled">No previous lecture</span>'}
            ${nextLecture ? `<a href="${nextLecture.file}"><span>Next →</span><strong>${nextLecture.title}</strong></a>` : '<span class="is-disabled">No next lecture</span>'}
            <a href="index.html"><span>Course home</span><strong>Schedule & assessment</strong></a>
            <a href="speedrun.html"><span>Dependency graph</span><strong>Review prerequisites</strong></a>
        `;
        section.append(kicker, heading, navigation);
        return section;
    }

    function updateProgressUI() {
        if (!progress) return;
        const summary = progress.getSummary();
        const completeButton = document.getElementById('deck-complete-button');
        const complete = progress.isComplete(lectureId);
        if (completeButton) {
            completeButton.innerHTML = icon('complete', complete ? `Studied ${summary.completedCount}/${summary.total}` : `Study ${summary.completedCount}/${summary.total}`);
            completeButton.classList.toggle('is-complete', complete);
            completeButton.setAttribute('aria-pressed', String(complete));
            completeButton.setAttribute('aria-label', complete ? 'Mark this lecture not studied' : 'Mark this lecture studied');
        }
    }

    function markCompleteFromPractice() {
        if (progress && !progress.isComplete(lectureId)) progress.markComplete(lectureId);
        updateProgressUI();
    }

    function insertTextAtCaret(text) {
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const node = document.createTextNode(text);
        range.insertNode(node);
        range.setStartAfter(node);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    function caretOffset(element) {
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount || !element.contains(selection.anchorNode)) return element.textContent.length;
        const range = selection.getRangeAt(0).cloneRange();
        range.selectNodeContents(element);
        range.setEnd(selection.anchorNode, selection.anchorOffset);
        return range.toString().length;
    }

    function placeCaret(element, offset) {
        element.focus({ preventScroll: true });
        const node = element.firstChild || element.appendChild(document.createTextNode(''));
        const range = document.createRange();
        const selection = window.getSelection();
        range.setStart(node, Math.min(offset, node.textContent.length));
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    function enhanceCodeBlock(pre, editorIndex) {
        const code = pre.querySelector(':scope > code');
        if (!code || pre.closest('.course-code-editor')) return;
        const original = code.textContent.replace(/^\n/, '').replace(/\n\s*$/, '');
        const originalLines = original.split('\n');
        const languageClass = Array.from(code.classList).find((name) => /^(language-|lang-|cpp$|c\+\+$)/i.test(name));
        const language = languageClass ? languageClass.replace(/^(language-|lang-)/i, '').toUpperCase() : 'CODE';
        const editor = document.createElement('div');
        editor.className = 'course-code-editor';
        Array.from(pre.classList).forEach((className) => editor.classList.add(className));
        Array.from(pre.attributes).forEach((attribute) => {
            if (attribute.name.startsWith('data-') && attribute.name !== 'data-course-code-editor') editor.setAttribute(attribute.name, attribute.value);
        });
        editor.dataset.courseCodeEditor = String(editorIndex);
        editor.setAttribute('role', 'group');
        editor.setAttribute('aria-label', `${language} editable focus viewer`);
        editor.innerHTML = `
            <div class="course-code-toolbar">
                <strong>${language} editor</strong>
                <span>Editable · click or use ↑ ↓ to highlight a line</span>
                <button class="course-code-copy" type="button">Copy</button>
                <button class="course-code-reset" type="button">Reset</button>
            </div>
            <div class="course-code-viewport" tabindex="0" aria-label="Scrollable code"></div>
        `;
        const viewport = editor.querySelector('.course-code-viewport');

        function lineElements() {
            return Array.from(viewport.querySelectorAll('.course-code-line'));
        }

        function renumber() {
            lineElements().forEach((line, index) => {
                line.dataset.line = String(index);
                line.querySelector('.course-code-line-number').textContent = String(index + 1);
                line.querySelector('.course-code-line-text').setAttribute('aria-label', `Code line ${index + 1}`);
            });
        }

        function createLine(text) {
            const line = document.createElement('div');
            line.className = 'course-code-line';
            const number = document.createElement('span');
            number.className = 'course-code-line-number';
            number.setAttribute('aria-hidden', 'true');
            const editable = document.createElement('span');
            editable.className = 'course-code-line-text';
            editable.setAttribute('contenteditable', 'plaintext-only');
            editable.setAttribute('spellcheck', 'false');
            editable.setAttribute('autocapitalize', 'off');
            editable.setAttribute('role', 'textbox');
            editable.textContent = text || '';
            line.append(number, editable);
            return line;
        }

        function focusLine(index, shouldScroll) {
            const lines = lineElements();
            const clamped = Math.max(0, Math.min(index, lines.length - 1));
            lines.forEach((line, lineIndex) => {
                const distance = Math.abs(lineIndex - clamped);
                line.classList.toggle('is-active', distance === 0);
                line.classList.toggle('is-near', distance > 0 && distance <= 1);
            });
            if (shouldScroll !== false && lines[clamped]) {
                const top = lines[clamped].offsetTop - viewport.clientHeight / 2 + lines[clamped].offsetHeight / 2;
                viewport.scrollTo({ top: Math.max(0, top), behavior: reduceMotionQuery.matches ? 'auto' : 'smooth' });
            }
        }

        function restore() {
            viewport.replaceChildren(...originalLines.map(createLine));
            renumber();
            // No line pops until the presenter picks one, so diagrams and
            // untouched listings stay perfectly aligned by default.
        }

        viewport.addEventListener('focusin', (event) => {
            const line = event.target.closest('.course-code-line');
            if (line) focusLine(Number(line.dataset.line));
        });
        viewport.addEventListener('pointerdown', (event) => {
            const line = event.target.closest('.course-code-line');
            if (line) focusLine(Number(line.dataset.line));
        });
        viewport.addEventListener('keydown', (event) => {
            const editable = event.target.closest('.course-code-line-text');
            if (!editable) return;
            const line = editable.closest('.course-code-line');
            const index = Number(line.dataset.line);
            const lines = lineElements();
            if (event.key === 'Tab') {
                event.preventDefault();
                insertTextAtCaret('    ');
            } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                event.preventDefault();
                const targetIndex = Math.max(0, Math.min(lines.length - 1, index + (event.key === 'ArrowUp' ? -1 : 1)));
                const target = lines[targetIndex].querySelector('.course-code-line-text');
                placeCaret(target, Math.min(caretOffset(editable), target.textContent.length));
                focusLine(targetIndex);
            } else if (event.key === 'Enter') {
                event.preventDefault();
                const offset = caretOffset(editable);
                const value = editable.textContent;
                editable.textContent = value.slice(0, offset);
                const newLine = createLine(value.slice(offset));
                line.after(newLine);
                renumber();
                placeCaret(newLine.querySelector('.course-code-line-text'), 0);
                focusLine(index + 1);
            } else if (event.key === 'Backspace' && caretOffset(editable) === 0 && index > 0) {
                event.preventDefault();
                const previous = lines[index - 1].querySelector('.course-code-line-text');
                const previousLength = previous.textContent.length;
                previous.textContent += editable.textContent;
                line.remove();
                renumber();
                placeCaret(previous, previousLength);
                focusLine(index - 1);
            }
        });
        editor.querySelector('.course-code-copy').addEventListener('click', async (event) => {
            const value = lineElements().map((line) => line.querySelector('.course-code-line-text').textContent).join('\n');
            try {
                await navigator.clipboard.writeText(value);
                event.currentTarget.textContent = 'Copied';
                window.setTimeout(() => { event.currentTarget.textContent = 'Copy'; }, 1200);
            } catch (error) {
                console.warn('Clipboard access was unavailable.', error);
            }
        });
        editor.querySelector('.course-code-reset').addEventListener('click', restore);
        restore();
        pre.replaceWith(editor);
    }

    function enhanceCodeBlocks() {
        Array.from(document.querySelectorAll('.reveal .slides pre > code')).forEach((code, index) => enhanceCodeBlock(code.parentElement, index));
    }

    // The punchline waits for the presenter to advance: setup and beat land
    // first, then one arrow press delivers it. Reveal fragments keep their
    // layout space while hidden, so nothing shifts when it appears.
    function stageMemePunchlines() {
        document.querySelectorAll('.course-meme-punchline').forEach((punchline) => {
            punchline.classList.add('fragment', 'course-meme-reveal');
        });
    }

    function leafSlides() {
        return Array.from(document.querySelectorAll('.reveal .slides section')).filter((section) => {
            const leaf = !Array.from(section.children).some((child) => child.tagName === 'SECTION');
            const visibleReference = showReferenceSlides || !section.classList.contains('course-reference-slide');
            return leaf && visibleReference;
        });
    }

    function createMeasureStage() {
        let stage = document.querySelector('.course-measure-stage');
        if (stage) return stage;
        stage = document.createElement('div');
        stage.className = 'reveal course-measure-stage';
        stage.setAttribute('aria-hidden', 'true');
        stage.innerHTML = '<div class="slides"></div>';
        document.body.appendChild(stage);
        return stage;
    }

    function measureSlide(section) {
        const stage = createMeasureStage();
        const host = stage.querySelector('.slides');
        const clone = section.cloneNode(true);
        clone.classList.remove('present', 'past', 'future');
        clone.removeAttribute('hidden');
        clone.removeAttribute('aria-hidden');
        host.replaceChildren(clone);
        const measurement = {
            fits: clone.scrollHeight <= clone.clientHeight + 2 && clone.scrollWidth <= clone.clientWidth + 2,
            height: clone.scrollHeight,
            width: clone.scrollWidth
        };
        host.replaceChildren();
        return measurement;
    }

    function directHeading(section) {
        return Array.from(section.children).find((child) => /^H[1-3]$/.test(child.tagName));
    }

    function pageContentCount(section) {
        return Array.from(section.children).filter((child) => !child.matches('h1, h2, h3, .course-extra-kicker, .course-continuation-label, aside.notes, script, style')).length;
    }

    // A bare label such as `**Takeaways**` or an h4 introduces the block that
    // follows it. Splitting between the two strands the label on the old page
    // above dead space, so it travels with the content it announces.
    function isOrphanLabel(node) {
        if (!node) return false;
        if (node.matches('h4, h5, h6')) return true;
        return node.matches('p') && node.children.length === 1
            && node.firstElementChild.matches('strong, em, b, i')
            && node.textContent.trim() === node.firstElementChild.textContent.trim();
    }

    function adoptTrailingLabel(from, to) {
        const last = from.lastElementChild;
        if (!isOrphanLabel(last) || pageContentCount(from) < 2) return;
        to.appendChild(last);
    }

    function createContinuation(source, sourceHeading, after, part) {
        const continuation = document.createElement('section');
        Array.from(source.attributes).forEach((attribute) => {
            if (!['id', 'class', 'style', 'data-markdown', 'hidden', 'aria-hidden'].includes(attribute.name)) continuation.setAttribute(attribute.name, attribute.value);
        });
        Array.from(source.classList).filter((name) => !['present', 'past', 'future', 'stack'].includes(name)).forEach((name) => continuation.classList.add(name));
        continuation.classList.add('course-continuation-slide');
        continuation.dataset.courseContinuation = String(part);
        const label = document.createElement('span');
        label.className = 'course-continuation-label';
        label.textContent = `Part ${part}`;
        const heading = document.createElement(sourceHeading ? sourceHeading.tagName : 'h2');
        heading.textContent = `${sourceHeading ? sourceHeading.textContent.replace(/\s+· continued.*$/i, '') : lectureMeta.title} · continued`;
        continuation.append(label, heading);
        after.after(continuation);
        return continuation;
    }

    function splitList(block, current, nextPage) {
        const items = Array.from(block.children);
        if (!items.length) return null;
        const ordered = block.tagName === 'OL';
        const initialStart = Number(block.getAttribute('start') || 1);
        let consumed = 0;
        let list = block.cloneNode(false);
        list.replaceChildren();
        current.appendChild(list);
        items.forEach((item) => {
            list.appendChild(item);
            if (!measureSlide(current).fits && list.children.length > 1) {
                item.remove();
                current = nextPage(current);
                list = block.cloneNode(false);
                list.replaceChildren();
                if (ordered) list.setAttribute('start', String(initialStart + consumed));
                current.appendChild(list);
                list.appendChild(item);
            }
            consumed += 1;
        });
        return current;
    }

    function splitTable(block, current, nextPage) {
        const rows = Array.from(block.querySelectorAll('tbody > tr'));
        if (rows.length < 2) return null;
        const makeTable = () => {
            const table = block.cloneNode(false);
            const caption = block.querySelector(':scope > caption');
            const head = block.querySelector(':scope > thead');
            if (caption) table.appendChild(caption.cloneNode(true));
            if (head) table.appendChild(head.cloneNode(true));
            table.appendChild(document.createElement('tbody'));
            return table;
        };
        let table = makeTable();
        current.appendChild(table);
        rows.forEach((row) => {
            table.tBodies[0].appendChild(row);
            if (!measureSlide(current).fits && table.tBodies[0].rows.length > 1) {
                row.remove();
                current = nextPage(current);
                table = makeTable();
                current.appendChild(table);
                table.tBodies[0].appendChild(row);
            }
        });
        return current;
    }

    function splitContainer(block, current, nextPage) {
        const children = Array.from(block.children);
        const interactive = block.matches('[id], form') || block.querySelector('canvas, svg, form, script, style, [contenteditable], [id]');
        if (children.length < 2 || interactive) return null;
        let shell = block.cloneNode(false);
        shell.replaceChildren();
        current.appendChild(shell);
        children.forEach((child) => {
            shell.appendChild(child);
            if (!measureSlide(current).fits && shell.children.length > 1) {
                child.remove();
                current = nextPage(current);
                shell = block.cloneNode(false);
                shell.replaceChildren();
                current.appendChild(shell);
                shell.appendChild(child);
            }
        });
        return current;
    }

    function splitBlock(block, current, nextPage) {
        if (block.matches('ul, ol')) return splitList(block, current, nextPage);
        if (block.matches('table')) return splitTable(block, current, nextPage);
        if (block.matches('div, article, main')) return splitContainer(block, current, nextPage);
        return null;
    }

    function paginateSlide(section) {
        const heading = directHeading(section);
        const directChildren = Array.from(section.children);
        const headingIndex = heading ? directChildren.indexOf(heading) : -1;
        const movable = directChildren.filter((child, index) => index > headingIndex && !child.matches('aside.notes, script, style'));
        if (!movable.length) {
            section.classList.add('course-slide-dense');
            if (!measureSlide(section).fits) section.classList.add('course-slide-ultra-dense');
            return;
        }

        movable.forEach((child) => child.remove());
        let current = section;
        let part = 2;
        const nextPage = (after) => {
            const page = createContinuation(section, heading, after, part++);
            adoptTrailingLabel(after, page);
            return page;
        };

        movable.forEach((block) => {
            current.appendChild(block);
            if (measureSlide(current).fits) return;
            block.remove();
            if (pageContentCount(current) > 0) current = nextPage(current);
            current.appendChild(block);
            if (measureSlide(current).fits) return;
            block.remove();
            const lastSplitPage = splitBlock(block, current, nextPage);
            if (lastSplitPage) {
                current = lastSplitPage;
                if (!measureSlide(current).fits) current.classList.add('course-slide-dense');
                return;
            }
            current.appendChild(block);
            current.classList.add('course-slide-dense');
            if (!measureSlide(current).fits) current.classList.add('course-slide-ultra-dense');
            if (!measureSlide(current).fits) {
                block.classList.add('course-overflow-safety');
                console.warn('A complex interactive block required an internal safety scroller.', block);
            }
        });
    }

    function paginateDeck() {
        const originals = leafSlides().filter((section) => !section.matches('[data-course-continuation]'));
        originals.forEach((section) => {
            if (!measureSlide(section).fits) paginateSlide(section);
        });
        document.querySelector('.course-measure-stage')?.remove();
    }

    function fullscreenElement() {
        return document.fullscreenElement || document.webkitFullscreenElement || null;
    }

    function displayFullscreen() {
        return Boolean(fullscreenElement()) || windowFullscreenQuery.matches;
    }

    function updateFullscreenUI() {
        const active = displayFullscreen();
        document.body.classList.toggle('course-fullscreen', active);
        const button = document.getElementById('course-fullscreen-button');
        if (button) {
            button.innerHTML = icon('fullscreen', active ? 'Exit full screen' : 'Full screen');
            button.setAttribute('aria-label', active ? 'Exit full screen' : 'Enter full screen');
        }
    }

    async function toggleFullscreen() {
        try {
            if (fullscreenElement()) {
                const exit = document.exitFullscreen || document.webkitExitFullscreen;
                if (exit) await exit.call(document);
            } else {
                const request = revealElement.requestFullscreen || revealElement.webkitRequestFullscreen;
                if (request) await request.call(revealElement);
            }
        } catch (error) {
            console.warn('Full-screen mode was unavailable.', error);
        }
        // Chromium-based browsers (Edge, Chrome) sometimes complete the
        // transition without our fullscreenchange handler observing the final
        // state; re-check explicitly so the deck always switches modes.
        window.setTimeout(applyDisplayMode, 150);
    }

    // Reveal stamps every non-present slide hidden/aria-hidden. Reader mode
    // shows them all via CSS, so the attributes must go too or the scrolling
    // deck is invisible to assistive technology.
    function exposeReaderSlides() {
        if (!readerMode) return;
        leafSlides().forEach((section) => {
            section.removeAttribute('hidden');
            section.removeAttribute('aria-hidden');
        });
    }

    function nearestReaderSlide() {
        const slides = leafSlides();
        if (!slides.length) return null;
        const targetY = window.innerHeight * 0.34;
        return slides.reduce((nearest, slide) => {
            const distance = Math.abs(slide.getBoundingClientRect().top - targetY);
            return !nearest || distance < nearest.distance ? { slide, distance } : nearest;
        }, null).slide;
    }

    function currentSlide() {
        return readerMode ? nearestReaderSlide() : (window.Reveal && window.Reveal.getCurrentSlide ? window.Reveal.getCurrentSlide() : leafSlides()[0]);
    }

    function slidePosition(slide) {
        const slides = leafSlides();
        const index = Math.max(0, slides.indexOf(slide));
        return { index, total: slides.length };
    }

    function updateSlideUI(slide) {
        const active = slide || currentSlide();
        if (!active) return;
        const position = slidePosition(active);
        const location = document.getElementById('course-deck-location');
        const previous = document.getElementById('course-slide-prev');
        const next = document.getElementById('course-slide-next');
        const authored = Number(active.dataset.courseAuthoredSlide);
        const continuation = Number(active.dataset.courseContinuation);
        let reference = `Slide ${position.index + 1} of ${position.total}`;
        if (authored) reference = `L${String(lectureId).padStart(2, '0')} · S${String(authored).padStart(2, '0')}${continuation ? String.fromCharCode(95 + continuation) : ''}`;
        else if (active.matches('[data-course-context]')) reference = 'Learning path';
        else if (active.matches('[data-course-practice]')) reference = 'Practice set';
        else if (active.matches('[data-course-navigation]')) reference = 'Course navigation';
        else if (active.matches('.practical-example-slide')) reference = 'Practical application';
        if (location) location.textContent = `Session ${String(scheduledSequence).padStart(2, '0')} · ${reference}`;
        if (previous) previous.disabled = position.index === 0;
        if (next) next.disabled = position.index >= position.total - 1;
    }

    function navigateSlide(direction) {
        if (readerMode) {
            const slides = leafSlides();
            const active = nearestReaderSlide();
            const index = Math.max(0, slides.indexOf(active));
            const target = slides[Math.max(0, Math.min(slides.length - 1, index + direction))];
            if (target) target.scrollIntoView({ behavior: reduceMotionQuery.matches ? 'auto' : 'smooth', block: 'start' });
        } else if (window.Reveal) {
            if (direction < 0) window.Reveal.prev();
            else window.Reveal.next();
        }
    }

    function applyDisplayMode() {
        if (!revealReady || !window.Reveal) return;
        // Chromium can fire resize/fullscreenchange before the viewport
        // reaches its final size, leaving the deck laid out against stale
        // dimensions (letterboxed off-center). Re-run layout once settled.
        window.clearTimeout(layoutSettleTimer);
        layoutSettleTimer = window.setTimeout(() => {
            if (revealReady && window.Reveal && !readerMode) window.Reveal.layout();
        }, 320);
        const shouldRead = !embedded && !displayFullscreen();
        if (shouldRead === readerMode) {
            updateFullscreenUI();
            window.Reveal.layout();
            return;
        }
        const anchor = currentSlide();
        const indices = anchor && window.Reveal.getIndices ? window.Reveal.getIndices(anchor) : null;
        readerMode = shouldRead;
        document.body.classList.toggle('course-reader-mode', readerMode);
        document.documentElement.classList.toggle('course-reader-root', readerMode);
        window.Reveal.configure({
            width: 1920,
            height: 1080,
            margin: 0.018,
            minScale: 0.1,
            maxScale: 1,
            center: false,
            disableLayout: readerMode,
            controls: !readerMode,
            progress: !readerMode,
            keyboard: !readerMode,
            touch: !readerMode,
            slideNumber: readerMode ? false : 'c/t',
            scrollActivationWidth: null
        });
        if (!readerMode) {
            window.Reveal.sync();
            if (indices) window.Reveal.slide(indices.h, indices.v, indices.f);
            window.Reveal.layout();
        } else {
            exposeReaderSlides();
            window.requestAnimationFrame(() => {
                if (anchor) anchor.scrollIntoView({ block: 'start' });
                updateSlideUI(anchor);
            });
        }
        updateFullscreenUI();
        watchPracticeSlide();
    }

    function watchPracticeSlide() {
        if (practiceObserver) practiceObserver.disconnect();
        practiceSlide = document.querySelector(`[data-course-practice="${lectureId}"]`);
        if (!practiceSlide || !('IntersectionObserver' in window)) return;
        practiceObserver = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.55)) markCompleteFromPractice();
        }, { threshold: [0.55] });
        practiceObserver.observe(practiceSlide);
    }

    function prepareDeck() {
        if (deckPrepared || !revealReady || !window.Reveal) return;
        deckPrepared = true;
        window.clearTimeout(preparationTimer);
        decorateConceptSlides();
        decorateTechnicalTerms();
        enhanceCodeBlocks();
        stageMemePunchlines();
        paginateDeck();
        window.Reveal.sync();
        window.Reveal.layout();
        updateSlideUI(window.Reveal.getCurrentSlide());
        applyDisplayMode();
        watchPracticeSlide();
        if (requestedConcept) window.requestAnimationFrame(focusRequestedConcept);
    }

    function onRevealReady() {
        if (revealReady) return;
        revealReady = true;
        try {
            window.Reveal.configure({
                width: 1920,
                height: 1080,
                margin: 0.018,
                minScale: 0.1,
                maxScale: 1,
                center: false,
                controls: true,
                controlsTutorial: false,
                progress: true,
                hash: true,
                touch: true,
                slideNumber: 'c/t',
                transition: 'fade',
                backgroundTransition: 'fade',
                scrollActivationWidth: null
            });
            window.Reveal.on('slidechanged', (event) => {
                updateSlideUI(event.currentSlide);
                if (event.currentSlide && event.currentSlide.matches('[data-course-practice]')) markCompleteFromPractice();
            });
        } catch (error) {
            console.warn('Reveal configuration could not be synchronized.', error);
        }
        if (document.readyState === 'complete') window.requestAnimationFrame(prepareDeck);
        else window.addEventListener('load', () => window.requestAnimationFrame(prepareDeck), { once: true });
        preparationTimer = window.setTimeout(prepareDeck, 1800);
    }

    function handleReaderScroll() {
        if (!readerMode || scrollFrame) return;
        scrollFrame = window.requestAnimationFrame(() => {
            scrollFrame = 0;
            updateSlideUI(nearestReaderSlide());
        });
    }

    annotateAuthoredSlides();
    markReferenceSlides();
    setReferenceVisibility(showReferenceSlides);
    injectNoviceOnboardingSlides();
    injectCheckpoints();
    createDeckBar();
    updateProgressUI();

    if (window.Reveal && typeof window.Reveal.on === 'function') {
        if (typeof window.Reveal.isReady === 'function' && window.Reveal.isReady()) onRevealReady();
        else window.Reveal.on('ready', onRevealReady);
    }

    window.addEventListener('cs103:progresschange', updateProgressUI);
    window.addEventListener('scroll', handleReaderScroll, { passive: true });
    window.addEventListener('resize', applyDisplayMode, { passive: true });
    window.addEventListener('orientationchange', applyDisplayMode, { passive: true });
    window.addEventListener('storage', (event) => {
        if (event.key === themeStorageKey && (event.newValue === 'light' || event.newValue === 'dark')) applyTheme(event.newValue);
    });
    document.addEventListener('fullscreenchange', applyDisplayMode);
    document.addEventListener('webkitfullscreenchange', applyDisplayMode);
    if (typeof windowFullscreenQuery.addEventListener === 'function') windowFullscreenQuery.addEventListener('change', applyDisplayMode);
    document.addEventListener('keydown', (event) => {
        if (!event.shiftKey) {
            const typing = event.target.closest?.('input, textarea, select, [contenteditable="true"], [contenteditable="plaintext-only"]');
            if (!typing && event.key.toLowerCase() === 'f' && readerMode) {
                event.preventDefault();
                toggleFullscreen();
            }
            return;
        }
        if (event.key === 'ArrowLeft' && previousLecture) window.location.assign(previousLecture.file);
        if (event.key === 'ArrowRight' && nextLecture) window.location.assign(nextLecture.file);
    });
}());
