# CS103 and IC151 · Course Design Document

Status: Autumn 2026 design baseline  
Institution: IIT Indore  
Instructor: Dr. Debasish Pattanayak  
Delivery: static GitHub Pages website with local-first Reveal.js lectures

## 1. Purpose

This document defines the pedagogical structure, schedule rules, content dependencies, assessment communication, laboratory coordination, and website behavior for CS103 and its IC151 laboratory companion.

The primary outcome is an independent problem solver who can approach an unfamiliar task, build a computational model, select and justify an algorithmic technique, verify the result, and improve it. C++ syntax is a means to that outcome, not the course identity.

Two commitments support that outcome:

1. Make first-semester programming accessible to a complete novice, including a student who has rarely used a desktop computer.
2. Preserve a technically correct prerequisite path from elementary program state to data structures, algorithms, object design, and applied systems.

The course website is part of the learning environment. Its navigation, concept graph, slide references, examples, progress tracking, and accessibility behavior must reinforce the same course design.

## 2. Learner assumptions

No prior programming experience is required. The first lecture must also assume that some students may not yet know how to:

- identify and press a computer power button;
- sign in to a shared laboratory computer;
- distinguish a window, application, browser, file, folder, and terminal;
- use single-click, double-click, Backspace, Enter, or common keyboard symbols;
- create, locate, save, compile, or run a file;
- interpret an error message without treating it as failure.

These are taught explicitly and without stigma. Instructions use concrete actions, visible results, and one new interaction at a time. A student should never need undocumented computer knowledge to begin a programming task.

## 3. Pedagogical principles

### 3.1 Dependency before chronology

Every technical concept belongs to a directed acyclic graph (DAG). An edge means “understand this prerequisite before the target concept.” Context, history, and motivation may be leaves; they must not become artificial prerequisites for unrelated programming skills.

The graph is the source of truth for:

- module order;
- lecture order;
- concept-to-slide references;
- the searchable concept index;
- “builds on” and “unlocks” lecture context;
- the first formal introduction of technical terms.

### 3.2 Concrete before abstract

Each topic begins with a familiar or practical problem, then introduces syntax, representation, and vocabulary. Examples should use domains such as travel time, sensor readings, electrical protection, production checks, images, institute IDs, print queues, maintenance priority, and flight booking.

### 3.3 Data structures through applications

Algorithms are not taught as a detached catalogue. They are introduced as operations enabled by a structure:

- linear search and elementary sorting operate on arrays;
- queues express first-in-first-out scheduling;
- stacks express last-in-first-out history;
- binary search exploits sorted arrays;
- insertion and traversal maintain a binary-search-tree invariant;
- heap operations maintain priority in an array-backed complete tree;
- route search operates on a graph;
- polymorphic aggregation operates on a container of interface-typed objects.

### 3.4 Prediction before execution

Students predict output or state before running code. Trace tables, boundary cases, and explicit invariants are preferred over trial-and-error editing.

### 3.5 Core path plus reference depth

Each scheduled class has a paced 55-minute core path. Additional historical detail, alternate implementations, extended visualizations, and advanced variants remain available as reference slides, but do not expand the live session.

A concept link may open a reference slide directly. The learner can toggle between the 55-minute core and the complete reference deck.

### 3.6 The algorithmic studio cycle

Syntax is introduced only when it helps solve a visible problem. Every lecture and project uses the same six questions, shown with the same labels so that students gradually internalize them:

1. **Problem —** What must the system accomplish? What are its inputs, outputs, constraints, and success criteria?
2. **Model —** Which details of the real situation matter, and which can be deliberately ignored?
3. **Represent —** What state must be stored? Which type or data structure makes the required operations natural?
4. **Solve —** Which small, precise steps transform the input state into the result? Which algorithmic paradigm fits those steps?
5. **Verify —** Why should the steps work? State a contract, invariant, decreasing measure, or exhaustive set of cases; then test normal, boundary, and invalid inputs.
6. **Improve —** Can the solution become clearer, more general, faster, safer, easier to test, or more compelling to watch?

The cycle is not a one-way recipe. A failed test may reveal a poor model; an awkward algorithm may reveal the wrong representation. Students are expected to move backward, revise an assumption, and try again. “I do not know yet” is followed by a concrete learning action: make a tiny example, draw the state, consult the concept DAG, read one diagnostic, compare two techniques, or ask a precise question.

