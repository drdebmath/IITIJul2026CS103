# CS103 Website Audit — 2 Aug 2026

Method: full-repo scan of HTML/JS/CSS, link/asset resolution check, a live
browse of `index.html`, `speedrun.html`, `lecture1.html`, `studio.html`,
`codes/index.html`, and `ic151.html` with the browser console open, plus a
content audit: compiling all 41 code examples, cross-checking the schedule
against the 2026 calendar, validating the concept/glossary data, and reading
sample decks (L01, L02, L05, L12, L17, L23) for technical accuracy.

## What works

- All local `href`/`src` references across every page resolve to real files
  (including all 41 `codes/*.cpp` links). No 404s found.
- Landing page, dependency graph, Algorithm Studio, code library, and IC151
  pages all render correctly in light theme; no console errors on
  `index.html`, `studio.html`, `codes/index.html`, or `ic151.html`.
- `.nojekyll` present; Reveal.js vendored with pinned CDN fallback; theme
  persistence and skip-link/focus-visible accessibility basics in place.
- `midsem-review.html` correctly redirects to `lecture12.html` with a canonical
  link.

## Critical

### 1. Study-progress tracking is dead on all 23 lecture pages

Every lecture page throws two exceptions on load:

```
course-schedule.js:6  TypeError: Cannot destructure property 'sessions' of 'window.CS103Data' as it is undefined.
course-progress.js:6  TypeError: Cannot read properties of undefined (reading 'lectureSequence')
```

Cause: `course-data.js` (which defines `window.CS103Data`) is loaded by
`index.html` and `speedrun.html`, but **not** by any lecture page. Lecture
pages load `course-schedule.js` via `lecture-runtime.js:34` and
`course-progress.js` directly (e.g. `lecture1.html:175`, emitted by
`scripts/generate-lectures.mjs:2506`). Both scripts crash at their first line,
so `window.CS103Progress` and `window.CS103Schedule` are never defined.

Consequences (all silent — `lecture-modern.js` guards on the missing globals):

- The "Mark studied" button in the deck bar (`lecture-modern.js:723`) does
  nothing.
- Auto-marking a lecture studied on reaching the practice slide
  (`markCompleteFromPractice`, `lecture-modern.js:1119`) does nothing.
- The landing-page "0 / 23 studied" counter can therefore never advance from
  lecture visits — the advertised cookie-based progress feature is broken
  end to end.
- `scheduleSession` is undefined, so the deck bar's session number falls back
  to `sequenceIndex + 1` (`lecture-modern.js:659`), which is **wrong for L07
  onward** (quizzes occupy sessions 7 and 18: L07 is session 8, L17 is
  session 19, etc.).

Fix: add `script('course-data.js')` before `course-schedule.js` in
`lecture-runtime.js`, and have `generate-lectures.mjs` emit
`course-data.js` before `course-progress.js` (then regenerate the 23 pages).

## Moderate

### 2. External time API is an unnecessary dependency

`course-schedule.js:5` fetches `https://gettimeapi.dev/v1/time` on every
landing-page load. There is a device-time fallback (line 158), so the page
survives an outage, but this leaks visitor traffic to a third party and adds
latency for a value the device clock already provides. Consider dropping the
fetch entirely — a wrong device clock is the student's problem on every other
site too.

### 3. Compiled binary committed to the repo

`heapsort_demo` (67 KB Mach-O executable, macOS-only) is checked in at the
repo root and served by GitHub Pages. It is referenced by nothing. Delete it.

### 4. Orphaned pages and assets

No page or script links to these; they are still publicly served:

- `googlestyle.html`
- `strassen.html`
- `lecture1_reveal.html` (superseded by `lecture1.html`)
- `memes/` (7 images, zero references anywhere)

Delete them, or link them intentionally.

## Minor

- **README overstates reliability**: it advertises "cookie-based local study
  progress" and a "server-time upcoming-lecture indicator"; the former is
  broken (finding 1) and the latter is a third-party API, not server time.
- **Duplicate script include**: `lecture1.html` (and siblings) load
  `course-progress.js` directly while `lecture-runtime.js` already injects
  the schedule/concept scripts — after fixing finding 1, consolidate all
  lecture-page script injection in one place (`lecture-runtime.js`) so the
  generator and runtime can't drift apart again.
