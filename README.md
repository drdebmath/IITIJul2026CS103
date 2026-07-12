# CS103: Introduction to Programming · Autumn 2026

[Visit the course website](https://drdebmath.github.io/IITIJul2026CS103)

Classes commence on August 3, 2026. Lectures meet Tuesdays from 10:30–11:25 IST and Fridays from 11:30–12:25 IST.

The site includes a validated 118-concept prerequisite DAG, a server-time upcoming-lecture indicator, cookie-based local study progress, and Reveal.js lecture decks with practical examples and five-problem lab practice sets. Every concept has a stable `Lxx · Syy` reference and a definition shown on hover, keyboard focus, or touch at its first scheduled introduction.

The dependency order moves through problem solving; types and state; decisions and iteration; functions; arrays and text; records, pointers, and memory; linear and tree structures; object design; and finally inheritance, polymorphism, and applied systems. Lecture filenames and labels run chronologically from `lecture1.html` / L01 through `lecture23.html` / L23. The 25 contact slots contain 23 paced lectures plus Quiz 1 on August 25 and Quiz 2 on October 27. Schedule rows use only the lecture reference (for example, L06), without a separate session-number prefix. The standalone [code library](codes/index.html) contains 38 lecture-prefixed C++17 examples, all compile-checked with `-Wall -Wextra -Wpedantic`.

The [IC151 laboratory companion](ic151.html) contains the CITC setup checklist, GitHub Classroom workflow, local C++ commands, and the B1–B4 Autumn 2026 schedule. B3 begins August 6, B4 begins August 8, and B1–B2 begin August 10. Every batch completes six labs before mid-semester and six after it, with no classes or labs during the September 27–October 4 break. Final lab examinations run November 16–21, before November 23.

Reveal.js 5.1.0 is vendored under `vendor/reveal` for reliable static hosting. Every lecture loads the local copy first and falls back to the pinned jsDelivr build if a local asset is unavailable. Lecture pages share one responsive reader/full-screen layout and one persistent light/dark theme.

## Local preview

```sh
python3 -m http.server 8001
```

Open `http://localhost:8001`. The repository is a build-free static site and includes `.nojekyll` for direct GitHub Pages hosting.