Each deck contains a generated **Algorithmic studio** brief. It names the continuing project thread, answers all six questions for that lecture, identifies the technique lens, and suggests an alternative worth comparing. The brief is context rather than an additional assessed concept, so stable `Lxx · Syy` references and the eight-authored-slide core remain unchanged.

Each deck also contains exactly one **Game evolution sneak peek**. It appears only after the authored slide that teaches every feature used in its code. The slide identifies the precise Grid Snake + Cleaner subsystem unlocked that day, provides a prerequisite-safe snippet or integration trace, states an invariant or test, and names the next capability. The sequence therefore makes growth visible without solving the final game prematurely.

### 3.7 One evolving project spine

Students should feel that they are constructing increasingly capable systems, not discarding one exercise after another. The main spine evolves in visible stages:

`printed command → changing state → animated grid → snake body → linked body → frontier search → shortest route → robot objects → multi-agent graph cleaner → open capstone`

Small weekly branches introduce text processing, component labeling, procedural music, and circuit optimization. Every branch reconnects to the same questions about state, representation, correctness, and trade-offs. Students keep a short engineering log containing the six-question brief, a hand trace, three tests, one failed idea, and one proposed extension.

The instructor routinely presents at least two plausible approaches. Students predict which is clearer or faster, collect evidence, and explain when the conclusion could change. Elegance is treated as explainable structure—not short code.

### 3.8 Recognizing an algorithmic technique

Techniques are introduced as answers to recognizable problem shapes rather than as vocabulary to memorize.

| Signal in a new problem | First technique to consider | Question that verifies the fit |
|---|---|---|
| Small search space; need a trustworthy baseline | brute force | Can every candidate be enumerated and checked within the limits? |
| Same problem appears on smaller independent pieces | divide and conquer | Can the partial answers be combined correctly? |
| One locally best choice can safely become permanent | greedy | What exchange or staying-ahead argument justifies the choice? |
| Smaller states repeat | dynamic programming | What state completely describes a reusable subproblem? |
| Entities connected by relationships | graph algorithm | Are vertices, edges, and the path/coverage objective explicit? |
| Need a sequence of choices leading to a goal | search | What is a state, a legal move, a goal, and a visited-state rule? |
| Rules evolve state over time | simulation | Which invariant must every transition preserve? |
| The domain contains responsible, interacting entities | object-oriented model | Which state and behavior belong together, and is inheritance truly substitutable? |
| Solution mirrors a smaller instance of itself | recursion | What decreases, and what is the base case? |
| Choices may need to be undone | backtracking | How is a choice made, explored, and reversed without corrupting state? |
| Sampling or varied behavior is acceptable | randomized algorithm | What property holds always, and what claim is only probabilistic? |

Students first write a simple baseline whenever feasible. An “improvement” must preserve the same contract and be compared on the same tests; speed alone does not excuse a wrong or opaque solution.

### 3.9 Language choices

C++17 is the implementation language for assessed examples because it lets students connect high-level abstractions to representation, lifetime, performance, games, graphics, scientific computing, and systems work. Standard-library value types and RAII are preferred before manual resource management.

Rust appears in a small, non-assessed comparison after ownership has a concrete motivation. Students see how compiler-checked ownership and borrowing prevent classes of memory and concurrency defects. Python, JavaScript, and domain-specific tools may appear in demonstrations to explain that languages encode different engineering trade-offs. The transferable object of study remains the model, algorithm, correctness argument, and evidence—not loyalty to one syntax.

## 4. Semester structure

### 4.1 Meetings

- Tuesday lecture: 10:30–11:25 IST
- Friday lecture: 11:30–12:25 IST
- Commencement for the 2026 B.Tech., B.S., and B.Des. batch: Monday, August 3, 2026
- Mid-semester assessment period: September 18–26, 2026
- Mid-semester break: September 27–October 4, 2026
- No lecture or laboratory is scheduled during the break.
- End-semester examination period begins November 25, 2026.

Only holidays or timetable changes that affect a Tuesday or Friday CS103 slot are shown in the lecture schedule.

### 4.2 Balance

The design uses all 25 valid Tuesday/Friday contact slots through November 20:

