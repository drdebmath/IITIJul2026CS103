(function () {
    'use strict';

    const cookieName = 'cs103_progress';
    const oneYear = 60 * 60 * 24 * 365;

    const lectureSequence = window.CS103Data.lectureSequence;

    function readCookieValue(name) {
        const prefix = `${name}=`;
        const entry = document.cookie.split(';').map((item) => item.trim()).find((item) => item.startsWith(prefix));
        return entry ? decodeURIComponent(entry.slice(prefix.length)) : '';
    }

    function readCompleted() {
        const raw = readCookieValue(cookieName);
        if (!raw.startsWith('v1:')) return new Set();
        const validIds = new Set(lectureSequence.map((lecture) => lecture.id));
        return new Set(raw.slice(3).split(',').map(Number).filter((value) => validIds.has(value)));
    }

    function writeCompleted(completed) {
        const value = `v1:${Array.from(completed).sort((a, b) => a - b).join(',')}`;
        document.cookie = `${cookieName}=${encodeURIComponent(value)}; Max-Age=${oneYear}; SameSite=Lax`;
        window.dispatchEvent(new CustomEvent('cs103:progresschange', { detail: getSummary() }));
    }

    function markComplete(lectureId) {
        const completed = readCompleted();
        completed.add(Number(lectureId));
        writeCompleted(completed);
    }

    function markIncomplete(lectureId) {
        const completed = readCompleted();
        completed.delete(Number(lectureId));
        writeCompleted(completed);
    }

    function isComplete(lectureId) {
        return readCompleted().has(Number(lectureId));
    }

    function getNextLecture() {
        const completed = readCompleted();
        return lectureSequence.find((lecture) => !completed.has(lecture.id)) || null;
    }

    function getSummary() {
        const completed = readCompleted();
        return {
            completed: Array.from(completed),
            completedCount: lectureSequence.filter((lecture) => completed.has(lecture.id)).length,
            total: lectureSequence.length,
            next: lectureSequence.find((lecture) => !completed.has(lecture.id)) || null
        };
    }

    function lectureIdFromPath(pathname) {
        const match = String(pathname).match(/lecture(\d+)(?:_reveal)?\.html/i);
        return match ? Number(match[1]) : null;
    }

    window.CS103Progress = Object.freeze({
        lectureSequence,
        readCompleted,
        markComplete,
        markIncomplete,
        isComplete,
        getNextLecture,
        getSummary,
        lectureIdFromPath
    });
}());