- **`document.write` CDN fallback** (`lecture-runtime.js:28`) works but is
  deprecated and blocked on some slow connections by Chrome; acceptable for
  now since the vendored copy is the primary path.
- **Session-number fallback** in `lecture-modern.js:657–659` duplicates
  knowledge that already lives in `course-data.js`; once finding 1 is fixed,
  the hand-maintained `extras`/sequence fallback tables could shrink.

## Content audit

### Verified correct

- **All 41 `codes/*.cpp` examples compile cleanly** with
  `g++ -std=c++17 -Wall -Wextra -Wpedantic` — zero warnings, matching the
  README claim.
- **Prerequisite discipline holds in the code library.** Checked mechanically:
  no user-written function before L07, no `std::vector` before L10, no
  `std::string` before L11, no `struct`/`class` before L13, no `new`/`delete`
  before L14. The "no concept before its lecture" claim is true for the code.
- **Concept data is internally consistent.** Exactly 118 concepts as
  advertised, no duplicate IDs; every concept has both a slide reference and a
  glossary entry in `course-map.js`, and there are no orphan glossary entries.
- **Lecture schedule matches the 2026 calendar.** All 25 sessions fall on
  Tue 10:30–11:25 or Fri 11:30–12:25 as claimed; the schedule correctly skips
  15 Sep (Monday timetable), the mid-semester assessment window (18–26 Sep),
  the break (27 Sep–4 Oct), and the 20 Oct holiday. Quiz slots (25 Aug,
  27 Oct) match the README.
- **IC151 lab dates are consistent**: a clean Mon/Thu/Sat rotation from 6 Aug
  to 21 Nov, with no labs during the assessment window or break, finishing
  before 23 Nov as stated.
- **Sampled decks are technically accurate.** L17's binary search uses the
  overflow-safe midpoint, the BST insert and `heapify` are correct, and the
  stability claims (merge sort stable, heap sort in-place but not stable) are
  right. L02's type guidance and `auto` examples are correct. No factual
  errors found in the sampled decks.
- **Every lecture keeps the promised structure**: all 23 decks contain the
  Problem→Model→…→Improve studio slide, a game-evolution slide, and a
  runtime-injected 5-problem practice set; practice/example topics align with
  each lecture's title.

### Content concerns

1. **Authored decks are thin for a 55-minute session.** Each deck is 9–12
   authored slides, ~580–880 words of markdown (L12, the debrief, is the
   thinnest at 583 words). Much of the effective content — practical example,
   practice set, reference slides — is injected at runtime.
2. **Lecture content is split across two sources that can drift.** Slide
   markdown lives in `scripts/generate-lectures.mjs`; the practical examples
   and practice sets live in a 1,711-line `lecture-modern.js` as a
   `legacyExtras` table remapped to current lecture numbers through the
   hand-maintained `chronologicalExtraSources` map (`lecture-modern.js:628`).
   The mapping is currently aligned, but nothing enforces it, and legacy extra
   `12` is dead weight (24 entries, 23 used). Consider moving the extras into
   the generator so each lecture's content has one source of truth.
3. **`Lxx · Syy` references are hand-maintained and unvalidated.**
   `CS103SlideReferences` in `course-map.js` assigns each concept a slide
   number, but nothing checks that slide `Syy` exists in the (partly
   runtime-assembled) deck, so regeneration can silently break the "stable
   reference" promise. A small validation script in `scripts/` would close
   this.
4. **Schedule facts are duplicated in prose.** Dates and batch details appear
   in `course-data.js`/`ic151.js` (rendered) and again hard-coded in README
   and page copy. They agree today; any schedule change must now be made in
   several places.

## Suggested order of work

1. Fix the `course-data.js` load order (finding 1) and regenerate lectures —
   this is a one-line change in two files plus a regeneration.
2. Delete `heapsort_demo`, `memes/`, and the three orphaned HTML pages.
3. Decide whether the time API stays; update README wording either way.
4. Add a validation script for `CS103SlideReferences` and fold the
   `legacyExtras` content into the lecture generator (content concerns 2–3).