- 12 pre-mid slots: 11 instructional sessions and Quiz 1;
- 13 post-mid slots: 12 instructional sessions and Quiz 2.

Quiz 1 is Tuesday, August 25. Quiz 2 is Tuesday, October 27. They occupy complete contact slots and are not combined with new lecture material.

### 4.3 Instructional sequence

| Session block | Focus |
|---|---|
| Pre-mid 01–02 | Computer orientation, problem solving, first program, types |
| Pre-mid 03–04 | Expressions, state, scope, decisions |
| Pre-mid 05–06 | Iteration I and II |
| Pre-mid 07–09 | Quiz 1, Functions I, Functions II |
| Pre-mid 10–12 | Arrays I, Arrays II, strings and text |
| Post-mid 13–18 | Assessment debrief; records and pointers; dynamic memory and linked structures; linear structures; recursive decomposition; Quiz 2 |
| Post-mid 19 | Search trees, heaps, and sorting |
| Post-mid 20–23 | Object design, value semantics, inheritance, polymorphism, and polymorphic structures |
| Post-mid 24–25 | Applied object systems and recursive/polymorphic capstones |

Records, pointers, dynamic memory, linked structures, trees, heaps, and OOP are post-mid-semester topics. The pre-mid syllabus remains bounded to the programming foundations a novice can reasonably consolidate.

Lecture labels and filenames are chronological from L01 / `lecture1.html` through L23 / `lecture23.html`. Contact-slot numbers are scheduling metadata only and are not shown as an `Sxx` prefix in the student-facing schedule.

## 5. Concept DAG and modules

The current inventory contains 118 uniquely identified concepts with one explicit prerequisite list per concept. Validation must report no cycles, unknown references, duplicate concept IDs, or missing prerequisite entries.

### Before mid-semester

1. Programming and Problem Solving
2. Types, Expressions, and Program State
3. Decisions and Iteration
4. Functions and Recursive Decomposition
5. Sequences, Text, and Array Algorithms

### After mid-semester

6. Records, Pointers, and Memory
7. Linear and Tree Data Structures
8. Object Design and Value Semantics
9. Inheritance, Polymorphism, and Applied Systems

Recursion receives a gentle preview with functions, then a complete treatment after students can apply it to arrays, strings, linked nodes, and trees.

## 6. Lecture design

### 6.1 Stable references

Every mapped concept has a stable authored reference in the form `Lxx · Syy`.

- `Lxx` is the lecture file number.
- `Syy` is the authored slide number before responsive pagination.
- Generated context, checkpoint, practical-example, practice, and navigation slides do not renumber concept references.
- Responsive continuation slides may use a suffix, but the original concept reference remains stable.
- The dependency graph and searchable index link to the exact concept target.

### 6.2 Fifty-five-minute pacing

Every scheduled deck contains five short checkpoint questions:

| Approximate time | Activity |
|---:|---|
| 0–5 min | Orientation and retrieval of the prerequisite |
| 5–10 min | First concept chunk |
| 10 min | Checkpoint 1 |
| 10–20 min | Second chunk and trace |
| 20 min | Checkpoint 2 |
| 20–30 min | Guided construction |
| 30 min | Checkpoint 3 |
| 30–40 min | Practical example |
| 40 min | Checkpoint 4 |
| 40–50 min | Boundary cases, repair, or comparison |
| 50 min | Checkpoint 5 and exit explanation |

Each checkpoint uses “Think → Pair → Share” and asks for a prediction, definition, relationship, boundary case, or next step. These questions are separate from the five-problem after-lecture practice set.

### 6.3 Content limits

- Prefer one primary abstraction per concept chunk.
- Use no more than eight authored core slides in a live session; generated context, checkpoints, and after-class practice are structured separately.
- Move extended history, alternate algorithms, long quizzes, and advanced variants to reference mode.
- Every student-facing code block and standalone example uses only syntax, library types, and structures already taught by that point in the sequence. A motivating preview may show behavior or a rendered result, but it does not expose forward-reference code for students to imitate.
- Split content that cannot fit legibly in one 1920 × 1080, 16:9 full-screen slide.
- Outside full-screen mode, every lecture is a vertically scrollable reader.

### 6.4 Technical vocabulary

Each of the 118 mapped concepts has a concise definition. At the concept’s first formal introduction:

