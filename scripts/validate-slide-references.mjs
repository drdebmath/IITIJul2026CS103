import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mapSource = fs.readFileSync(path.join(root, 'course-map.js'), 'utf8');
const context = { window: {} };
vm.runInNewContext(mapSource, context, { filename: 'course-map.js' });

const references = context.window.CS103SlideReferences;
if (!references || typeof references !== 'object') throw new Error('course-map.js did not expose CS103SlideReferences');

function authoredSlideCount(lectureId) {
    const filename = path.join(root, `lecture${lectureId}.html`);
    if (!fs.existsSync(filename)) throw new Error(`Missing generated page: lecture${lectureId}.html`);
    const html = fs.readFileSync(filename, 'utf8');
    const sections = html.match(/<section\b[^>]*>/gi) || [];
    return sections.filter((section) => !/\bclass="[^"]*course-extra-slide/.test(section)).length;
}

const slideCounts = Object.fromEntries(Array.from({ length: 23 }, (_, index) => {
    const lectureId = index + 1;
    return [lectureId, authoredSlideCount(lectureId)];
}));
const errors = [];

for (const [conceptId, reference] of Object.entries(references)) {
    if (!Array.isArray(reference) || reference.length !== 2) {
        errors.push(`${conceptId}: reference must be [lecture, slide]`);
        continue;
    }
    const [lectureId, slideNumber] = reference;
    if (!Number.isInteger(lectureId) || lectureId < 1 || lectureId > 23) {
        errors.push(`${conceptId}: invalid lecture ${lectureId}`);
        continue;
    }
    if (!Number.isInteger(slideNumber) || slideNumber < 1 || slideNumber > slideCounts[lectureId]) {
        errors.push(`${conceptId}: L${String(lectureId).padStart(2, '0')} · S${String(slideNumber).padStart(2, '0')} exceeds ${slideCounts[lectureId]} authored slides`);
    }
}

for (let lectureId = 1; lectureId <= 23; lectureId += 1) {
    const html = fs.readFileSync(path.join(root, `lecture${lectureId}.html`), 'utf8');
    if (!html.includes('lecture-runtime.js')) errors.push(`lecture${lectureId}.html: missing lecture-runtime.js`);
    if (!html.includes(`data-course-practice="${lectureId}"`)) errors.push(`lecture${lectureId}.html: missing practice marker`);
    if (!html.includes('class="course-extra-slide practical-example-slide"')) errors.push(`lecture${lectureId}.html: missing practical example`);
    if (html.includes('course-progress.js')) errors.push(`lecture${lectureId}.html: duplicate course-progress.js include`);
}

if (errors.length > 0) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
} else {
    const total = Object.keys(references).length;
    console.log(`Validated ${total} stable concept references across 23 generated lecture pages.`);
    console.log(`Authored slide counts: ${Object.entries(slideCounts).map(([id, count]) => `L${String(id).padStart(2, '0')}=${count}`).join(', ')}`);
}
