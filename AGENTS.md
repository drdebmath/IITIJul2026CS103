# Repository Instructions

## Freeze delivered lecture content

Once a lecture has been delivered, its teaching content is frozen. Do not revise,
rewrite, expand, remove, reorder, or otherwise change content that students have
already received.

Frozen content includes:

- slide titles and explanatory text;
- examples, code, outputs, diagrams, tables, and exercises;
- the order and pedagogical progression of slides; and
- generated or source data whose regeneration would change any of the above.

Maintenance changes are allowed only when they preserve the delivered content.
Examples include repairing a broken URL, correcting a concept-index link or slide
anchor, and fixing navigation that points to the wrong existing slide. Keep such
changes as narrow as possible; do not use a maintenance fix as an opportunity to
rewrite nearby material.

If a proposed correction would change the meaning, wording, example, code, or
sequence of a frozen lecture, do not make it without explicit instructor approval.
Report the issue instead. When running lecture generators or making shared changes,
inspect the diff and ensure that frozen lectures have not changed incidentally.

### Currently frozen lectures

- Lecture 1 (`lecture1.html`) is frozen.
- Lecture 2 (`lecture2.html`) is frozen.
- Lecture 3 (`lecture3.html`) is frozen.
- Lecture 3.5 (`lecture3-5.html`) is frozen.
- Lecture 4 (`lecture4.html`) is frozen.
- Lecture 5 (`lecture5.html`) is frozen.
- Lecture 6 (`lecture6.html`) is frozen.
- Lecture 7 (`lecture7.html`) is frozen.
- Lecture 8 (`lecture8.html`) is frozen.
- Lecture 9 (`lecture9.html`) is frozen.
- Lecture 10 (`lecture10.html`) is frozen.
- Lecture 11 (`lecture11.html`) is frozen.
- Lecture 12 (`lecture12.html`) is frozen.
- Lecture 13 (`lecture13.html`) is frozen.

This restriction also applies to Lecture 1 through Lecture 13 entries, including
Lecture 3.5, in shared data, extras, concept mappings, and other
sources whenever changing them would alter the delivered content. Concept mappings
may still be repaired when only the link or target is wrong and the lecture itself
remains unchanged.

## Expanding a lecture draft into a full deck

`lecture12.html` and `lecture13.html` are the models. Read both before expanding
another lecture, and follow them unless the instructor asks otherwise.

### Workflow

- Draft with Sonnet subagents (deck, figures, speaker notes) and fact-check with
  Haiku subagents; the main session integrates, verifies, and reports.
- Give subagents disjoint files so they never edit the same file at once (e.g.
  figures go to scratch files and are inserted by the main session).
- Before committing, check the rendered deck in a browser (light and dark), run
  `git diff --stat`, and confirm no frozen lecture changed. `git add` every new
  asset, then confirm it loads on the live GitHub Pages site after deploy.

### Deck structure

1. Title slide; the title uses textbook terms (also update the title in
   `course-data.js`).
2. One or two bridge slides from the previous lecture
   (`course-extra-slide course-bridge-slide`): where that lecture ended, the
   question it left open, and why today's topic answers it, with a short plan.
3. A worked example before any syntax, with real compiled output.
4. A general-form slide: `course-extra-slide course-syntax-slide`,
   `data-course-syntax="N"`, with a Part/Meaning table.
5. A practical example: `course-extra-slide practical-example-slide`, heading
   "Main point · Subject", with **Takeaways**.
6. Concept slides, each one idea, tying back to the previous lecture where it
   applies (e.g. `assert` pre-conditions from Lecture 12).
7. A common-errors table, two polls, two Q&A slides, a summary ending with a
   **Reading:** line (Stroustrup *PPP* and Savitch chapter titles, verified),
   and a lab practice slide (`course-extra-slide lab-practice-slide`,
   `data-course-practice="N"`).

From Lecture 15 on, a deck has fewer than 20 top-level `<section>` elements in
total (authored and extra slides together; automatic "Part 2" pages do not
count). Fit the structure above by merging: one bridge slide, one Q&A slide, a
one- or two-slide story, and only the concept slides the topic needs.

Authored slide numbers count only sections without `course-extra-slide`. When
they change, update that lecture's pins and `sessionPlans` entry in
`course-map.js`, and nothing else.

### Wording

- Use Stroustrup and Savitch terminology (data member, member access, address-of
  operator, dereference, null pointer, pass-by-reference, undefined behavior,
  pre-condition). No invented phrases such as "group state".
- Say "error", not "bug" or "defect". American spelling.
- Headings fit on one line. Split a long heading as "Main point · subheading";
  the renderer puts the subheading on its own smaller line. No `<code>` after
  the `·`.
- Slides are student-facing only: no timings or instructor notes on slides.

### Code

- Compile and run every program (`g++ -std=c++17 -Wall`) and paste the real
  output. Mark implementation-specific output (sizes, addresses) as such.
- Inside markdown, write inline code with backticks. Two `*` inside `<code>`
  tags in one paragraph turn into italics.

### Figures

- Inline SVG following the `course-array-address-figure` pattern: `viewBox`
  width 900, `role="img"` and a full `aria-label`, `currentColor` text and
  strokes, translucent fills so it works in light and dark themes, minimum font
  size 15, no blank lines inside the SVG.
- Avoid `<defs>` markers and patterns (they do not follow the theme colour);
  draw arrowheads as inline polygons. Give every id a figure-specific prefix.
- One idea per figure; add one only where a picture beats the code and table.

### Stories

- Story slides are `course-extra-slide course-story-slide` with
  `data-course-story="<name>"`, two or three slides, placed where they motivate
  the concept.
- A Haiku subagent fact-checks every claim against primary or institutional
  sources before it goes on a slide. No unverified quotes or popular myths.
- Photos must be public domain or freely licensed (e.g. Wikimedia Commons), saved
  under `assets/lecture-stories/`, credited in a `figcaption`, and laid out in a
  `.course-story-layout` grid so the slide stays on one page.

### Polls (Slido)

- One Slido event per lecture, named "Lecture N". Multiple-choice polls only (no
  open text), correct answer marked; polls are not started in advance.
- The poll slide keeps the question and options, and puts them beside a large
  QR code in a `.course-poll-layout` grid (see `lecture14.html`): a `<div>` with
  the code and options, then `<figure class="course-slido-qr">` with
  `assets/slido-lectureN.svg` (a QR code for the joining link from Slido's Share
  dialog, generated as SVG with a `viewBox`) and the caption
  "📊 sli.do · #<code>". Lecture 13 uses the older small corner QR; leave it.
- A poll's code and options must stay on one page; check the pagination.

### Speaker notes

`lectureN-notes.md` is local and not committed. Follow `lecture12-notes.md`: a
header line, an overview, a terminology paragraph, a before-class checklist, a
timing table totalling 55 minutes, per-slide flow (what to say, what to point
at, questions and answers), what to cut if behind, poll answers with why each
distractor is wrong, a do-not-say list for stories, and anticipated questions.