- the first matching term is rendered with `<dfn>` semantics;
- hover reveals the definition on pointer devices;
- keyboard focus reveals the same definition;
- touch focus presents a mobile-safe definition panel;
- later uses remain plain text;
- if the term does not occur verbatim in authored prose, a “New terms” chip is inserted on its introduction slide.

Definitions and concept references share one data source so that the glossary cannot drift from the DAG.

### 6.5 Code presentation

Code blocks become scrollable, editable learning surfaces. The line containing the caret is largest, adjacent lines are slightly smaller, and distant context is smaller still. This keeps long examples legible without shrinking the complete program to an unreadable size.

## 7. Examples and practice

Every lecture includes:

- a practical, domain-relevant C++ example;
- five in-lecture checkpoint questions;
- an after-lecture set of five lab-style practice problems;
- a link to its standalone code examples.

Standalone C++ filenames begin with `lecture-XX-`. Examples are expected to compile as C++17 with:

```sh
g++ -std=c++17 -Wall -Wextra -Wpedantic filename.cpp -o program
```

Support translation units are labeled explicitly. Misleading-but-compiling examples are treated as defects; examples must be technically correct, relevant to the current prerequisites, and safe enough for a novice to imitate.

The same prerequisite rule applies inside a lecture: a code variant is placed after its enabling concept, never before it. In particular, L01–L06 define no user-written functions other than `main`; functions begin in L07, arrays in L09, two-dimensional arrays and vectors in L10, records and pointers in L13, classes in L18, inheritance in L19, runtime polymorphism in L20, and heterogeneous owning containers in L21.

### 7.1 First-lecture demo theatre

Lecture 1 begins with short, pre-built demonstrations before asking students to write syntax. The instructor narrates the changing state and asks, “What information must the program remember?” The implementation is explicitly a preview; students are not expected to understand the C++ yet. Each demonstration remains available for replay in terminal and browser form, with reduced-motion controls.

| Demonstration | Computational model | Abstraction | Data structures | Algorithmic idea | Possible extensions |
|---|---|---|---|---|---|
| Cleaning robot on a 2D floor | discrete grid state updated one step at a time | robot, dirty/free/blocked cell, action | 2D array, position pair | simulation, sweep patterns, invariants | batteries, unknown obstacles, noisy sensors |
| Cleaning a graph | robot moves along connections between locations | location as vertex, passage as edge | adjacency list, queue/stack, visited set | BFS/DFS coverage | weighted roads, partial knowledge, revisit cost |
| Object discretization into components | pixels/cells are samples with neighborhood rules | foreground component | image grid, component labels, frontier | flood fill, connected components | 8-neighborhood, color regions, area/perimeter |
| Multi-agent cleaning | several autonomous entities share one environment | common agent interface plus distinct policies | classes, vector of agents, shared map | simulation, task allocation, runtime polymorphism | collisions, communication limits, auctions |
| Shortest path on a grid | each legal cell is an implicit graph vertex | current cell, neighbor, goal | grid, queue, distance/parent matrices | BFS for equal-cost moves, path reconstruction | weighted terrain, A*, moving obstacles |
| Shortest path on a graph | routes connect named places with costs | vertex, edge, path cost | weighted adjacency list, heap, parent map | Dijkstra; BFS when weights are equal | multiple objectives, closures, time-dependent edges |
| Snake game | clock ticks update body, direction, food, and score | game state and legal transition | grid, deque or vector, occupied set | simulation, collision detection, randomized food | levels, replay, autopilot search |
| Snake as linked text/structure | ordered segments each point to the next | head, body segment, tail | string for a tiny model; linked nodes for ownership | traversal, insertion, removal, reversal | circular body, persistent replay, custom allocator |
| Terminal ASCII visualization | characters encode the current state | renderer maps state to glyphs | string buffer or 2D character array | full-frame rendering, layering | color, camera window, accessibility palette |
| ASCII re-rendered animation | repeated frames approximate motion | update/render loop | state object, frame buffer, event queue | simulation clock, redraw, double buffering | pause/step, recorded traces, deterministic replay |
| HTML/SVG visualization | data becomes browser-native shapes and attributes | model/view separation | arrays of states, SVG element tree | transform state into a frame | scrubber, clickable cells, exported traces |
| Modern C++ graphical visualization | window events and drawing form an interactive loop | scene, drawable, controller | objects, vectors, textures/shapes | real-time update/render separation | sound, shaders, physics, controller support |
| Procedural music | time is divided into beats and notes | scale, rhythm, phrase | sequences, grids, event records | rules, recurrence, controlled randomness | Markov melody, MIDI export, multi-voice harmony |
| Circuit optimization | components and wires form a constrained network | node, component, cost, validity rule | graph, records, candidate assignment | brute-force baseline, greedy heuristic, backtracking/DP | tolerance, reliability, multi-objective Pareto search |
| Algorithmic art and mazes | a canvas/grid changes under deterministic or random rules | cell, color, wall, seed | grid, stack, disjoint sets | randomized generation, recursive subdivision | reproducible seeds, solver races, student galleries |

