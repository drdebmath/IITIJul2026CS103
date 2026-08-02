(function () {
    'use strict';

    const timeZone = 'Asia/Kolkata';
    const lectureTime = 'Tuesday 10:30–11:25 · Friday 11:30–12:25 IST';
    const { sessions, academicEvents } = window.CS103Data;

    function sessionDate(session, boundary) {
        const value = boundary === 'end' ? session.end : session.start;
        return new Date(`${session.date}T${value}:00+05:30`);
    }

    function formatSessionDate(session) {
        return new Intl.DateTimeFormat('en-IN', {
            timeZone,
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).format(sessionDate(session, 'start'));
    }

    function formatSessionTime(session) {
        return `${session.start}–${session.end} IST`;
    }

    function formatAcademicDate(event) {
        const date = new Date(`${event.date}T12:00:00+05:30`);
        const formatter = new Intl.DateTimeFormat('en-IN', {
            timeZone,
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        if (!event.endDate) return formatter.format(date);
        const end = new Date(`${event.endDate}T12:00:00+05:30`);
        return `${formatter.format(date)} – ${formatter.format(end)}`;
    }

    function renderScheduleTable() {
        const body = document.getElementById('lecture-schedule-body');
        if (!body) return;

        const rows = [
            ...sessions.map((session) => ({ type: 'session', date: session.date, data: session })),
            ...academicEvents.map((event) => ({ type: 'event', date: event.date, data: event }))
        ].sort((left, right) => left.date.localeCompare(right.date) || (left.type === 'event' ? -1 : 1));

        body.innerHTML = rows.map((row) => {
            if (row.type === 'session') {
                const session = row.data;
                const reference = session.kind === 'quiz' ? `Q${session.quizNumber}` : `L${String(session.lectureId).padStart(2, '0')}`;
                return `<tr>
                    <td>${formatSessionDate(session)}</td>
                    <td><span class="module-badge">${session.module}</span></td>
                    <td><a href="${session.file}">${reference} · ${session.title}</a><span class="schedule-time">${formatSessionTime(session)}</span></td>
                </tr>`;
            }

            const event = row.data;
            const className = event.kind === 'holiday' ? 'notice-row' : `${event.kind}-row`;
            return `<tr class="${className}">
                <td>${formatAcademicDate(event)}</td>
                <td colspan="2">${event.title}</td>
            </tr>`;
        }).join('');
    }

    function countdownLabel(now, session) {
        const milliseconds = sessionDate(session, 'start') - now;
        if (milliseconds <= 0 && now <= sessionDate(session, 'end')) return 'Live now';
        const minutes = Math.max(0, Math.round(milliseconds / 60000));
        if (minutes < 60) return `Starts in ${minutes} min`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `Starts in ${hours} hr ${minutes % 60} min`;
        const days = Math.floor(hours / 24);
        return `Starts in ${days} day${days === 1 ? '' : 's'}`;
    }

    function fillQuizDates() {
        sessions.filter((session) => session.kind === 'quiz').forEach((session) => {
            const target = document.getElementById(`quiz${session.quizNumber}-date`);
            if (target) target.textContent = `${formatSessionDate(session)} · ${session.quizNumber === 1 ? 'before' : 'after'} mid-semester`;
        });
    }

    function updateContinueCard() {
        const link = document.getElementById('continue-lecture-link');
        const title = document.getElementById('continue-lecture-title');
        const progress = document.getElementById('continue-progress');
        if (!link || !window.CS103Progress) return;

        const summary = window.CS103Progress.getSummary();
        progress.textContent = `${summary.completedCount} / ${summary.total} studied`;
        if (summary.next) {
            title.textContent = `Lecture ${String(summary.next.id).padStart(2, '0')} · ${summary.next.title}`;
            link.href = summary.next.file;
            link.setAttribute('aria-label', `Continue with ${summary.next.title}`);
        } else {
            title.textContent = 'Course complete · revisit the dependency graph';
            link.href = 'speedrun.html';
            link.setAttribute('aria-label', 'Course complete; revisit the dependency graph');
        }
    }

    function renderUpcoming(now, sourceLabel) {
        const bar = document.getElementById('upcoming-lecture');
        if (!bar) return;

        const upcoming = sessions.find((session) => sessionDate(session, 'end') > now);
        const status = document.getElementById('upcoming-status');
        const title = document.getElementById('upcoming-title');
        const meta = document.getElementById('upcoming-meta');
        const countdown = document.getElementById('upcoming-countdown');
        const link = document.getElementById('upcoming-link');
        const source = document.getElementById('time-source');

        source.textContent = sourceLabel;
        if (!upcoming) {
            status.textContent = 'Schedule complete';
            title.textContent = 'All scheduled lectures are complete';
            meta.textContent = 'Use the dependency graph to revisit any concept.';
            countdown.textContent = 'Course archive';
            link.href = 'speedrun.html';
            link.setAttribute('aria-label', 'Open the course dependency graph');
            return;
        }

        const isLive = now >= sessionDate(upcoming, 'start') && now <= sessionDate(upcoming, 'end');
        status.textContent = isLive ? 'Happening now' : 'Upcoming lecture';
        const reference = upcoming.kind === 'quiz' ? `Q${upcoming.quizNumber}` : `L${String(upcoming.lectureId).padStart(2, '0')}`;
        title.textContent = `${reference} · ${upcoming.title}`;
        meta.textContent = `${formatSessionDate(upcoming)} · ${formatSessionTime(upcoming)} · Module ${upcoming.module}`;
        countdown.textContent = countdownLabel(now, upcoming);
        link.href = upcoming.file;
        link.setAttribute('aria-label', `Open ${upcoming.title}`);
    }

    function initializeUpcomingBar() {
        if (!document.getElementById('upcoming-lecture') && !document.getElementById('lecture-schedule-body')) return;
        renderScheduleTable();
        fillQuizDates();
        updateContinueCard();
        window.addEventListener('cs103:progresschange', updateContinueCard);

        const tick = () => {
            renderUpcoming(new Date(), 'Device clock · Asia/Kolkata');
        };
        tick();
        window.setInterval(tick, 60000);
    }

    window.CS103Schedule = Object.freeze({ sessions, academicEvents, renderScheduleTable, timeZone, lectureTime, formatSessionDate, formatSessionTime });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeUpcomingBar, { once: true });
    } else {
        initializeUpcomingBar();
    }
}());
