// Single source of truth for the Autumn 2026 lecture schedule.
// course-schedule.js renders it; course-progress.js derives the lecture sequence from it.
(function () {
    'use strict';

    const sessions = [
        { sequence: 1, lectureId: 1, date: '2026-08-04', start: '10:30', end: '11:25', title: 'Programming & Problem Solving', file: 'lecture1.html', module: '1' },
        { sequence: 2, lectureId: 2, date: '2026-08-07', start: '11:30', end: '12:25', title: 'Types & Representation', file: 'lecture2.html', module: '2' },
        { sequence: 3, lectureId: 3, date: '2026-08-11', start: '10:30', end: '11:25', title: 'Expressions, Scope & Program State', file: 'lecture3.html', module: '2' },
        { sequence: 4, lectureId: 4, date: '2026-08-14', start: '11:30', end: '12:25', title: 'Decisions & Safe Branching', file: 'lecture4.html', module: '3' },
        { sequence: 5, lectureId: 5, date: '2026-08-18', start: '10:30', end: '11:25', title: 'Iteration I · while & Input Validation', file: 'lecture5.html', module: '3' },
        { sequence: 6, lectureId: 6, date: '2026-08-21', start: '11:30', end: '12:25', title: 'Iteration II · for, Nested Loops & Invariants', file: 'lecture6.html', module: '3' },
        { sequence: 7, lectureId: null, date: '2026-08-25', start: '10:30', end: '11:25', title: 'Quiz 1 · Pre-mid-semester foundations', file: 'index.html#assessment', module: 'Quiz', kind: 'quiz', quizNumber: 1 },
        { sequence: 8, lectureId: 7, date: '2026-08-28', start: '11:30', end: '12:25', title: 'Functions I · Contracts & Calls', file: 'lecture7.html', module: '4' },
        { sequence: 9, lectureId: 8, date: '2026-09-01', start: '10:30', end: '11:25', title: 'Functions II · References & Decomposition', file: 'lecture8.html', module: '4' },
        { sequence: 10, lectureId: 9, date: '2026-09-04', start: '11:30', end: '12:25', title: 'Arrays I · Fixed Sequences & Traversal', file: 'lecture9.html', module: '5' },
        { sequence: 11, lectureId: 10, date: '2026-09-08', start: '10:30', end: '11:25', title: 'Arrays II · Matrices & std::vector', file: 'lecture10.html', module: '5' },
        { sequence: 12, lectureId: 11, date: '2026-09-11', start: '11:30', end: '12:25', title: 'Strings & Text Processing', file: 'lecture11.html', module: '5' },
        { sequence: 13, lectureId: 12, date: '2026-10-06', start: '10:30', end: '11:25', title: 'Debugging & Assessment Debrief', file: 'lecture12.html', module: 'Review' },
        { sequence: 14, lectureId: 13, date: '2026-10-09', start: '11:30', end: '12:25', title: 'Records, Pointers & Memory Layout', file: 'lecture13.html', module: '6' },
        { sequence: 15, lectureId: 14, date: '2026-10-13', start: '10:30', end: '11:25', title: 'Dynamic Memory & Linked Structures', file: 'lecture14.html', module: '6–7' },
        { sequence: 16, lectureId: 15, date: '2026-10-16', start: '11:30', end: '12:25', title: 'Linear Structures & Array Algorithms', file: 'lecture15.html', module: '5 & 7' },
        { sequence: 17, lectureId: 16, date: '2026-10-23', start: '11:30', end: '12:25', title: 'Recursive Decomposition in Practice', file: 'lecture16.html', module: '4–7' },
        { sequence: 18, lectureId: null, date: '2026-10-27', start: '10:30', end: '11:25', title: 'Quiz 2 · Post-mid-semester concepts', file: 'index.html#assessment', module: 'Quiz', kind: 'quiz', quizNumber: 2 },
        { sequence: 19, lectureId: 17, date: '2026-10-30', start: '11:30', end: '12:25', title: 'Search Trees, Heaps & Sorting', file: 'lecture17.html', module: '5 & 7' },
        { sequence: 20, lectureId: 18, date: '2026-11-03', start: '10:30', end: '11:25', title: 'Object Design & Value Semantics', file: 'lecture18.html', module: '8' },
        { sequence: 21, lectureId: 19, date: '2026-11-06', start: '11:30', end: '12:25', title: 'Friend Access & Inheritance Foundations', file: 'lecture19.html', module: '8–9' },
        { sequence: 22, lectureId: 20, date: '2026-11-10', start: '10:30', end: '11:25', title: 'Inheritance & Runtime Polymorphism', file: 'lecture20.html', module: '9' },
        { sequence: 23, lectureId: 21, date: '2026-11-13', start: '11:30', end: '12:25', title: 'Polymorphic Data Structures', file: 'lecture21.html', module: '9' },
        { sequence: 24, lectureId: 22, date: '2026-11-17', start: '10:30', end: '11:25', title: 'Applied Object Systems', file: 'lecture22.html', module: '9' },
        { sequence: 25, lectureId: 23, date: '2026-11-20', start: '11:30', end: '12:25', title: 'Recursive & Polymorphic Capstones', file: 'lecture23.html', module: '5, 7 & 9' }
    ];

    const academicEvents = [
        { date: '2026-08-03', title: 'Commencement of classes for the 2026 B.Tech., B.S. and B.Des. batch', kind: 'milestone' },
        { date: '2026-09-15', title: 'Monday timetable followed instead of Tuesday slots', kind: 'timetable' },
        { date: '2026-09-18', endDate: '2026-09-26', title: 'Midsemester assessment period · no regular lectures', kind: 'assessment' },
        { date: '2026-09-27', endDate: '2026-10-04', title: 'Midsemester break · no classes or laboratories', kind: 'assessment' },
        { date: '2026-10-20', title: 'Institute holiday', kind: 'holiday' },
        { date: '2026-11-23', title: 'Tuesday timetable followed instead of Monday slots', kind: 'timetable' },
        { date: '2026-11-24', title: 'Institute holiday', kind: 'holiday' },
        { date: '2026-11-25', endDate: '2026-12-03', title: 'End-semester examination period · no regular lectures', kind: 'assessment' },
        { date: '2026-12-25', title: 'Institute holiday', kind: 'holiday' }
    ];

    const lectureSequence = sessions
        .filter((session) => session.lectureId !== null)
        .map((session) => ({ id: session.lectureId, file: session.file, title: session.title }));

    window.CS103Data = Object.freeze({ sessions, academicEvents, lectureSequence });
}());