The point of the theatre is not spectacle alone. The same five nouns recur—**state, operation, invariant, objective, evidence**—so students see that apparently different applications share computational structure.

### 7.2 Semester build milestones

Weekly projects are deliberately extensible. A complete, small core earns full conceptual credit; optional branches let experienced students go deeper without making novices fall behind.

| Week | Build milestone | New reasoning move | Visible result |
|---:|---|---|---|
| 1 | command a virtual robot and print its response | input → process → output; choose representations | first terminal output and demo replay |
| 2 | robot safety controller | decisions, boundary cases, exhaustive rule tables | safe/blocked movement report |
| 3 | bounded sweep | iteration, progress measure, loop invariant | ASCII trail across a row/grid |
| 4 | modular robot controller | contracts and decomposition; compare value/reference | separately tested movement functions |
| 5 | grid world and snake prototype | indexed sequences and 2D coordinates | rendered board and moving body |
| 6 | text renderer and replay file | parsing, validation, model/view separation | saved and replayed ASCII animation |
| 7 | assessment repair studio | classify, minimize, trace, retest | before/after defect report |
| 8 | entities and linked snake | records, addresses, ownership, traversal | body represented by safe linked nodes |
| 9 | component cleaner | ADTs, brute-force baseline, frontier search | connected regions labeled/cleaned |
| 10 | recursive explorer | recursion, backtracking, memoized subproblems | maze or component search trace |
| 11 | route engine | binary search, heaps, divide-and-conquer sorting | reconstructed shortest grid route |
| 12 | robot objects and agent family | invariants, composition, safe polymorphism | two policies operating through one interface |
| 13 | graph-cleaning capstone | graph search, allocation policy, randomized experiments | multi-agent animated cleaner with report |
| 14 | open showcase branch | integrate and justify a technique | game, music, circuit, visualization, or approved idea |

Each milestone is shown in at least three representations over the semester: a hand trace or table, a terminal/ASCII view, and an HTML/SVG or interactive view. The representation changes; the tested model remains the same.

### 7.3 Open-ended comparison prompts

At least one prompt per milestone has no single prescribed implementation:

- Compare a row-by-row sweep with “move to nearest dirt.” What evidence would make one preferable?
- Store the snake in a vector, deque, string, or linked structure. Which operations become easier or harder?
- Label components with recursion, an explicit stack, or a queue. Which version best fits a large grid?
- Compare BFS, Dijkstra, and a greedy “move closer” policy on the same maps. Which guarantees change?
- Give agents fixed regions, a shared nearest-task rule, or randomized choices. Measure duplicate work and idle time.
- Generate a melody or choose circuit components using exhaustive, greedy, and randomized approaches. Define quality before comparing results.

Students must report a counterexample when a tempting method fails. Finding such a counterexample is evidence of learning, not a failed project.

## 8. Assessment communication

### Assessment philosophy

The published institute weights remain unchanged, but individual tasks and feedback reward the complete problem-solving process. A correct final output with no model, justification, or tests is incomplete evidence. A promising method with a clearly diagnosed defect can earn substantial process credit.

Project and laboratory rubrics examine:

- problem statement, assumptions, and examples;
- representation and data-structure choice;
- correct, modular C++17 implementation;
- contract, invariant, or other correctness reasoning;
- normal, boundary, invalid, and adversarial tests;
- comparison with a baseline or alternate method;
- clarity of explanation, documentation, and reflection;
- a small, justified improvement after feedback.

