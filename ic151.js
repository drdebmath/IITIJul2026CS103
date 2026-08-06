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

    function spanRange() {
        const toMinutes = (value) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));
        const spans = Object.values(batches).map((data) => toMinutes(data.end) - toMinutes(data.start));
        const label = (total) => (total % 60 ? `${Math.floor(total / 60)} h ${total % 60} min` : `${total / 60} h`);
        return [...new Set([Math.min(...spans), Math.max(...spans)])].map(label).join(' – ');
    }

    function groupKeys(group) {
        return Object.keys(batches).filter((batch) => batches[batch].group === group);
    }

    const groups = [...new Set(Object.values(batches).map((data) => data.group))];

    function renderSchedule() {
        const host = document.getElementById('lab-schedule-tables');
        if (!host) return;
        host.innerHTML = groups.map((group) => {
            const keys = groupKeys(group);
            const labCount = Math.max(...keys.map((batch) => batches[batch].dates.length));
            const rows = Array.from({ length: labCount }, (_, index) => `<tr>
                <th scope="row">${String(index + 1).padStart(2, '0')}</th>
                ${keys.map((batch) => {
                    const data = batches[batch];
                    if (index >= data.dates.length) return '<td class="no-date"><strong>—</strong><span>No slot in the academic calendar</span></td>';
                    const exception = data.exceptions?.[data.dates[index]] || '';
                    return `<td${exception ? ' class="special-date"' : ''}><strong>${formatDate(meetingDate(batch, index, 'start'))}</strong><span>${data.start}–${data.end}${exception ? ` · ${exception}` : ''}</span></td>`;
                }).join('')}
            </tr>`).join('');
            return `<div class="table-card">
                <p class="table-title">${group} batches · ${keys.join(', ')}</p>
                <div class="table-scroll">
                    <table>
                        <thead><tr><th scope="col">Lab</th>${keys.map((batch) => `<th scope="col">${batch} · ${batches[batch].day.slice(0, 3)} ${batches[batch].start}</th>`).join('')}</tr></thead>
                        <tbody>${rows}</tbody>
                    </table>
                </div>
            </div>`;
        }).join('');
    }

    function renderBatchCards() {
        const grid = document.getElementById('batch-grid');
        if (!grid) return;
        grid.innerHTML = Object.entries(batches).map(([batch, data]) => `<article>
            <span>${batch}</span>
            <strong>${data.day}</strong>
            <p>${data.start}–${data.end}</p>
            <small>First lab · ${formatDate(meetingDate(batch, 0, 'start'))}</small>
        </article>`).join('');

        const list = document.getElementById('final-exam-list');
        if (list) {
            list.innerHTML = Object.entries(batches).map(([batch, data]) => `<li>
                <b>${batch}</b>
                <span>${formatDate(new Date(`${data.finalDate}T${data.start}:00+05:30`))} · ${data.start}–${data.end}${data.finalNote ? ` · ${data.finalNote}` : ''}</span>
            </li>`).join('');
        }

        const picker = document.getElementById('batch-picker');
        if (picker) picker.insertAdjacentHTML('beforeend', Object.keys(batches).map((batch) => `<option value="${batch}">Batch ${batch}</option>`).join(''));
    }

    function renderScheduleFacts() {
        const firstLab = Object.entries(batches)
            .map(([batch, data]) => ({ batch, date: meetingDate(batch, 0, 'start') }))
            .sort((left, right) => left.date - right.date)[0];
        const firstLabTitle = document.getElementById('first-lab-title');
        if (firstLabTitle && firstLab) firstLabTitle.textContent = `${formatDate(firstLab.date)} · ${firstLab.batch}`;

        const duration = document.getElementById('lab-duration');
        if (duration) duration.textContent = spanRange();

        const summary = document.getElementById('schedule-summary');
        const counts = Object.values(batches).map((data) => data.dates.length);
        const range = Math.min(...counts) === Math.max(...counts) ? `${counts[0]}` : `${Math.min(...counts)}–${Math.max(...counts)}`;
        if (summary) summary.textContent = `${range} regular labs per batch, after removing assessment weeks, the midsemester break, and institute holidays · final examinations are listed below.`;

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
                index: data.dates.length,
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
            title.textContent = 'All scheduled labs are complete.';
            meta.textContent = source;
            return;
        }
        const data = batches[upcoming.batch];
        const live = now >= upcoming.date && now <= upcoming.end;
        const note = upcoming.kind === 'final' ? data.finalNote : data.exceptions?.[data.dates[upcoming.index]];
        title.textContent = `${live ? 'Live now · ' : ''}Batch ${upcoming.batch} · ${upcoming.kind === 'final' ? 'Final lab examination' : `Lab ${String(upcoming.index + 1).padStart(2, '0')}`}`;
        meta.textContent = `${formatDate(upcoming.date)} · ${data.start}–${data.end} IST · CITC first floor${note ? ` · ${note}` : ''} · ${source}`;
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
        renderBatchCards();
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

        // The browser jumps to the hash before the schedule renders, and the injected
        // tables then push every later section down. Re-apply the target once.
        if (window.location.hash) document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    }

    window.IC151Schedule = Object.freeze({ batches, allMeetings, timeZone });
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
    else initialize();
}());
