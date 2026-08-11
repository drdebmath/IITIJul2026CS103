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

This restriction also applies to Lecture 1 and Lecture 2 entries in generator files, shared data,
extras, concept mappings, and other sources whenever changing them would alter the
delivered content. Concept mappings may still be repaired when only the link or
target is wrong and the lecture itself remains unchanged.
