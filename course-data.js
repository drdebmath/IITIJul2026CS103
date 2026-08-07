// Single source of truth for the Autumn 2026 lecture schedule.
// course-schedule.js renders it; course-progress.js derives the lecture sequence from it.
(function () {
    'use strict';

    const sessions = [
        { sequence: 1, lectureId: 1, date: '2026-08-04', start: '10:30', end: '11:25', title: 'Turn a precise problem into a running C++ program', file: 'lecture1.html', module: '1' },
        { sequence: 2, lectureId: 2, date: '2026-08-07', start: '11:30', end: '12:25', title: 'Choose types from meaning, range, and precision', file: 'lecture2.html', module: '2' },
        { sequence: 3, lectureId: 3, date: '2026-08-11', start: '10:30', end: '11:25', title: 'Track expressions, scope, storage, and lifetime', file: 'lecture3.html', module: '2' },
        { sequence: 4, lectureId: 4, date: '2026-08-14', start: '11:30', end: '12:25', title: 'Turn requirements into safe, testable branches', file: 'lecture4.html', module: '3' },
        { sequence: 5, lectureId: 5, date: '2026-08-18', start: '10:30', end: '11:25', title: 'Make loop state progress toward termination', file: 'lecture5.html', module: '3' },
        { sequence: 6, lectureId: 6, date: '2026-08-21', start: '11:30', end: '12:25', title: 'Use ranges and invariants to control repetition', file: 'lecture6.html', module: '3' },
        { sequence: 7, lectureId: null, date: '2026-08-25', start: '10:30', end: '11:25', title: 'Prove the foundations with code and reasoning', file: 'index.html#assessment', module: 'Quiz', kind: 'quiz', quizNumber: 1 },
        { sequence: 8, lectureId: 7, date: '2026-08-28', start: '11:30', end: '12:25', title: 'Give each operation a clear function contract', file: 'lecture7.html', module: '4' },
        { sequence: 9, lectureId: 8, date: '2026-09-01', start: '10:30', end: '11:25', title: 'Choose copy, alias, and recursion deliberately', file: 'lecture8.html', module: '4' },
        { sequence: 10, lectureId: 9, date: '2026-09-04', start: '11:30', end: '12:25', title: 'Traverse fixed sequences within exact bounds', file: 'lecture9.html', module: '5' },
        { sequence: 11, lectureId: 10, date: '2026-09-08', start: '10:30', end: '11:25', title: 'Match matrices and vectors to their operations', file: 'lecture10.html', module: '5' },
        { sequence: 12, lectureId: 11, date: '2026-09-11', start: '11:30', end: '12:25', title: 'Process owned text with explicit boundaries', file: 'lecture11.html', module: '5' },
        { sequence: 13, lectureId: 12, date: '2026-10-06', start: '10:30', end: '11:25', title: 'Repair programs with evidence and tests', file: 'lecture12.html', module: 'Review' },
        { sequence: 14, lectureId: 13, date: '2026-10-09', start: '11:30', end: '12:25', title: 'Group state and validate addresses', file: 'lecture13.html', module: '6' },
        { sequence: 15, lectureId: 14, date: '2026-10-13', start: '10:30', end: '11:25', title: 'Make dynamic ownership explicit', file: 'lecture14.html', module: '6–7' },
        { sequence: 16, lectureId: 15, date: '2026-10-16', start: '11:30', end: '12:25', title: 'Choose structures from operations and cost', file: 'lecture15.html', module: '5 & 7' },
        { sequence: 17, lectureId: 16, date: '2026-10-23', start: '11:30', end: '12:25', title: 'Prove recursive progress to a base case', file: 'lecture16.html', module: '4–7' },
        { sequence: 18, lectureId: null, date: '2026-10-27', start: '10:30', end: '11:25', title: 'Apply structures, algorithms, and object design', file: 'index.html#assessment', module: 'Quiz', kind: 'quiz', quizNumber: 2 },
        { sequence: 19, lectureId: 17, date: '2026-10-30', start: '11:30', end: '12:25', title: 'Preserve invariants to search and sort efficiently', file: 'lecture17.html', module: '5 & 7' },
        { sequence: 20, lectureId: 18, date: '2026-11-03', start: '10:30', end: '11:25', title: 'Protect object invariants across their lifetime', file: 'lecture18.html', module: '8' },
        { sequence: 21, lectureId: 19, date: '2026-11-06', start: '11:30', end: '12:25', title: 'Use inheritance only when substitution is safe', file: 'lecture19.html', module: '8–9' },
        { sequence: 22, lectureId: 20, date: '2026-11-10', start: '10:30', end: '11:25', title: 'Select runtime behavior through safe interfaces', file: 'lecture20.html', module: '9' },
        { sequence: 23, lectureId: 21, date: '2026-11-13', start: '11:30', end: '12:25', title: 'Separate polymorphism, ownership, and graph links', file: 'lecture21.html', module: '9' },
        { sequence: 24, lectureId: 22, date: '2026-11-17', start: '10:30', end: '11:25', title: 'Compose domain objects with explicit policies', file: 'lecture22.html', module: '9' },
        { sequence: 25, lectureId: 23, date: '2026-11-20', start: '11:30', end: '12:25', title: 'Integrate structures, algorithms, and evidence', file: 'lecture23.html', module: '5, 7 & 9' }
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

    // Batch dates already exclude the assessment period, the midsemester break, institute
    // holidays, and any day whose timetable is swapped to another weekday.
    const labBatches = {
        A1: { group: 'A', day: 'Thursday', start: '14:30', end: '17:30', finalDate: '2026-11-19', dates: ['2026-08-13', '2026-08-20', '2026-08-27', '2026-09-03', '2026-09-10', '2026-10-08', '2026-10-15', '2026-10-22', '2026-10-29', '2026-11-05', '2026-11-12'] },
        A2: { group: 'A', day: 'Tuesday', start: '13:30', end: '16:30', finalDate: '2026-11-23', finalNote: 'Tuesday slot on Monday', dates: ['2026-08-11', '2026-08-18', '2026-08-25', '2026-09-01', '2026-09-08', '2026-10-06', '2026-10-13', '2026-10-27', '2026-11-03', '2026-11-10', '2026-11-17'] },
        A3: { group: 'A', day: 'Wednesday', start: '13:30', end: '16:30', finalDate: '2026-11-18', dates: ['2026-08-12', '2026-08-19', '2026-08-26', '2026-09-02', '2026-09-09', '2026-10-07', '2026-10-14', '2026-10-21', '2026-10-28', '2026-11-04', '2026-11-11'] },
        A4: { group: 'A', day: 'Friday', start: '14:30', end: '17:30', finalDate: '2026-11-20', dates: ['2026-08-14', '2026-08-21', '2026-08-28', '2026-09-04', '2026-09-11', '2026-10-09', '2026-10-16', '2026-10-23', '2026-10-30', '2026-11-06', '2026-11-13'] },
        B1: { group: 'B', day: 'Monday', start: '08:30', end: '11:25', finalDate: '2026-11-16', dates: ['2026-08-10', '2026-08-17', '2026-08-24', '2026-08-31', '2026-09-07', '2026-09-14', '2026-10-05', '2026-10-12', '2026-10-19', '2026-10-26', '2026-11-02'] },
        B2: { group: 'B', day: 'Monday', start: '13:30', end: '16:25', finalDate: '2026-11-16', dates: ['2026-08-10', '2026-08-17', '2026-08-24', '2026-08-31', '2026-09-07', '2026-09-14', '2026-10-05', '2026-10-12', '2026-10-19', '2026-10-26', '2026-11-02'] },
        B3: { group: 'B', day: 'Thursday', start: '08:30', end: '11:25', finalDate: '2026-11-19', dates: ['2026-08-13', '2026-08-20', '2026-08-27', '2026-09-03', '2026-09-10', '2026-10-08', '2026-10-15', '2026-10-22', '2026-10-29', '2026-11-05', '2026-11-12'] },
        B4: { group: 'B', day: 'Saturday', start: '13:30', end: '16:25', finalDate: '2026-11-21', dates: ['2026-08-08', '2026-08-22', '2026-08-29', '2026-09-05', '2026-09-12', '2026-09-17', '2026-10-10', '2026-10-17', '2026-10-24', '2026-10-31', '2026-11-07'], exceptions: { '2026-09-17': 'Saturday slot on Thursday' } }
    };

    const lectureSequence = sessions
        .filter((session) => session.lectureId !== null)
        .map((session) => ({ id: session.lectureId, file: session.file, title: session.title }));

    window.CS103Data = Object.freeze({ sessions, academicEvents, labBatches, lectureSequence });
}());
