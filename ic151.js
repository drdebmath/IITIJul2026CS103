(function () {
    'use strict';

    const timeZone = 'Asia/Kolkata';
    const timeEndpoint = 'https://gettimeapi.dev/v1/time?timezone=Asia%2FKolkata';
    const batches = {
        B1: { day: 'Monday', start: '08:30', end: '11:25', finalDate: '2026-11-16', dates: ['2026-08-10', '2026-08-17', '2026-08-24', '2026-08-31', '2026-09-07', '2026-09-14', '2026-10-05', '2026-10-12', '2026-10-19', '2026-10-26', '2026-11-02', '2026-11-09'] },
        B2: { day: 'Monday', start: '13:30', end: '16:25', finalDate: '2026-11-16', dates: ['2026-08-10', '2026-08-17', '2026-08-24', '2026-08-31', '2026-09-07', '2026-09-14', '2026-10-05', '2026-10-12', '2026-10-19', '2026-10-26', '2026-11-02', '2026-11-09'] },
        B3: { day: 'Thursday', start: '08:30', end: '11:25', finalDate: '2026-11-19', dates: ['2026-08-06', '2026-08-13', '2026-08-20', '2026-08-27', '2026-09-03', '2026-09-10', '2026-10-08', '2026-10-15', '2026-10-22', '2026-10-29', '2026-11-05', '2026-11-12'] },
        B4: { day: 'Saturday', start: '13:30', end: '16:25', finalDate: '2026-11-21', dates: ['2026-08-08', '2026-08-22', '2026-08-29', '2026-09-05', '2026-09-12', '2026-09-17', '2026-10-10', '2026-10-17', '2026-10-24', '2026-10-31', '2026-11-07', '2026-11-14'] }
    };

    function meetingDate(batch, index, boundary) {
        const data = batches[batch];
        return new Date(`${data.dates[index]}T${boundary === 'end' ? data.end : data.start}:00+05:30`);
    }

    function formatDate(value) {
        return new Intl.DateTimeFormat('en-IN', { timeZone, weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).format(value);
    }

    function renderSchedule() {
        const body = document.getElementById('lab-schedule-body');
        if (!body) return;
        body.innerHTML = Array.from({ length: 12 }, (_, index) => `<tr>
            <th scope="row">${String(index + 1).padStart(2, '0')}</th>
            ${Object.keys(batches).map((batch) => {
                const date = meetingDate(batch, index, 'start');
                const special = batch === 'B4' && batches[batch].dates[index] === '2026-09-17';
                return `<td${special ? ' class="special-date"' : ''}><strong>${formatDate(date)}</strong><span>${batches[batch].start}–${batches[batch].end}${special ? ' · Saturday slot on Thursday' : ''}</span></td>`;
            }).join('')}
        </tr>`).join('');
    }

    function allMeetings(selection) {
        const keys = selection === 'ALL' ? Object.keys(batches) : [selection];
        return keys.flatMap((batch) => {
            const regular = batches[batch].dates.map((date, index) => ({ batch, index, kind: 'lab', date: meetingDate(batch, index, 'start'), end: meetingDate(batch, index, 'end') }));
            const data = batches[batch];
            const final = {
                batch,
                index: 12,
                kind: 'final',
                date: new Date(`${data.finalDate}T${data.start}:00+05:30`),
                end: new Date(`${data.finalDate}T${data.end}:00+05:30`)
            };
            return [...regular, final];
        }).sort((left, right) => left.date - right.date);
    }

    function renderNextLab(now, source) {
        const picker = document.getElementById('batch-picker');
        const title = document.getElementById('next-lab-title');
        const meta = document.getElementById('next-lab-meta');
        if (!picker || !title || !meta) return;
        const upcoming = allMeetings(picker.value).find((meeting) => meeting.end > now);
        if (!upcoming) {
            title.textContent = 'All twelve scheduled labs are complete.';
            meta.textContent = source;
            return;
        }
        const data = batches[upcoming.batch];
        const live = now >= upcoming.date && now <= upcoming.end;
        title.textContent = `${live ? 'Live now · ' : ''}Batch ${upcoming.batch} · ${upcoming.kind === 'final' ? 'Final lab examination' : `Lab ${String(upcoming.index + 1).padStart(2, '0')}`}`;
        meta.textContent = `${formatDate(upcoming.date)} · ${data.start}–${data.end} IST · CITC first floor · ${source}`;
    }

    async function queryTime() {
        const response = await fetch(timeEndpoint, { cache: 'no-store' });
        if (!response.ok) throw new Error(`Time service returned ${response.status}`);
        const payload = await response.json();
        if (!payload.iso8601) throw new Error('Time response missing iso8601');
        return new Date(payload.iso8601);
    }

    function getCookie(name) {
        const prefix = `${encodeURIComponent(name)}=`;
        return document.cookie.split(';').map((part) => part.trim()).find((part) => part.startsWith(prefix))?.slice(prefix.length) || '';
    }

    function setCookie(name, value) {
        document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Max-Age=31536000; Path=/; SameSite=Lax`;
    }

    function setupChecklist() {
        const inputs = Array.from(document.querySelectorAll('[data-checklist] input[data-step]'));
        const complete = new Set(decodeURIComponent(getCookie('ic151_setup') || '').split(',').filter(Boolean));
        inputs.forEach((input) => {
            input.checked = complete.has(input.dataset.step);
            input.addEventListener('change', () => {
                if (input.checked) complete.add(input.dataset.step);
                else complete.delete(input.dataset.step);
                setCookie('ic151_setup', Array.from(complete).join(','));
            });
        });
    }

    function setupTheme() {
        const root = document.documentElement;
        const button = document.getElementById('theme-toggle');
        const icon = document.getElementById('theme-icon');
        const themeColor = document.querySelector('meta[name="theme-color"]');
        const sync = () => {
            const dark = root.dataset.theme === 'dark';
            icon.textContent = dark ? '☀' : '◐';
            button.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
            themeColor.setAttribute('content', dark ? '#0d1320' : '#f5f7fb');
        };
        button.addEventListener('click', () => {
            root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
            try { localStorage.setItem('cs103-theme', root.dataset.theme); } catch (error) { /* Theme still applies to this page. */ }
            sync();
        });
        sync();
    }

    async function initialize() {
        renderSchedule();
        setupChecklist();
        setupTheme();
        const picker = document.getElementById('batch-picker');
        let synchronizedAt = new Date();
        let performanceAt = performance.now();
        let source = 'device-time fallback';
        try {
            synchronizedAt = await queryTime();
            performanceAt = performance.now();
            source = 'network time';
        } catch (error) {
            console.warn('Network time unavailable; using device time.', error);
        }
        const tick = () => renderNextLab(new Date(synchronizedAt.getTime() + performance.now() - performanceAt), source);
        picker.addEventListener('change', () => {
            setCookie('ic151_batch', picker.value);
            tick();
        });
        const savedBatch = decodeURIComponent(getCookie('ic151_batch') || 'ALL');
        if (batches[savedBatch] || savedBatch === 'ALL') picker.value = savedBatch;
        tick();
        window.setInterval(tick, 60000);
    }

    window.IC151Schedule = Object.freeze({ batches, allMeetings, timeZone });
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
    else initialize();
}());