Students may use feedback to revise selected formative milestones, submitting the original attempt, evidence of what failed, and the new tests. This rewards consistent effort and learning while keeping summative examinations individual and aligned with institute policy. Speed competitions are optional and never replace correctness, accessibility, or explanation.

### CS103 weights

| Component | Weight |
|---|---:|
| Attendance | 5% |
| Quiz 1, before mid-semester | 7% |
| Mid-semester examination | 30% |
| Quiz 2, after mid-semester | 8% |
| End-semester examination | 50% |

The schedule must place the mid-semester examination between Quiz 1 and Quiz 2.

### IC151 weights

| Component | Weight |
|---|---:|
| 12 regular laboratories, 6% each | 72% |
| Final laboratory examination | 28% |

### Relative grade guide

The website shows a provisional percentile curve from F through DD, CD, CC, BC, BB, AB, AA, and AS. AS is shown as the top 1%; AA is shown as the next 15%, with `μ + 2σ` as a statistical reference.

This is a guide, not a final distribution. Grade boundaries and final letter-grade assignments remain with the instructor and are subject to institute rules.

## 9. IC151 laboratory design

The laboratory is in the CITC building, first floor, using computers 1–72. The companion page covers:

- powering on and booting Ubuntu;
- connecting to `IITI_Secure` if required;
- using a private/incognito browser window on a shared machine;
- signing in with the official institute Google account;
- creating a GitHub account whose username includes the roll number;
- accepting a GitHub Classroom assignment;
- editing, committing, testing, and resubmitting `hello.cpp`;
- compiling locally with `g++`;
- logging out and avoiding saved passwords before leaving.

Batch rules:

- B3 starts Thursday, August 6.
- B4 starts Saturday, August 8.
- B1 and B2 start Monday, August 10.
- Every batch completes six labs before mid-semester and six after it.
- No batch meets during September 27–October 4.
- Final lab examinations occur November 16–21 and finish before November 23.

The page states the schedule directly without displaying scheduling justifications.

## 10. Website information architecture

### Landing page

The landing page provides course identity, instructor, upcoming session, first unstudied lecture, algorithmic-thinking cycle, end-state demonstrations, fourteen-week project roadmap, compelling first-lecture plan, assessment philosophy, Hall of Fame, instructor promise, learning-community practices, provisional grade guide, lecture schedule, code library, dependency graph, and IC151 entry point. The student questionnaire is maintained and administered separately in Google Forms; the course website does not render, store, export, or transmit survey responses.

### Algorithm Studio

The interactive studio renders cleaning, breadth-first shortest paths, and playable Snake as stepwise HTML grids. Each demonstration states its computational model, abstraction, data structures, algorithm, correctness idea, and extensions. Step, run, pause, reset, speed, keyboard, theme, and reduced-motion behavior support prediction before execution. The browser view complements—not replaces—the compile-checked terminal C++ implementations.

### Dependency graph page

The speedrun page is separate from the landing page. It is a proper DAG, not a decorative tree.

- HTML buttons represent concepts.
- One static 2D canvas drawing represents prerequisite edges.
- There is no WebGL, Three.js render loop, or resource-heavy 3D scene.
- The graph flows vertically from prerequisites at the top to dependent concepts below.
- The canvas backing store uses a fixed pixel budget so high-density mobile displays cannot cause a large graphics-memory allocation.
- The complete graph is initially zoomed and centered to fit the viewport; its overview uses scale-compensated edges and cards so the DAG remains visible before labels appear at a readable zoom. Fit, range, button, keyboard, and modified-wheel controls allow intentional zooming afterward.
- The graph supports phase/module filtering, search, direct slide links, and one lazy live preview.
- Every arrow points from prerequisite to unlocked concept.

### Lecture pages

All lectures share one minimal modern theme, reader/full-screen behavior, dark mode, navigation, progress controls, checkpoint system, glossary behavior, and code-focus editor.

### Code library

The code library groups compile-checked sources by lecture in dependency order, supports search, and uses lecture-prefixed filenames. Selecting an example fetches its source into a read-only, scrollable text box on the same page. Copy places the complete source on the clipboard, while Raw opens the `.cpp` file URL directly in a new browser tab. The original source links remain usable when JavaScript is unavailable.

### IC151 page

