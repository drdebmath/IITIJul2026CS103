// Checks every IC151 lab date in course-data.js against the academic calendar.
// Run with: node scripts/validate-lab-schedule.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const scope = { window: {} };
new Function('window', readFileSync(`${root}course-data.js`, 'utf8'))(scope.window);
const { labBatches, academicEvents } = scope.window.CS103Data;

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const FIRST_LAB_DAY = '2026-08-06';

// Days on which the named weekday's timetable is not followed, so its batches cannot meet.
const timetableSwaps = { '2026-09-15': 'Tuesday', '2026-09-17': 'Thursday', '2026-11-23': 'Monday' };

const blocked = new Set(academicEvents
    .filter((event) => event.kind === 'assessment' || event.kind === 'holiday')
    .flatMap((event) => {
        const dates = [];
        for (let day = new Date(`${event.date}T12:00:00Z`); day <= new Date(`${event.endDate || event.date}T12:00:00Z`); day = new Date(day.getTime() + 86400000)) {
            dates.push(day.toISOString().slice(0, 10));
        }
        return dates;
    }));

const weekdayOf = (date) => WEEKDAYS[new Date(`${date}T12:00:00Z`).getUTCDay()];

for (const [batch, data] of Object.entries(labBatches)) {
    const meetings = [...data.dates, data.finalDate];
    for (const date of meetings) {
        const note = date === data.finalDate ? data.finalNote : data.exceptions?.[date];
        assert.ok(!blocked.has(date), `${batch} meets on ${date}, inside a break or holiday`);
        // A meeting off its usual weekday, or on a day whose timetable is swapped away,
        // is only valid when the data explains it.
        if (!note) {
            assert.equal(weekdayOf(date), data.day, `${batch} meets on ${date} (${weekdayOf(date)}) but runs on ${data.day}`);
            assert.notEqual(timetableSwaps[date], data.day, `${batch} meets on ${date}, whose ${data.day} timetable is swapped away`);
        }
    }
    assert.deepEqual(meetings, [...meetings].sort(), `${batch} dates are out of order`);
    assert.equal(new Set(meetings).size, meetings.length, `${batch} has a duplicate date`);
    assert.ok(data.dates[0] >= FIRST_LAB_DAY, `${batch} starts on ${data.dates[0]}, before labs begin on ${FIRST_LAB_DAY}`);
    assert.ok(data.finalDate > data.dates.at(-1), `${batch} final examination is not after its last lab`);
    console.log(`${batch}  ${data.day.padEnd(9)} ${data.start}–${data.end}  ${String(data.dates.length).padStart(2)} labs  ${data.dates[0]} → ${data.dates.at(-1)}  final ${data.finalDate}`);
}

console.log(`\nOK · ${Object.keys(labBatches).length} batches clear the Autumn 2026 academic calendar.`);
