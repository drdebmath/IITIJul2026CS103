(function () {
    'use strict';

    const timeZone = 'Asia/Kolkata';
    const batches = window.CS103Data.labBatches;

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
                const exception = batches[batch].exceptions?.[batches[batch].dates[index]] || '';
                return `<td${exception ? ' class="special-date"' : ''}><strong>${formatDate(date)}</strong><span>${batches[batch].start}–${batches[batch].end}${exception ? ` · ${exception}` : ''}</span></td>`;
            }).join('')}
        </tr>`).join('');
    }

    function renderScheduleFacts() {
        const firstLab = Object.entries(batches)
            .map(([batch, data]) => ({ batch, date: meetingDate(batch, 0, 'start') }))
            .sort((left, right) => left.date - right.date)[0];
        const firstLabTitle = document.getElementById('first-lab-title');
        if (firstLabTitle && firstLab) firstLabTitle.textContent = `${formatDate(firstLab.date)} · ${firstLab.batch}`;

        const summary = document.getElementById('schedule-summary');
        if (summary) summary.textContent = `${batches.B1.dates.length} regular labs per batch · final examinations are listed below.`;

        Object.entries(batches).forEach(([batch, data]) => {
            const card = document.querySelector(`[data-batch-card="${batch}"]`);
            if (!card) return;
            card.querySelector('[data-batch-day]').textContent = data.day;
            card.querySelector('[data-batch-time]').textContent = `${data.start}–${data.end}`;
            card.querySelector('[data-batch-first]').textContent = `First lab · ${formatDate(meetingDate(batch, 0, 'start'))}`;

            const exam = document.querySelector(`[data-batch-exam="${batch}"]`);
            if (exam) exam.textContent = `${formatDate(new Date(`${data.finalDate}T${data.start}:00+05:30`))} · ${data.start}–${data.end}`;
        });

        const finalTitle = document.getElementById('final-exam-title');
        if (finalTitle) finalTitle.textContent = 'Each batch has one scheduled final laboratory examination.';
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

    function initialize() {
        renderSchedule();
        renderScheduleFacts();
        setupChecklist();
        setupTheme();
        const picker = document.getElementById('batch-picker');
        const tick = () => renderNextLab(new Date(), 'Device clock · Asia/Kolkata');
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