The IC151 page combines the lab setup checklist, GitHub Classroom workflow, batch schedule, next-lab indicator, and locally stored setup progress.

## 11. Progress and time

Student lecture progress is stored only in first-party browser cookies. The site shows the first scheduled lecture not yet marked studied. Reaching the five-problem practice set marks a lecture studied; the learner may reverse that state.

No account, analytics backend, or cross-device synchronization is required.

Upcoming lecture and laboratory bars request Asia/Kolkata time from a network time endpoint. If the time service is unavailable, the site uses device time and labels the fallback. The synchronized time is advanced locally between network requests.

## 12. Accessibility and device support

- Mobile-first responsive layouts are required across landing, graph, lectures, code library, and IC151.
- All interactive controls require visible keyboard focus and accessible names.
- Tooltips work on hover and focus; mobile definitions do not depend on hover.
- Reduced-motion preferences disable nonessential animation and smooth scrolling.
- Tables scroll horizontally on small screens.
- Full-screen lecture navigation is hidden so slide content receives the complete 16:9 frame.
- Reader mode retains vertical scrolling on every device.
- Light/dark preference is stored locally and shared by all lecture pages.

## 13. Static hosting and dependencies

The site is build-free and hosted as a static GitHub Pages site.

- `.nojekyll` is present.
- All internal URLs are relative and case-correct.
- Reveal.js 5.1.0 is vendored locally.
- Lecture pages load local Reveal assets first and use a pinned jsDelivr fallback only if the local asset fails.
- No server-side session, database, or dynamic application framework is required.
- A local preview is served with `python3 -m http.server 8001`.

## 14. Acceptance criteria

The design is considered implemented when automated checks confirm:

1. Every scheduled date is a valid Tuesday or Friday slot and is outside the mid-semester break and relevant holidays.
2. Quiz 1 and Quiz 2 appear as dedicated schedule entries before and after mid-semester.
3. Lecture sequence and schedule sequence agree after quiz entries are excluded.
4. The concept inventory, glossary, and slide-reference maps cover the same 118 IDs.
5. The dependency graph has no cycles or unknown references.
6. Every concept target lecture exists and its authored slide number is in range.
7. Every scheduled lecture has five timed checkpoint questions and a five-problem practice set.
8. Every `.cpp` filename begins with a lecture prefix, appears in the code index, compiles cleanly, and links successfully with any documented support file.
9. All local HTML, CSS, JavaScript, lecture, code, and navigation links resolve under a plain HTTP server.
10. Core decks stay within the 55-minute pacing plan while reference slides remain discoverable.
11. Dark mode, keyboard focus, touch definitions, reader scrolling, and full-screen 16:9 mode are shared across all scheduled lectures.
12. All 23 decks contain one non-authored Algorithmic Studio brief, and Lecture 1 contains the motivating demo theatre without changing stable concept references.
13. The Algorithm Studio can step, run, pause, reset, and explain its cleaner, BFS, and Snake models; the three matching C++ capstones compile cleanly.
14. The student survey exists as a separate Google Form whose responder link is shared by the instructor; the course website contains no survey fields or response-storage logic.
12. Every lecture displays a six-question Problem → Model → Represent → Solve → Verify → Improve studio brief without changing authored concept references.
13. Lecture 1 includes clearly labeled, non-assessed previews of the semester builds and connects one computational model to terminal, HTML/SVG, and modern C++ graphical views.
14. The project spine progresses from printed commands through grids, Snake, linked structures, component search, shortest paths, agent objects, and graph cleaning to an open capstone.
15. Brute force, divide and conquer, greedy, dynamic programming, graph algorithms, search, simulation, object-oriented modeling, recursion, backtracking, and randomized algorithms each appear as a justified answer to a recognizable problem shape, with a comparison or counterexample prompt.

## 15. Change-control rule

When a lecture moves, splits, or introduces a concept earlier or later, the same change must update:

- the schedule;
- progress/navigation sequence;
- concept phase and prerequisites;
- `Lxx · Syy` reference;
- first-introduction glossary target;
- 55-minute core plan;
- code-library lecture prefix and links;
- previous/next navigation;
- this design document when the change affects course policy.

This prevents the calendar, DAG, slides, code examples, and student-facing navigation from becoming separate and contradictory course descriptions.
