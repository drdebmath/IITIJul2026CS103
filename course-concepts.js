(function () {
    'use strict';

    // Every deck carries a "general form" slide except the first two, which
    // introduce programs and types before any construct has a syntax to show.
    const decksWithoutSyntax = new Set(['lecture1.html', 'lecture2.html']);

    const c = (id, title, href, keywords = '', application = false) => {
        const authoredReference = window.CS103SlideReferences && window.CS103SlideReferences[id];
        // A deck such as lecture5-5.html is a supplement: its number is 5.5 and its
        // file name cannot be rebuilt from that number, so keep the href as given.
        const parts = href.match(/lecture(\d+)(?:-(\d+))?\.html/i) || [];
        const fallbackLecture = Number(parts[2] ? `${parts[1]}.${parts[2]}` : parts[1]);
        const lecture = authoredReference ? authoredReference[0] : fallbackLecture;
        const deck = (href.match(/^[^#?]+\.html/i) || [])[0] || `lecture${lecture}.html`;
        const slide = authoredReference ? authoredReference[1] : 1;
        const glossary = (window.CS103Glossary && window.CS103Glossary[id]) || [title, `A core concept in ${title}.`];
        const reference = `L${String(lecture).padStart(2, '0')} · S${String(slide).padStart(2, '0')}`;
        return {
            id,
            title,
            href: `${deck}?concept=${encodeURIComponent(id)}`,
            syntaxHref: decksWithoutSyntax.has(deck) ? null : `${deck}?syntax`,
            keywords,
            application,
            lecture,
            slide,
            reference,
            term: glossary[0],
            definition: glossary[1],
            aliases: glossary.slice(2)
        };
    };

    window.CS103ConceptTree = [
        {
            id: 'pre',
            title: 'Before mid-semester',
            label: 'Programming foundations',
            modules: [
                {
                    id: 'm1', number: '01', title: 'Programming & Problem Solving', lecture: 'lecture1.html',
                    description: 'Understand what programs do, turn problems into algorithms, and run a first C++ program.',
                    concepts: [
                        c('m1-programming', 'Programs, algorithms & computation', 'lecture1.html#slide-what-is-programming', 'programming instructions algorithms computation'),
                        c('m1-solving', 'Problem-solving workflow', 'lecture1.html#slide-problem-solving', 'understand plan code test debug optimize pseudocode'),
                        c('m1-computers', 'How computers execute instructions', 'lecture1.html#slide-how-computers-work', 'cpu memory storage deterministic binary'),
                        c('m1-levels', 'Abstraction: machine code to high-level code', 'lecture1.html#slide-high-low-level', 'abstraction assembly compiler high low level'),
                        c('m1-hello', 'Anatomy of a first C++ program', 'lecture1.html#slide-hello-world', 'hello world main include cout return'),
                        c('m1-toolchain', 'Edit, compile, link & run', 'lecture1.html#slide-dev-setup', 'g++ compiler linker executable github terminal'),
                        c('m1-history', 'Evolution of programming languages', 'lecture1.html#slide-history', 'history language generations context'),
                        c('m1-why-cpp', 'Why learn C++?', 'lecture1.html#slide-why-cpp', 'performance systems memory python comparison')
                    ]
                },
                {
                    id: 'm2', number: '02', title: 'Types, Expressions & Program State', lecture: 'lecture2.html',
                    description: 'Represent values precisely, build expressions, and reason about names, scope, storage, and linkage.',
                    concepts: [
                        c('m1-comments', 'Comments, identifiers & declarations', 'lecture1.html#slide-comments-variables', 'comments identifiers declaration syntax'),
                        c('m2-types', 'Data types & static typing', 'lecture2.html', 'compile time type checking representation'),
                        c('m2-primitives', 'Primitive types', 'lecture2.html', 'int float double char bool'),
                        c('m2-modifiers', 'Type modifiers and signedness', 'lecture2.html', 'signed unsigned short long range'),
                        c('m2-variables', 'Variables, initialization & assignment', 'lecture2.html', 'state variable initialize assign'),
                        c('m2-const', 'Immutable values with const', 'lecture2.html', 'const qualifier immutability'),
                        c('m2-inference', 'Type inference with auto', 'lecture2.html', 'auto inference compile time'),
                        c('m2-casting', 'Explicit type conversion', 'lecture2.html', 'static cast conversion truncation'),
                        c('m2-scope', 'Block, local & global scope', 'lecture3.html', 'scope visibility lifetime block local global'),
                        c('m2-storage', 'Storage duration & linkage', 'lecture3.html', 'local global static extern linkage duration'),
                        c('m2-namespaces', 'Namespaces & qualified names', 'lecture3.html', 'namespace std scope resolution collision'),
                        c('m2-operators', 'Operators & expressions', 'lecture3.html', 'arithmetic logical relational expression'),
                        c('m2-precedence', 'Operator precedence & associativity', 'lecture3.html', 'precedence associativity parentheses'),
                        c('m2-increment', 'Pre-increment vs. post-increment', 'lecture3-5.html', 'increment decrement prefix postfix sequencing unsequenced')
                    ]
                },
                {
                    id: 'm3', number: '03', title: 'Decisions & Iteration', lecture: 'lecture4.html',
                    description: 'Control execution with boolean decisions and safe, purposeful repetition.',
                    concepts: [
                        c('m3-conditionals', 'Boolean conditions & branching', 'lecture4.html', 'condition boolean branch control flow'),
                        c('m3-if-else', 'if, else if & else', 'lecture4.html', 'if else decision branch'),
                        c('m3-switch', 'Multi-way selection with switch', 'lecture4.html', 'switch case break selection'),
                        c('m3-short-circuit', 'Short-circuit boolean evaluation', 'lecture4.html', 'and or lazy guard safety'),
                        c('m3-comparison', 'Safe comparisons & conditional pitfalls', 'lecture4.html', 'floating point assignment comparison dangling else'),
                        c('m3-while', 'Condition-controlled while loops', 'lecture5.html', 'while sentinel repetition'),
                        c('m3-for', 'Count-controlled for loops', 'lecture5.html', 'for counter iteration'),
                        c('m3-do-while', 'Post-test do-while loops', 'lecture5.html', 'do while input validation'),
                        c('m3-loop-choice', 'Choosing a loop from the invariant', 'lecture5.html', 'loop selection invariant termination'),
                        c('m3-loop-pitfalls', 'Loop termination, overflow & off-by-one safety', 'lecture5.html', 'infinite loop off by one overflow semicolon')
                    ]
                },
                {
                    id: 'm4', number: '04', title: 'Functions & Recursive Decomposition', lecture: 'lecture7.html',
                    description: 'Package behavior behind interfaces, pass data deliberately, and decompose problems recursively.',
                    concepts: [
                        c('m4-function-anatomy', 'Function declaration, definition & call', 'lecture7.html', 'prototype definition call interface'),
                        c('m4-parameters', 'Parameters & return values', 'lecture7.html', 'argument parameter return'),
                        c('m4-reference', 'Pass by value vs. reference', 'lecture7.html', 'copy alias reference mutation'),
                        c('m4-const-reference', 'Read-only parameters with const reference', 'lecture7.html', 'const reference large object efficiency'),
                        c('m4-overloading', 'Defaults, inline, constexpr & overloading', 'lecture7.html', 'default argument inline constexpr overload'),
                        c('m4-lambdas', 'Lambda expressions', 'lecture8.html', 'anonymous function capture callable'),
                        c('m4-call-stack', 'Function calls & the call stack', 'lecture20.html', 'stack frame activation record return address'),
                        c('m4-recursion', 'Base cases & recursive cases', 'lecture20.html', 'recursion base case progress factorial'),
                        c('m4-recursive-design', 'Recursion vs. iteration', 'lecture7.html', 'recursive iterative tradeoff termination'),
                        c('m4-complexity', 'Cost and complexity reasoning', 'lecture20.html', 'time space complexity calls growth')
                    ]
                },
                {
                    id: 'm5', number: '05', title: 'Sequences, Text & Array Algorithms', lecture: 'lecture9.html',
                    description: 'Store indexed sequences, process text safely, and apply search and sort algorithms to arrays.',
                    concepts: [
                        c('m4-arrays', 'Fixed-size arrays', 'lecture6.html', 'array contiguous fixed sequence'),
                        c('m4-array-access', 'Indexing, traversal & bounds', 'lecture6.html', 'index zero based traversal bounds'),
                        c('m5-multidimensional', 'Multidimensional arrays', 'lecture6.html', 'matrix image row column nested array'),
                        c('m4-vector', 'Dynamic sequences with std::vector', 'lecture6.html', 'vector size push back at'),
                        c('m4-cstrings', 'C-style strings as character arrays', 'lecture14.html', 'char array null terminator c string'),
                        c('m4-cstring-lib', 'C-string library operations', 'lecture14.html', 'cstring strlen strcpy strcmp strcat'),
                        c('m4-std-string', 'The std::string value type', 'lecture14.html', 'string class modern text'),
                        c('m4-string-ops', 'String access, search & modification', 'lecture14.html', 'size append find substr replace'),
                        c('m4-string-io', 'String input, output & conversion', 'lecture14.html', 'getline cin stoi stod to_string'),
                        c('m4-cctype', 'Character classification & transformation', 'lecture14.html', 'cctype isalpha isdigit toupper'),
                        c('m4-string-safety', 'String boundaries & input safety', 'lecture14.html', 'buffer overflow out of bounds getline safety'),
                        c('m4-linear-search', 'Array application · Linear search', 'lecture10.html', 'scan sequential find', true),
                        c('m4-bubble-sort', 'Array application · Bubble sort', 'lecture10.html', 'adjacent swap sorted', true),
                        c('m4-binary-search', 'Sorted-array application · Binary search', 'lecture11.html', 'sorted invariant halve search', true),
                        c('m4-merge-sort', 'Array and recursion application · Merge sort', 'lecture11.html', 'divide conquer merge stable', true)
                    ]
                },
                {
                    id: 'm6', number: '06', title: 'Records, Pointers & Memory', lecture: 'lecture13.html',
                    description: 'Model records, follow addresses, and manage dynamic storage with explicit lifetime rules.',
                    concepts: [
                        c('m4-structs', 'Structures as record types', 'lecture8.html', 'struct record member dot'),
                        c('m4-struct-layout', 'Structure layout, alignment & padding', 'lecture8.html', 'memory layout padding alignment'),
                        c('m6-array-records', 'Array application · Collections of records', 'lecture8.html', 'array of structs stride record collection', true),
                        c('m5-pointers', 'Pointers & addresses', 'lecture8.html', 'pointer address ampersand memory'),
                        c('m5-dereference', 'Dereferencing, dot & arrow', 'lecture8.html', 'dereference member access arrow dot'),
                        c('m5-arithmetic', 'Pointer arithmetic & array correspondence', 'lecture8.html', 'pointer arithmetic stride array decay'),
                        c('m6-pointer-safety', 'Null, uninitialized & bounds-safe pointers', 'lecture8.html', 'nullptr uninitialized invalid bounds safety'),
                        c('m5-static-dynamic', 'Automatic, static & dynamic storage', 'lecture9.html', 'stack heap lifetime storage'),
                        c('m5-malloc', 'C allocation with malloc & free', 'lecture9.html', 'malloc calloc realloc free'),
                        c('m5-new-delete', 'C++ allocation with new & delete', 'lecture9.html', 'new delete array allocation'),
                        c('m6-allocation-failure', 'Allocation failure handling', 'lecture9.html', 'bad_alloc null failure condition'),
                        c('m5-leaks', 'Leaks, dangling pointers & double deletion', 'lecture9.html', 'leak dangling use after free double delete'),
                        c('m5-smart', 'Ownership with smart pointers', 'lecture9.html', 'unique_ptr shared_ptr ownership RAII')
                    ]
                },
                {
                    id: 'm7', number: '07', title: 'Linear & Tree Data Structures', lecture: 'lecture15.html',
                    description: 'Choose a structure from its operations, then implement linked, stack, queue, tree, and heap behavior.',
                    concepts: [
                        c('m7-abstraction', 'Data structures as operation contracts', 'lecture10.html', 'abstract data type operation invariant representation'),
                        c('m5-linked', 'Linked-list representation', 'lecture9.html', 'node next head dynamic chain'),
                        c('m7-linked-ops', 'Linked-list traversal & updates', 'lecture9.html', 'insert delete traverse append'),
                        c('m5-stack', 'Array application · Stack', 'lecture10.html', 'stack lifo push pop top', true),
                        c('m5-queue', 'Linked-list application · Queue', 'lecture10.html', 'queue fifo enqueue dequeue', true),
                        c('m8-bst', 'Linked-node application · Binary search tree', 'lecture11.html', 'bst node ordering tree', true),
                        c('m7-bst-insert', 'BST application · Recursive insertion', 'lecture11.html', 'bst insert recursion invariant', true),
                        c('m8-heap', 'Array application · Binary heap', 'lecture11.html', 'heap complete tree priority array', true),
                        c('m7-heap-ops', 'Heap application · Insert, remove & heapify', 'lecture11.html', 'sift heapify insert remove', true),
                        c('m7-heap-sort', 'Heap application · Heap sort', 'lecture11.html', 'heap sort in place selection', true),
                        c('m5-reversal', 'Linked-list application · Reversal', 'lecture20.html', 'reverse links iterative recursive', true)
                    ]
                }
            ]
        },
        {
            id: 'post',
            title: 'After mid-semester',
            label: 'Abstraction and integration',
            modules: [
                {
                    id: 'm8', number: '08', title: 'Object Design & Value Semantics', lecture: 'lecture18.html',
                    description: 'Bind state to behavior and make object construction, copying, assignment, and destruction predictable.',
                    concepts: [
                        c('m6-oop', 'Procedural vs. object-oriented design', 'lecture15.html', 'procedural oop state behavior'),
                        c('m6-classes', 'Classes & objects', 'lecture15.html', 'class object member method'),
                        c('m6-access', 'Public, private & protected access', 'lecture15.html', 'access specifier interface implementation'),
                        c('m6-encapsulation', 'Encapsulation & class invariants', 'lecture19.html', 'data hiding invariant interface'),
                        c('m6-constructors', 'Construction & object initialization', 'lecture15.html', 'constructor initialization lifecycle'),
                        c('m8-constructor-types', 'Default, parameterized & copy construction', 'lecture15.html', 'default parameterized copy constructor'),
                        c('m7-overload-ctor', 'Constructor overloading', 'lecture15.html', 'multiple constructors overload'),
                        c('m6-destructors', 'Destruction & object lifetime', 'lecture15.html', 'destructor cleanup lifetime'),
                        c('m8-raii', 'RAII and resource ownership', 'lecture15.html', 'resource acquisition initialization ownership cleanup'),
                        c('m7-copy', 'Copy semantics', 'lecture15.html', 'copy constructor deep shallow copy'),
                        c('m7-operators', 'Operator overloading', 'lecture15.html', 'operator overload class syntax'),
                        c('m7-stream', 'Stream insertion & extraction operators', 'lecture15.html', 'ostream istream shift friend'),
                        c('m7-comparison', 'Comparison operators', 'lecture15.html', 'equality ordering comparison'),
                        c('m7-assignment', 'Assignment & self-assignment', 'lecture15.html', 'assignment operator self reference'),
                        c('m7-friend', 'Friend functions & trusted access', 'lecture16.html', 'friend access nonmember')
                    ]
                },
                {
                    id: 'm9', number: '09', title: 'Inheritance, Polymorphism & Applied Systems', lecture: 'lecture20.html',
                    description: 'Build substitutable type hierarchies and combine earlier structures and algorithms inside complete systems.',
                    concepts: [
                        c('m8-inheritance', 'Inheritance & derived classes', 'lecture16.html', 'base derived is-a reuse'),
                        c('m8-hierarchy', 'Class hierarchies', 'lecture16.html', 'hierarchy base derived design'),
                        c('m8-access-inheritance', 'Public vs. private inheritance', 'lecture17.html', 'public private inheritance substitutability implementation'),
                        c('m8-multiple', 'Multiple inheritance', 'lecture17.html', 'multiple base classes'),
                        c('m8-diamond', 'Diamond ambiguity & virtual inheritance', 'lecture17.html', 'diamond ambiguity virtual base'),
                        c('m8-virtual', 'Virtual functions & dynamic dispatch', 'lecture17.html', 'virtual override vtable dispatch'),
                        c('m8-polymorphism', 'Runtime polymorphism', 'lecture17.html', 'base pointer substitution dynamic type'),
                        c('m8-factory', 'Factory construction pattern', 'lecture17.html', 'factory pattern polymorphic creation'),
                        c('m8-container', 'Polymorphism application · Heterogeneous container', 'lecture18.html', 'shape container base pointers manager', true),
                        c('m8-graph', 'Object application · Polymorphic graph', 'lecture18.html', 'graph vertex edge polymorphic structure', true),
                        c('m9-system-design', 'System decomposition & responsibilities', 'lecture19.html', 'requirements responsibility cohesion coupling'),
                        c('m9-flight', 'System application · Flight booking model', 'lecture19.html', 'flight booking applied oop', true),
                        c('m9-domain-classes', 'Domain classes & relationships', 'lecture19.html', 'flight passenger booking relationship'),
                        c('m9-search', 'Collection application · Finding domain objects', 'lecture19.html', 'flight search linear binary collection', true),
                        c('m9-sort', 'Collection application · Ordering domain objects', 'lecture19.html', 'sorting comparator results', true),
                        c('m9-routing', 'Graph application · Route optimization', 'lecture19.html', 'route path graph optimization', true),
                        c('m9-patterns', 'Applied design patterns', 'lecture19.html', 'factory strategy architecture extensibility'),
                        c('m4-permutations', 'Array and recursion application · Permutations', 'lecture20.html', 'permutation backtracking recursion array', true),
                        c('m4-lcs', 'String and recursion application · Longest common subsequence', 'lecture20.html', 'lcs sequence memoization recursion string', true),
                        c('m4-radix', 'Bucket application · Radix sort', 'lecture21.html', 'radix lsd bucket stable digit', true),
                        c('m4-matrix', 'Matrix application · Recursive block multiplication', 'lecture21.html', 'matrix block recursion multiplication', true),
                        c('m8-invert', 'Tree and recursion application · Invert a binary tree', 'lecture21.html', 'tree inversion recursive transform', true),
                        c('m9-chess', 'Polymorphism application · Chess pieces', 'lecture21.html', 'chess hierarchy legal moves polymorphism', true)
                    ]
                }
            ]
        }
    ];

    // Records, explicit memory, and data-structure modules are deliberately
    // post-mid-semester in the novice-paced 2026 schedule.
    const prePhase = window.CS103ConceptTree.find((phase) => phase.id === 'pre');
    const postPhase = window.CS103ConceptTree.find((phase) => phase.id === 'post');
    const movedModules = prePhase.modules.filter((module) => module.id === 'm6' || module.id === 'm7');
    prePhase.modules = prePhase.modules.filter((module) => module.id !== 'm6' && module.id !== 'm7');
    postPhase.modules = [...movedModules, ...postPhase.modules];

    const sequenceModule = prePhase.modules.find((module) => module.id === 'm5');
    const structureModule = postPhase.modules.find((module) => module.id === 'm7');
    const postMidAlgorithmIds = new Set(['m4-linear-search', 'm4-bubble-sort', 'm4-binary-search', 'm4-merge-sort']);
    const postMidAlgorithms = sequenceModule.concepts.filter((concept) => postMidAlgorithmIds.has(concept.id));
    sequenceModule.concepts = sequenceModule.concepts.filter((concept) => !postMidAlgorithmIds.has(concept.id));
    structureModule.concepts.push(...postMidAlgorithms);
}());
