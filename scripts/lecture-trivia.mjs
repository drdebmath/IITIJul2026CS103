// One "Did you know" slide per delivered lecture, placed just before the
// studio slide. Three short facts each; every Section F trivia item of the
// mid-semester paper is covered here.
export const lectureTrivia = {
    "1": [
        "ENIAC, finished in 1945, was programmed with plugboards and switches, and its first job was computing artillery firing tables.",
        "Ada Lovelace published the first algorithm meant for a machine in 1843, for Charles Babbage's Analytical Engine, which was never built.",
        "Fortran, released in 1957, was the first language that let scientists write formulas instead of machine instructions."
    ],
    "2": [
        "A byte is 8 bits and holds 256 values. The word was coined at IBM in 1956 and deliberately misspelled so it would not be confused with \"bit\".",
        "ASCII stands for American Standard Code for Information Interchange. `A` is 65 and `a` is 97, so changing case is a difference of exactly 32.",
        "Because a `bool` is stored in a whole byte, eight of them take eight bytes, not one."
    ],
    "3": [
        "C was written at Bell Labs in 1972 so that Unix could be rewritten in it. It took its name from its predecessor, a language called B.",
        "C++ began in 1979 as \"C with Classes\". The name is a pun on the increment operator: one more than C.",
        "Bjarne Stroustrup, who designed C++, did so at the same Bell Labs where C and Unix were born."
    ],
    "4": [
        "In 1947 Grace Hopper's team taped a moth found in a relay of the Harvard Mark II into the logbook, which made \"bug\" and \"debugging\" everyday words.",
        "Hopper also built the first compiler, A-0, in 1952, when most people believed computers could only do arithmetic.",
        "K&R, the 1978 book by Brian Kernighan and Dennis Ritchie, is where `hello, world` became the traditional first program."
    ],
    "5": [
        "Alan Turing proved in 1936 that no program can decide, for every program, whether it will ever stop. This is the halting problem, and it is why the progress argument for a loop is yours to make.",
        "Apple's headquarters address from 1993 to 2017 was 1 Infinite Loop.",
        "The 1936 paper also defined the Turing machine, the abstract model every modern computer is measured against."
    ],
    "6": [
        "Tony Hoare introduced the logic of loop invariants in 1969. He also invented quicksort, and later called the null reference his \"billion-dollar mistake\".",
        "Edsger Dijkstra's 1968 letter \"Go To Statement Considered Harmful\" is why we write structured loops instead of jumps.",
        "Dijkstra also argued, in a 1982 note, that numbering should start at zero, which is why `for (int i = 0; i < n; ++i)` looks the way it does."
    ],
    "7": [
        "The `a` in `a.out` stands for assembler output, a name kept from the very first Unix in 1971.",
        "GCC stands for GNU Compiler Collection, started by Richard Stallman in 1987; `g++` is its C++ front end.",
        "C++ received its first ISO standard in 1998. C++11, C++14 and C++17 followed, and C++17 is the version this course assumes."
    ],
    "8": [
        "Each call owns a stack frame, so a recursion that never reaches its base case ends in a stack overflow, the phrase the programmers' question-and-answer site adopted as its name in 2008.",
        "References and function overloading were among the first features that \"C with Classes\" added to C in the early 1980s.",
        "The classic joke: to understand recursion, you must first understand recursion."
    ],
    "9": [
        "The Morris worm of 1988, the first major internet worm, spread through an out-of-bounds write into a C array.",
        "Rust, sponsored by Mozilla from 2010 and with a crab named Ferris as its mascot, was designed so that this class of bug does not compile.",
        "Zero-based indexing follows Dijkstra's 1982 argument: the index of an element is the number of elements before it."
    ],
    "10": [
        "`std::vector` comes from the Standard Template Library, designed by Alexander Stepanov and adopted into C++ in 1994.",
        "Go was designed at Google in 2009 by Ken Thompson and Rob Pike, both of whom had worked on Unix at Bell Labs.",
        "Linus Torvalds released Linux in 1991 as a student, and in 2005 wrote git, the tool behind your lab submissions."
    ],
    "11": [
        "Thompson and Pike designed UTF-8, the encoding of nearly all text on the web, on a placemat in a New Jersey diner in 1992.",
        "The null terminator of C strings has been called \"the most expensive one-byte mistake\": it is why C-style strings do not know their own length.",
        "Python is named after Monty Python's Flying Circus, and Java after coffee; neither name says anything about the language."
    ]
};
