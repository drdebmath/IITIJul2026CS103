import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { lectureExtras } from './lecture-extras.mjs';
import { lectureMemes, lectureMemeCount } from './lecture-memes.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const md = String.raw;

const lectures = [
    {
        id: 1,
        title: 'Turn a precise problem into a running C++ program',
        slides: [
            md`# Lecture 1: Turn a precise problem into a running C++ program
## Turn a precise problem into a running C++ program

Bring one problem you can explain in plain language; we will turn it into a small, observable program.

**Instructor:** [Dr. Debasish Pattanayak](https://drdebmath.github.io)`,
            md`## An algorithm is a finite sequence of precise steps

An **algorithm** is a finite sequence of precise steps.

Use the same problem-solving workflow every time:

1. **Problem:** state inputs, outputs, constraints, and success.
2. **Model:** keep only the details that affect the answer.
3. **Represent:** choose state and data structures.
4. **Solve:** write precise steps; implement one at a time.
5. **Verify:** explain why they work; test boundaries.
6. **Improve:** compare clarity, safety, generality, and cost.`,
            md`## The CPU executes instructions while RAM holds active state

- The **CPU** executes machine instructions.
- RAM holds active instructions and values temporarily.
- Storage keeps files when power is off.
- Binary encodes information using bits.

**Abstraction** lets C++ express ideas without writing machine instructions directly.`,
            md`## main starts the program and output makes the result observable

~~~cpp
#include <iostream>

int main() {
    std::cout << "Hello, CS103!\n";
    return 0;
}
~~~

<code>main</code> is the entry point. Output makes the program's result observable.`,
            md`## The toolchain turns source code into a testable executable

Save the source as <code>hello.cpp</code>, then use the toolchain:

~~~text
g++ -std=c++17 hello.cpp -o hello
./hello
~~~

- A compiler checks and translates the source.
- A linker combines required compiled parts.
- The executable is the program you run.`,
            md`## Choose a language from the problem’s trade-offs

A **programming language** makes some kinds of thinking and engineering easier than others.

- **C++17 is our main workshop:** high-level libraries, visible representation, resource control, and performance for games, graphics, science, and systems.
- **Rust is our modern glimpse:** ownership is checked by the compiler, preventing many memory and data-race defects before execution.
- Python favors rapid exploration; JavaScript reaches the browser; other languages serve other constraints.

There is no universally best language. We learn transferable models and algorithms, then choose tools from the problem.`,
            md`## Names and declarations make program state readable

~~~cpp
// A comment explains intent.
int attempts = 0;          // declaration and initialization
double distanceKm = 2.5;
bool laboratoryOpen = true;
~~~

An identifier names something. A declaration introduces a name and its type.`,
            md`## Edit → compile → link → run → test is a reliable workflow

- Begin with input, process, and output.
- An algorithm must be finite and precise.
- The CPU executes the compiled instructions.
- <code>main</code> is the C++ entry point.
- Edit → compile → link → run → test.`
        ]
    },
    {
        id: 2,
        title: 'Choose types from meaning, range, and precision',
        slides: [
            md`# Lecture 2: Choose types from meaning, range, and precision
## Give every stored value a deliberate meaning`,
            md`## Static typing checks a variable’s kind before the program runs

A **variable** is a named storage location. **Static typing** means types are checked before execution.

~~~cpp
int attempts = 0;
double temperature = 31.5;
char grade = 'A';
bool submitted = false;
~~~

The initializer supplies the first value.`,
            md`## Choose the fundamental type from the value’s meaning

| Requirement | Suitable type | Example |
|---|---|---|
| whole-number count | <code>int</code> | students |
| fractional measurement | <code>double</code> | voltage |
| the same in half the storage | <code>float</code> | humidity |
| one character | <code>char</code> | grade |
| true/false state | <code>bool</code> | connected |

<code>double</code> is the default for fractional values; <code>float</code> halves the storage and the precision, and its literals carry an <code>f</code> suffix (<code>68.4f</code>).

Sizes are implementation-dependent: inspect them with <code>sizeof</code>, and inspect the ranges with <code>std::numeric_limits&lt;T&gt;::min()</code> and <code>::max()</code> from <code>&lt;limits&gt;</code>.`,
            md`## Signedness and width determine the numeric range

<code>signed</code> supports negative and positive values. <code>unsigned</code> represents only non-negative values.

Unsigned arithmetic is modular, so it wraps at both ends: <code>0u - 1</code> is not <code>-1</code> but the largest representable value.

<code>short</code>, <code>long</code>, and <code>long long</code> change minimum range requirements.

Use a modifier only when its range and interaction with other types are understood.`,
            md`## const prevents accidental reassignment

~~~cpp
const double safeLimit = 12.5;
double reading = 11.8;

// safeLimit = 13.0;  // compile-time error
~~~

<code>const</code> prevents modification through that name after initialization.`,
            md`## auto deduces one real type without removing type meaning

~~~cpp
auto samples = 12;       // int
auto mean = 7.25;        // double
const auto room = 103;   // const int
~~~

Use <code>auto</code> when the initializer makes the type obvious.`,
            md`## Explicit casts make possible information loss visible

~~~cpp
double mean = 97.56;
int whole = static_cast<int>(mean);  // 97
~~~

An explicit conversion documents intent. Check the destination range first: fractional information may be truncated, and an out-of-range conversion may be invalid.`,
            md`## Type choice follows meaning, range, and precision

- A type describes values and permitted operations.
- Choose representation from meaning, range, and precision.
- Do not assume exact byte sizes.
- Use <code>const</code> for values that must not change.
- Make potentially lossy conversions explicit.`
        ]
    },
    {
        id: 3,
        title: 'Track expressions, scope, storage, and lifetime',
        slides: [
            md`# Lecture 3: Track expressions, scope, storage, and lifetime
## Names, values, visibility, and lifetime`,
            md`## A name is usable only inside its scope

~~~cpp
#include <iostream>

int main() {
    int outer = 10;
    {
        int inner = 3;
        outer += inner;
    }
    // inner is not visible here
    std::cout << outer << '\n';  // 13
}
~~~

Keep names in the smallest scope that contains every required use.`,
            md`## Scope controls visibility while lifetime controls existence

- **Scope:** where source code may use a name.
- **Storage duration:** how long the corresponding object exists.
- **Linkage:** whether declarations in different files name the same entity.

A local static object has block scope but program-long storage duration.`,
            md`## Storage duration explains when an object is created and destroyed

~~~cpp
// Defined outside every block: program-long storage duration.
int completedExperiments = 0;

int main() {
    int today = 2;               // exists during this run of main
    completedExperiments += today;
}
~~~

Later, functions will provide a safer interface around shared state. For now, distinguish where a name is visible from how long its object exists.`,
            md`## Linkage decides which cross-file definition is shared

~~~cpp
// data.cpp
int sharedCount = 0;

// report.cpp
extern int sharedCount;
~~~

<code>extern</code> declares an entity defined elsewhere. A complete executable must still contain <code>main</code> and link every required definition.`,
            md`## Namespaces keep same-named declarations from colliding

~~~cpp
namespace laboratory {
int completed = 0;
}

int main() {
    laboratory::completed = 1;
}
~~~

The scope-resolution operator <code>::</code> selects a name from a namespace.`,
            md`## Operators combine values into expressions

| Group | Operators | Example | What to remember |
|---|---|---|---|
| Arithmetic | <code>+ - * / %</code> | <code>7 / 2</code> is 3 | integer division truncates; <code>%</code> needs integer operands |
| Relational | <code>&lt; &lt;= &gt; &gt;= == !=</code> | <code>total &lt; 20</code> | the result is a <code>bool</code> |
| Logical | <code>&amp;&amp; \|\| !</code> | <code>a &amp;&amp; b</code> | short-circuits: the right operand may never run |
| Assignment | <code>= += -= *= /= %=</code> | <code>total += 5</code> | modifies the left operand in place |
| Increment | <code>++ --</code> | <code>++i</code> versus <code>i++</code> | prefix yields the new value, postfix the old |

Operator precedence decides binding when parentheses are absent. Prefer parentheses when a reader might hesitate.

~~~cpp
int total = 5 + 3 * 2;       // 11
int grouped = (5 + 3) * 2;   // 16
bool safe = total < 20 && grouped > 0;
~~~`,
            md`## Track every name by meaning, visibility, lifetime, and linkage

- Expressions compute values or effects.
- Parentheses make precedence explicit.
- Namespaces organize declarations.
- Scope, storage duration, and linkage answer different questions.
- Avoid global mutable state unless one clearly identified part of the program is responsible for it.`
        ]
    },
    {
        id: 4,
        title: 'Turn requirements into safe, testable branches',
        slides: [
            md`# Lecture 4: Turn requirements into safe, testable branches
## Turn requirements into testable paths`,
            md`## A Boolean condition selects a control-flow path

Write the rule before the syntax:

| Current | Emergency stop | Result |
|---|:---:|---|
| negative | either | invalid |
| above limit | either | trip |
| at or below limit | true | trip |
| above 90% of limit | false | warning |
| at or below 90% of limit | false | normal |

The rows are mutually exclusive and cover every reading. Every row should correspond to a test.`,
            md`## Order branches from exceptional cases to the normal case

~~~cpp
if (current < 0.0) {
    std::cout << "INVALID\n";
} else if (emergencyStop || current > safeLimit) {
    std::cout << "TRIP\n";
} else if (current > 0.9 * safeLimit) {
    std::cout << "WARNING\n";
} else {
    std::cout << "NORMAL\n";
}
~~~

Place exceptional and narrower cases before the normal fallback. One branch per table row, in the same order.`,
            md`## switch selects among cases for one discrete value

~~~cpp
switch (menuChoice) {
case 1: std::cout << "voltage\n"; break;
case 2: std::cout << "current\n"; break;
default: std::cout << "invalid choice\n";
}
~~~

<code>switch</code> is for integral or enumeration values, not numeric ranges.`,
            md`## Short-circuiting protects operations behind a valid guard

~~~cpp
if (resistance > minimumResistance && voltage / resistance > limit) {
    std::cout << "over current\n";
}
~~~

The division runs only when the left condition is true. Guard with a problem-chosen minimum: a resistance of 1e-300 passes <code>!= 0.0</code> and still overflows the division.`,
            md`## Floating-point comparisons need a problem-chosen tolerance

~~~cpp
double difference = measured - expected;
if (difference < 0.0) {
    difference = -difference;
}
bool nearlyEqual = difference <= tolerance;
~~~

Choose tolerance from the measurement or problem—not one universal constant. A reusable comparison function comes after functions are introduced.`,
            md`## Boundary tests reveal wrong comparisons early

For a safe limit of 10, test each input and its expected output:

- normal: 6 → NORMAL;
- lower boundary: 0 → NORMAL;
- invalid measurement: -0.1 → INVALID;
- warning boundary: 9 → NORMAL;
- just inside the warning band: 9.01 → WARNING;
- exact limit: 10 → WARNING;
- just above the limit: 10.01 → TRIP.

A boundary needs both sides. Also test every <code>switch</code> case and its default.`,
            md`## Safe branching names every path and tests every boundary

- Translate decision tables into branches.
- Order branches from exceptional to fallback.
- Use <code>switch</code> only for discrete alternatives.
- Use short-circuiting to guard unsafe work.
- Treat boundary tests as part of implementation.`
        ]
    },
    {
        id: 5,
        title: 'Make loop state progress toward termination',
        slides: [
            md`# Lecture 5: Make loop state progress toward termination
## while, do-while, progress, and stopping`,
            md`## Trace the condition and update to predict every while iteration

~~~cpp
int remaining = 3;
while (remaining > 0) {
    std::cout << remaining << ' ';
    --remaining;
}
~~~

Trace: 3 → 2 → 1 → stop at 0.`,
            md`## Every loop update must move toward termination

Before each iteration, ask:

1. What state does the condition inspect?
2. What must remain true?
3. Which statement moves toward stopping?

If no state moves toward a false condition, the loop may never terminate.`,
            md`## A sentinel lets a loop process an unknown number of inputs

~~~cpp
int value = 0;
int total = 0;
std::cin >> value;
while (value != -1) {
    total += value;
    std::cin >> value;
}
~~~

The sentinel <code>-1</code> ends input and is not added.`,
            md`## do-while validates input after the first attempt

~~~cpp
double height = 0.0;
do {
    std::cout << "Positive height: ";
    std::cin >> height;
} while (height <= 0.0);
~~~

The body runs once before the condition is tested.`,
            md`## Stalled updates and wrong bounds break loops

- No update: the condition never changes.
- Wrong direction: the update moves away from stopping.
- Off-by-one: <code>&lt;</code> and <code>&lt;=</code> describe different valid ranges.

Write the intended values beside the loop before choosing the comparison.`,
            md`## Stop a scan as soon as the answer is known

~~~cpp
while (tested < available && defects < 3) {
    double diameter;
    std::cin >> diameter;
    if (diameter < 9.95 || diameter > 10.05) ++defects;
    ++tested;
}
~~~

Both stopping reasons remain visible in the condition.`,
            md`## Choose a loop by its stopping rule and prove its progress

- <code>while</code> may execute zero times.
- <code>do-while</code> executes at least once.
- A sentinel can terminate unknown-length input.
- State must make measurable progress.
- Trace normal, boundary, and invalid cases.`
        ]
    },
    {
        id: 6,
        title: 'Use ranges and invariants to control repetition',
        slides: [
            md`# Lecture 6: Use ranges and invariants to control repetition
## for loops, nested loops, and invariants`,
            md`## A for loop makes initialization, bound, and update explicit

~~~cpp
for (int step = 1; step <= 5; ++step) {
    std::cout << step << ' ';
}
~~~

Read it as initialize → test → body → update → test again.`,
            md`## A correct counter states its valid range

For five zero-based positions, valid indices are 0, 1, 2, 3, 4.

~~~cpp
for (int i = 0; i < 5; ++i) {
    std::cout << i << ' ';
}
~~~

The condition directly states the upper boundary is excluded.`,
            md`## Nested loops enumerate every coordinate or combination

~~~cpp
for (int row = 0; row < 3; ++row) {
    for (int col = 0; col < 4; ++col) {
        std::cout << row << ',' << col << '\n';
    }
}
~~~

The inner loop completes every column for one row.`,
            md`## A loop invariant states what stays true after each iteration

Example invariant:

> Before iteration <code>i</code>, positions 0 through <code>i - 1</code> have already been processed.

Check the statement before the first iteration, after one update, and at termination.`,
            md`## Choose for, while, or do-while from the stopping rule

- <code>while</code>: stop when an event or changing condition says so.
- <code>do-while</code>: perform once, then decide.
- <code>for</code>: traverse a known counter range.

The choice communicates intent; any loop can still be written incorrectly.`,
            md`## Boundary tests expose missing or duplicated iterations

~~~cpp
for (int i = 0; i <= 5; ++i)   // six values
for (int i = 5; i >= 0; ++i)   // moves away from stopping
~~~

These are diagnosis examples. Do not run the second loop unchanged.`,
            md`## A correct loop states its range, invariant, and progress

- Put initialization, test, and update together for counted work.
- Nested loops traverse combinations such as rows × columns.
- Write valid values before writing a bound.
- Use an invariant to explain what is already correct.`
        ]
    },
    {
        id: 7,
        title: 'Declare, define, and call functions',
        slides: [
            md`# Lecture 7: Declare, define, and call functions
## Declarations, definitions, parameters, and return values`,
            md`## One function performs one explainable operation

A function contract states:

- required inputs;
- any preconditions;
- returned result or visible effect.

Small contracts reduce copy-paste and can be tested independently.`,
            md`## Read a function’s contract before its implementation

~~~cpp
double rectangleArea(double length, double width) {
    return length * width;
}
~~~

Return type → name → parameters → body.`,
            md`## Declare interfaces once and define each function once

~~~cpp
#include <iostream>

double rectangleArea(double length, double width);  // declaration

int main() {
    std::cout << rectangleArea(4.0, 3.0);
}

double rectangleArea(double length, double width) {
    return length * width;
}
~~~`,
            md`## Value parameters isolate small inputs as local copies

~~~cpp
int doubled(int value) {
    value *= 2;
    return value;
}
~~~

Changing <code>value</code> does not change the caller's argument.`,
            md`## Named functions turn a calculation into testable steps

~~~cpp
double subtotal(double price, int count) { return price * count; }
double tax(double amount, double rate) { return amount * rate; }
double total(double amount, double rate) { return amount + tax(amount, rate); }
~~~

Each name states one responsibility.`,
            md`## A lambda packages short callable behavior where it is used

A lambda expression defines a small callable at its point of use.

~~~cpp
auto isPositive = [](int value) { return value > 0; };
~~~

Named functions remain the default for novice code. Lambdas return later as search and sorting applications.`,
            md`## Function contracts make behavior testable

- A function contract states inputs, preconditions, and output.
- A declaration makes a function known before its definition.
- Value parameters are copies.
- Prefer short functions with one explainable responsibility.`
        ]
    },
    {
        id: 8,
        title: 'Choose copy, alias, and recursion deliberately',
        slides: [
            md`# Lecture 8: Choose copy, alias, and recursion deliberately
## References, overloading, decomposition, and the call stack`,
            md`## The parameter contract decides copy, alias, or read-only access

~~~cpp
void clampToZero(double& value) {
    if (value < 0.0) value = 0.0;
}
~~~

A reference is another name for the caller's object. Mutation must be part of the contract.`,
            md`## const reference reads without copying or mutating

~~~cpp
void printReading(const double& reading) {
    std::cout << reading << '\n';
}
~~~

The syntax matters now; avoiding expensive copies becomes useful when records and strings arrive.`,
            md`## Overloads share a name only when parameter lists distinguish them

~~~cpp
int absolute(int value);
double absolute(double value);
~~~

The compiler selects from parameter lists. Return type alone cannot distinguish overloads.`,
            md`## Decomposition keeps main readable and each step testable

~~~cpp
double readPositive();
double calculateFare(double distance, double rate);
void printFare(double fare);
~~~

<code>main</code> coordinates these tasks instead of containing every detail.`,
            md`## Each active call owns a stack frame until it returns

Each active call has a stack frame containing parameters, locals, and return state.

The most recent unfinished call completes first—last in, first out.`,
            md`## Recursion needs a base case and a smaller next call

~~~cpp
int factorial(int n) {
    if (n <= 1) return 1;          // base case
    return n * factorial(n - 1);   // smaller input
}
~~~

Every recursive call must move measurably toward a base case.`,
            md`## Choose parameter passing and decomposition from the contract

- References can expose caller state intentionally.
- <code>const&</code> provides read-only access through an alias.
- Overloads need distinguishable parameter lists.
- The call stack tracks unfinished calls.
- Recursive design requires a base case and progress.`
        ]
    },
    {
        id: 9,
        title: 'Traverse fixed sequences within exact bounds',
        slides: [
            md`# Lecture 9: Traverse fixed sequences within exact bounds
## Store and traverse one fixed sequence safely`,
            md`## An array fixes its element type and extent

~~~cpp
#include <array>

std::array<double, 5> voltage{2.1, 2.3, 2.0, 2.4, 2.2};
~~~

The five elements occupy a contiguous sequence.`,
            md`## An index is valid only inside the array’s exact bounds

~~~cpp
voltage[0] = 2.5;            // first element
double last = voltage[4];    // fifth element
~~~

For size 5, valid indices are 0 through 4.`,
            md`## Traversal uses the actual bound, never a guessed endpoint

~~~cpp
double sum = 0.0;
for (std::size_t i = 0; i < voltage.size(); ++i) {
    sum += voltage[i];
}
~~~

The invariant is: elements before <code>i</code> are already included.`,
            md`## Range-for visits every element without manual indices

~~~cpp
double maximum = voltage[0];
for (double value : voltage) {
    if (value > maximum) maximum = value;
}
~~~

Use an explicit index only when the position matters.`,
            md`## Array functions must receive the extent they rely on

~~~cpp
double mean(const std::array<double, 5>& values) {
    double sum = 0.0;
    for (double value : values) sum += value;
    return sum / values.size();
}
~~~`,
            md`## Out-of-bounds access has no reliable result

~~~cpp
// voltage[5] = 0.0;  // invalid: no sixth element
~~~

C++ does not automatically protect <code>operator[]</code>. Keep the valid range visible in the loop condition.`,
            md`## Safe array work respects index, traversal, and bound

- A fixed array has one type, one extent, and contiguous elements.
- Zero is the first index.
- Use <code>size()</code> as the traversal bound.
- State the invariant and test empty-boundary logic before coding.`
        ]
    },
    {
        id: 10,
        title: 'Match matrices and vectors to their operations',
        slides: [
            md`# Lecture 10: Match matrices and vectors to their operations
## Matrices and runtime-sized contiguous sequences`,
            md`## A matrix needs one bound for each dimension

~~~cpp
int image[2][3]{{10, 20, 30}, {40, 50, 60}};
int pixel = image[1][2];  // row 1, column 2
~~~

Both dimensions are zero-based.`,
            md`## Matching bounds keep row and column traversal safe

~~~cpp
for (int row = 0; row < 2; ++row) {
    for (int col = 0; col < 3; ++col) {
        std::cout << image[row][col] << ' ';
    }
}
~~~`,
            md`## std::vector owns a contiguous sequence whose size can change

~~~cpp
#include <vector>

std::vector<int> readings;
readings.push_back(17);
readings.push_back(21);
~~~

The vector grows while preserving contiguous element storage.`,
            md`## Dynamic size does not remove the need for bounds checks

~~~cpp
for (std::size_t i = 0; i < readings.size(); ++i) {
    std::cout << readings.at(i) << '\n';
}
~~~

<code>at()</code> checks; <code>operator[]</code> assumes the index is valid.`,
            md`## Choose array or vector from size and operation requirements

| Requirement | Representation |
|---|---|
| exactly seven daily readings | fixed array |
| readings until input ends | vector |
| fixed 3 × 3 transform | 2D array |
| rows whose lengths may differ | nested vectors |`,
            md`## Nested traversal makes each row total testable

~~~cpp
std::vector<std::vector<int>> scores{{8, 7, 9}, {6, 10, 8}};
for (const auto& row : scores) {
    int total = 0;
    for (int score : row) total += score;
    std::cout << total << '\n';
}
~~~`,
            md`## Storage follows size knowledge, ownership, and access operations

- A matrix needs row and column bounds.
- A vector owns a contiguous sequence whose size is known at runtime.
- <code>size()</code> states the valid upper bound.
- Choose fixed or dynamic storage from the requirement.`
        ]
    },
    {
        id: 11,
        title: 'Process owned text with explicit boundaries',
        slides: [
            md`# Lecture 11: Process owned text with explicit boundaries
## Prefer owned text values, then study their representation`,
            md`## std::string owns, sizes, and edits its character sequence

~~~cpp
#include <string>

std::string name = "IIT Indore";
std::cout << name.size() << '\n';
~~~

<code>std::string</code> manages its character storage.`,
            md`## getline reads a complete line, including spaces

~~~cpp
std::string sentence;
std::getline(std::cin, sentence);
~~~

<code>getline</code> preserves spaces. When mixing formatted extraction and line input, consume the pending newline deliberately.`,
            md`## Positions and lengths make text operations explicit

~~~cpp
std::size_t dash = code.find('-');
if (dash != std::string::npos) {
    std::string prefix = code.substr(0, dash);
}
~~~

Always check whether a search succeeded.`,
            md`## Character classification requires a safe unsigned-char conversion

~~~cpp
unsigned char ch = static_cast<unsigned char>(text[i]);
if (std::isdigit(ch)) ++digits;
~~~

Character classification comes from <code>&lt;cctype&gt;</code>. Convert through <code>unsigned char</code> before calling it.`,
            md`## Separate predicates make text validation reliable

~~~cpp
bool valid = id.size() == 9;
valid = valid && id[0] == 'B' && id[1] == 'T';
for (std::size_t i = 2; valid && i < id.size(); ++i) {
    valid = std::isdigit(static_cast<unsigned char>(id[i]));
}
~~~`,
            md`## C-style strings end at a null character and need manual bounds care

A C-style string is a character array ending at the first null character <code>'\0'</code>.

Functions from <code>&lt;cstring&gt;</code> cannot discover the capacity of a destination buffer. Prefer <code>std::string</code>; use C strings only when an interface requires them.`,
            md`## Safe text processing prefers ownership, parsing rules, and bounds

- <code>std::string</code> is the default owned text type.
- Check search results and index bounds.
- Use <code>getline</code> for complete lines.
- Character classification requires a safe unsigned value.
- A buffer overflow is undefined behavior, not a recoverable string operation.`
        ]
    },
    {
        id: 12,
        title: 'Repair programs with evidence and tests',
        slides: [
            md`# Lecture 12: Repair programs with evidence and tests
## Turn feedback into a repair strategy`,
            md`## Classifying the defect narrows the repair

- Compile-time: the source violates a language rule.
- Link-time: a required definition is missing or duplicated.
- Run-time: execution fails or reports an exception.
- Logic: the program runs but produces the wrong result.

Classification determines the next useful observation.`,
            md`## The first compiler or test diagnostic narrows the search

For a compiler message:

1. Open the first referenced source line.
2. Read the complete message, not only “error.”
3. Inspect the line immediately before it too.
4. Make one small change.
5. Recompile before changing anything else.`,
            md`## A state trace shows where behavior first diverges

~~~cpp
int total = 0;
for (int i = 0; i < 3; ++i) {
    total += values[i];
}
~~~

Record <code>i</code>, <code>values[i]</code>, and <code>total</code> after every iteration.`,
            md`## Boundary cases expose empty, off-by-one, and precision defects

For an average function, test:

| Case | Why |
|---|---|
| empty input | invalid precondition |
| one value | smallest valid size |
| two unequal integers | reveals integer division |
| <code>assert(condition)</code> | stops a debug run at the first false expectation |
| maximum expected count | stresses the bound |`,
            md`## A safe average checks emptiness and preserves precision

~~~cpp
bool average(const std::vector<int>& values, double& result) {
    if (values.empty()) return false;
    long long sum = 0;
    for (int value : values) sum += value;
    result = static_cast<double>(sum) / values.size();
    return true;
}
~~~`,
            md`## Assessment evidence becomes a repair plan

For each lost mark, write:

- the concept reference;
- the incorrect assumption;
- one smallest counterexample;
- one new practice problem;
- the date you will retry it without notes.

Revisit prerequisites in the dependency graph instead of memorizing one answer.`,
            md`## Repair by classifying, tracing, testing, and documenting

- Classify before editing.
- Trace changing state explicitly.
- Test the smallest valid and invalid boundaries.
- Repair one assumption at a time.
- Assessment feedback is a map for deliberate practice.`
        ]
    },
    {
        id: 13,
        title: 'Group state and validate addresses',
        slides: [
            md`# Lecture 13: Group state and validate addresses
## Group related state and inspect addresses safely`,
            md`## A struct keeps the fields of one record coherent

~~~cpp
struct Reading {
    int sensorId;
    double value;
    bool valid;
};

Reading sample{7, 31.5, true};
~~~

Member names keep related values coherent.`,
            md`## An array of records keeps repeated domain objects together

~~~cpp
std::array<Reading, 3> samples{{
    {1, 30.1, true}, {2, 29.8, true}, {3, 0.0, false}
}};

for (const Reading& reading : samples) {
    if (reading.valid) std::cout << reading.value << '\n';
}
~~~`,
            md`## A pointer stores where an object lives

~~~cpp
int score = 95;
int* scorePointer = &score;
~~~

The pointer is a separate object. <code>&score</code> obtains the address of <code>score</code>.`,
            md`## Dereference only a pointer proved valid

~~~cpp
if (scorePointer != nullptr) {
    *scorePointer += 5;
}
~~~

Dereferencing accesses the pointed-to object. <code>nullptr</code> explicitly means “no object.”`,
            md`## Dot selects through an object; arrow selects through a pointer

~~~cpp
Reading reading{7, 31.5, true};
Reading* pointer = &reading;

reading.value = 32.0;
pointer->value = 32.5;  // same as (*pointer).value
~~~`,
            md`## Layout, alignment, and pointer arithmetic affect safety

Compilers may insert padding so members satisfy alignment constraints. Use <code>sizeof</code> and <code>offsetof</code> to inspect a specific implementation.

Pointer arithmetic is valid only within one array object (or one-past its end). Prefer indexed or range-based traversal.`,
            md`## Safe memory reasoning groups state and validates addresses

- A struct creates one coherent record type.
- An array of records stores repeated entities.
- A pointer stores an address; dereferencing requires validity.
- Check for <code>nullptr</code> before access.
- Layout is implementation-specific and pointer arithmetic has strict bounds.`
        ]
    },
    {
        id: 14,
        title: 'Make dynamic ownership explicit',
        slides: [
            md`# Lecture 14: Make dynamic ownership explicit
## Make ownership and lifetime explicit`,
            md`## Automatic storage follows scope; dynamic storage follows ownership

Automatic local objects are destroyed when their scope ends. Dynamic storage can outlive the creating scope, so ownership must state who releases it.`,
            md`## new and delete must match the allocated type and ownership

~~~cpp
int* value = new int{42};
std::cout << *value << '\n';
delete value;
value = nullptr;
~~~

Use <code>delete[]</code> only for storage obtained with <code>new[]</code>.`,
            md`## unique_ptr makes exclusive ownership and release explicit

~~~cpp
auto value = std::make_unique<int>(42);
std::cout << *value << '\n';
~~~

A smart pointer releases its owned resource automatically. It prevents ownership leaks, but unrelated non-owning pointers can still dangle.`,
            md`## Leaks, dangling pointers, double deletion, and bad allocation are different defects

- Memory leak: owned storage becomes unreachable without release.
- Dangling pointer: an address remains after the object has died.
- Double deletion: the same allocation is released twice.
- Allocation failure: <code>new</code> normally throws <code>std::bad_alloc</code>.`,
            md`## A linked list represents a sequence through separately stored nodes

~~~cpp
#include <memory>

struct Node {
    int value;
    std::unique_ptr<Node> next;
};

auto head = std::make_unique<Node>();
head->value = 42;
head->next = std::make_unique<Node>();
head->next->value = 57;
~~~`,
            md`## Traversal stops at nullptr after visiting each reachable node

~~~cpp
for (Node* current = head.get(); current != nullptr;
     current = current->next.get()) {
    std::cout << current->value << ' ';
}
~~~

The invariant states that every node before <code>current</code> has been processed.`,
            md`## C allocation exposes bytes, so its ownership contract must be explicit

<code>malloc</code>, <code>calloc</code>, and <code>realloc</code> manage untyped bytes and must be paired with <code>free</code>.

They do not construct or destroy C++ objects. Use them only when a C interface requires them.`,
            md`## Make ownership explicit before allocating or linking

- Dynamic storage requires an ownership rule.
- Prefer <code>unique_ptr</code> for exclusive ownership and automatic release.
- Smart ownership prevents leaks, not every possible dangling observer.
- Linked lists trade contiguous access for explicit links.`
        ]
    },
    {
        id: 15,
        title: 'Choose structures from operations and cost',
        slides: [
            md`# Lecture 15: Choose structures from operations and cost
## Choose operations before representation`,
            md`## An abstract data type specifies operations before representation

A stack promises <code>push</code>, <code>pop</code>, and <code>top</code>. A queue promises <code>enqueue</code>, <code>dequeue</code>, and <code>front</code>.

The contract does not require a class or one specific representation.`,
            md`## Linear search is the trustworthy baseline when only traversal is known

~~~cpp
std::vector<int> values{8, 3, 5, 3};
int target = 5;
std::size_t found = values.size();
for (std::size_t i = 0; i < values.size() && found == values.size(); ++i)
    if (values[i] == target) found = i;
~~~

Worst case: inspect every element.`,
            md`## Bubble sort trades simplicity for quadratic time

~~~cpp
for (std::size_t end = values.size(); end > 1; --end) {
    for (std::size_t i = 1; i < end; ++i) {
        if (values[i] < values[i - 1]) {
            int temporary = values[i];
            values[i] = values[i - 1];
            values[i - 1] = temporary;
        }
    }
}
~~~`,
            md`## A stack returns the most recently pushed item first

With an array representation, keep one integer <code>top</code>:

- push: check capacity, then advance and store;
- pop: check emptiness, read, then retreat;
- top: inspect without removing.

An undo history and function calls are stack applications.`,
            md`## A queue returns the earliest enqueued item first

A circular array keeps <code>front</code>, <code>rear</code>, and <code>count</code>. A linked queue keeps pointers to the first and last nodes.

Print jobs and breadth-first exploration are queue applications.`,
            md`## Compare structures by operation costs, not names

| Requirement | Useful choice |
|---|---|
| scan unsorted readings | array + linear search |
| undo most recent action | stack |
| serve arrival order | queue |
| repeatedly exchange adjacent inversions | array + bubble sort |`,
            md`## Match operations, invariants, and cost before choosing a structure

- An ADT is defined by valid operations and behavior.
- Algorithms are applications of the representation's operations.
- Linear search needs no ordering.
- Stack means LIFO; queue means FIFO.
- Bubble sort is simple but performs quadratic work.`
        ]
    },
    {
        id: 16,
        title: 'Prove recursive progress to a base case',
        slides: [
            md`# Lecture 16: Prove recursive progress to a base case
## Prove a smaller call reaches a base case`,
            md`## Each recursive call adds a frame and must eventually return

For <code>factorial(3)</code>:

1. <code>factorial(3)</code> waits for <code>factorial(2)</code>.
2. <code>factorial(2)</code> waits for <code>factorial(1)</code>.
3. The base case returns 1.
4. Waiting frames finish in reverse order.`,
            md`## Every recursive call moves toward its base case

~~~cpp
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
~~~

The argument decreases, so a non-negative input reaches the base case.`,
            md`## Recursive reversal rewires one node and delegates the suffix

~~~cpp
Node* reverse(Node* head) {
    if (head == nullptr || head->next == nullptr) return head;
    Node* newHead = reverse(head->next);
    head->next->next = head;
    head->next = nullptr;
    return newHead;
}
~~~`,
            md`## Backtracking explores, recurses, and undoes each choice

Choose one value for the current position, recursively arrange the remainder, then undo the choice.

The data structure is an array; recursion supplies the search order.`,
            md`## Memoization avoids repeated subproblems in LCS

For two strings, an LCS recurrence compares their final characters and reduces one or both prefixes.

The direct recursive version repeats subproblems. Memoization stores results so identical states are solved once.`,
            md`## Recursion trades stack space and repeated work for clarity

- Recursive list reversal: O(n) time, O(n) call-stack space.
- Iterative reversal: O(n) time, O(1) auxiliary space.
- Permutation generation: at least proportional to the number of produced permutations.

Complexity describes growth, not stopwatch seconds.`,
            md`## Prove termination, trace frames, and measure recursive cost

- A recursive call must receive a smaller problem.
- A base case handles the smallest problem directly.
- Stack frames consume space.
- Recursion can expose natural structure, while iteration may use less memory.`
        ]
    },
    {
        id: 17,
        title: 'Preserve invariants to search and sort efficiently',
        slides: [
            md`# Lecture 17: Preserve invariants to search and sort efficiently
## Preserve an invariant to obtain efficient operations`,
            md`## Binary search halves a sorted range without overflow

~~~cpp
while (left <= right) {
    int middle = left + (right - left) / 2;
    if (values[middle] == target) return middle;
    if (values[middle] < target) left = middle + 1;
    else right = middle - 1;
}
~~~

Each comparison discards one impossible half.`,
            md`## A BST stores ordering in its left and right subtrees

For every node:

- keys in the left subtree are smaller;
- keys in the right subtree are larger;
- both subtrees obey the same invariant.

Choose and document one policy for duplicate keys.`,
            md`## BST insertion preserves order by following comparisons

~~~cpp
struct Node { int key; Node* left; Node* right; };

Node* insert(Node* root, int key) {
    if (root == nullptr) return new Node{key, nullptr, nullptr};
    if (key < root->key) root->left = insert(root->left, key);
    else if (key > root->key) root->right = insert(root->right, key);
    return root;
}
~~~`,
            md`## A heap keeps the highest-priority element at the root

A max heap is a complete binary tree where every parent is at least its children.

In a zero-based array, children of index <code>i</code> are <code>2*i+1</code> and <code>2*i+2</code>.`,
            md`## heapify restores parent-child order after one local violation

~~~cpp
void heapify(std::vector<int>& a, int size, int root) {
    int largest = root;
    int left = 2 * root + 1, right = left + 1;
    if (left < size && a[left] > a[largest]) largest = left;
    if (right < size && a[right] > a[largest]) largest = right;
    if (largest != root) { std::swap(a[root], a[largest]); heapify(a, size, largest); }
}
~~~`,
            md`## Merge sort recursively sorts halves and combines them stably

1. Divide the range into two halves.
2. Recursively sort each half.
3. Merge two sorted sequences into temporary storage.

Merge sort is **stable**: records with equal keys keep their original relative order. It is O(n log n), and its array implementation uses additional storage. Heap sort is in-place but not stable.`,
            md`## State the invariant before choosing a search or sort

- Binary search exploits sorted-array order.
- A BST encodes ordering in links.
- A heap encodes priority in a complete tree.
- heapify repairs a local invariant.
- Merge sort applies recursive decomposition to sequences.`
        ]
    },
    {
        id: 18,
        title: 'Protect object invariants across their lifetime',
        slides: [
            md`# Lecture 18: Protect object invariants across their lifetime
## Protect invariants and make object lifetime predictable`,
            md`## A class protects state by combining data, behavior, and access control

~~~cpp
class Counter {
private:
    int value = 0;
public:
    void increment() { ++value; }
    int current() const { return value; }
};
~~~

The invariant is: <code>value &gt;= 0</code>. The public interface preserves it because it can only increment.`,
            md`## Constructors establish valid initial state before use

~~~cpp
class Rectangle {
    double length;
    double width;
public:
    Rectangle(double l, double w) : length(1.0), width(1.0) {
        if (l > 0.0) length = l;
        if (w > 0.0) width = w;
    }
    double area() const { return length * width; }
};
~~~

Overloaded constructors may offer several distinct valid initialization paths.`,
            md`## Copy construction creates; assignment replaces an existing value

~~~cpp
Rectangle first(4.0, 3.0);
Rectangle copied = first;  // copy construction: new object
Rectangle assigned(1.0, 1.0);
assigned = first;          // copy assignment: existing object
~~~

Value members such as numbers and strings usually support the Rule of Zero.`,
            md`## RAII binds resource release to object lifetime

A destructor runs when an object's lifetime ends. RAII stores a resource in an owning object whose destructor releases it.

Prefer <code>std::string</code>, <code>std::vector</code>, and smart pointers over handwritten ownership and deep-copy code.`,
            md`## Overloaded operators preserve the meaning users expect from values

Useful value-type operations include:

- <code>operator+</code> returning a new value;
- <code>operator==</code> comparing observable state;
- <code>operator&lt;&lt;</code> inserting into a stream;
- copy assignment safely replacing an existing value.

Do not change an operator's expected meaning.`,
            md`## Value types depend on invariants, ownership, and predictable lifetime

- A class should protect a meaningful invariant.
- Constructors initialize; assignment replaces an existing value.
- Destruction ends lifetime and releases owned resources.
- Prefer Rule-of-Zero member types.
- Overloads must keep interfaces unsurprising.`
        ]
    },
    {
        id: 19,
        title: 'Use inheritance only when substitution is safe',
        slides: [
            md`# Lecture 19: Use inheritance only when substitution is safe
## Move from one value type to a justified is-a relationship`,
            md`## Friend access is a narrow exception, not an interface

~~~cpp
class Complex {
    double real, imaginary;
public:
    Complex(double r, double i) : real(r), imaginary(i) {}
    friend std::ostream& operator<<(std::ostream&, const Complex&);
};
~~~

A friend is a non-member granted narrow access. Friendship is not inheritance or a security boundary.`,
            md`## Public inheritance promises substitutability

If <code>ElectricCar</code> publicly inherits <code>Vehicle</code>, every operation promised by <code>Vehicle</code> must remain meaningful for <code>ElectricCar</code>.

This is an **is-a** relationship, not merely code reuse.`,
            md`## A class hierarchy makes shared promises and specialization explicit

~~~text
Vehicle
├── Bicycle
└── Car
    └── ElectricCar
~~~

The base owns common behavior; derived classes add or refine specialized behavior.`,
            md`## A small base interface leaves derived types to specialize

~~~cpp
class Vehicle {
public:
    int wheels() const { return 4; }
};

class ElectricCar : public Vehicle {
public:
    int batteryPercent() const { return 80; }
};
~~~

A <code>protected</code> member would be hidden from ordinary callers but accessible inside derived members. Prefer a small function over exposing raw state. Passing a derived object to a base reference tests substitutability.`,
            md`## Base construction completes before derived construction

1. Base members are initialized.
2. The base constructor runs.
3. Derived members are initialized.
4. The derived constructor runs.

Destruction occurs in the reverse order.`,
            md`## Composition models has-a without forcing substitutability

A <code>Car</code> has an <code>Engine</code>; it is not an engine.

Composition usually exposes fewer dependencies and is easier to change. Inheritance is appropriate only when substitutability is defensible.`,
            md`## Use inheritance for is-a contracts and composition for owned parts

- Friend access is narrow and explicit.
- Public inheritance models is-a and substitutability.
- A hierarchy shares a justified base abstraction.
- Base construction precedes derived construction.
- Prefer composition for has-a relationships.`
        ]
    },
    {
        id: 20,
        title: 'Select runtime behavior through safe interfaces',
        slides: [
            md`# Lecture 20: Select runtime behavior through safe interfaces
## Select behavior from the runtime object safely`,
            md`## Public and private inheritance make different interface promises

- Public inheritance preserves the base interface and models is-a.
- Private inheritance is an implementation technique and does not promise substitutability.

Composition is usually clearer than private inheritance.`,
            md`## Virtual inheritance shares one common base in a diamond

Multiple inheritance gives one derived class more than one direct base.

In a diamond, virtual inheritance can share one common base subobject. Use these mechanisms only when the domain model genuinely requires them; they are not the starting point for polymorphism.`,
            md`## A virtual function selects the override from the runtime type

~~~cpp
class Shape {
public:
    virtual double area() const = 0;
    virtual ~Shape() = default;
};

class Square : public Shape {
    double side;
public:
    explicit Square(double s) : side(s) {}
    double area() const override { return side * side; }
};
~~~`,
            md`## A virtual destructor makes base-pointer deletion safe

~~~cpp
std::unique_ptr<Shape> shape = std::make_unique<Square>(4.0);
double result = shape->area();
~~~

The virtual destructor makes deletion through the base interface safe. Lecture 21 will place differently typed objects in one owning container.`,
            md`## A factory centralizes construction behind the interface

~~~cpp
std::unique_ptr<Shape> makeSquare(double side) {
    return std::make_unique<Square>(side);
}
~~~

A factory returns an abstraction while choosing a concrete type in one place.`,
            md`## Every derived type must pass the base-level tests

For every derived type, test:

- calls made through a base reference;
- cleanup through base ownership;
- invalid constructor inputs;
- behavior added by a new derived type without changing existing callers.`,
            md`## Interfaces, safe ownership, and substitutability earn polymorphism

- Public inheritance promises substitutability.
- Dynamic dispatch selects an override at runtime.
- Polymorphic bases need virtual destructors.
- Own derived objects with smart pointers.
- Factories separate construction choice from use.`
        ]
    },
    {
        id: 21,
        title: 'Separate polymorphism, ownership, and graph links',
        slides: [
            md`# Lecture 21: Separate polymorphism, ownership, and graph links
## Store varied behavior behind one safe interface`,
            md`## A heterogeneous container owns varied objects through one interface

~~~cpp
std::vector<std::unique_ptr<Shape>> shapes;
shapes.push_back(std::make_unique<Circle>(2.0));
shapes.push_back(std::make_unique<Square>(3.0));
~~~

Concrete types differ; ownership and the operation contract are uniform.`,
            md`## Algorithms stay reusable through promised interface operations

~~~cpp
double totalArea(const std::vector<std::unique_ptr<Shape>>& shapes) {
    double total = 0.0;
    for (const auto& shape : shapes) total += shape->area();
    return total;
}
~~~

Adding a new shape does not change this traversal.`,
            md`## An object graph separates entities from their relationships

~~~text
[Indore] --rail--> [Ujjain]
    |
   road
    v
[Dewas]
~~~

Vertices model entities; edges model relationships. The graph is a structure, not an external visualization service.`,
            md`## Graph storage follows the operations the application needs

- Adjacency list: store outgoing neighbors for each vertex.
- Edge list: store relationships as records.
- Matrix: direct pair lookup but quadratic storage.

Polymorphism is useful only when vertex or edge behavior genuinely varies.`,
            md`## Ownership stays independent from graph connectivity

Let the graph own vertices and edges with smart pointers. Store non-owning IDs or indices for relationships when possible.

Avoid cycles of shared ownership; graph connectivity is not the same as memory ownership.`,
            md`## Add one actor without changing the controller

Add a <code>WeightedEdge</code> with a cost and a <code>ScheduledEdge</code> with departure time.

Write one traversal that prints every edge through the base interface, then identify which operations do not require polymorphism.`,
            md`## Polymorphism, ownership, and graph links stay independently testable

- Heterogeneous containers combine a base contract with safe ownership.
- Algorithms depend on operations, not concrete type names.
- Object graphs separate entities from relationships.
- Pick adjacency representation from required operations.
- Keep graph links separate from ownership links.`
        ]
    },
    {
        id: 22,
        title: 'Compose domain objects with explicit policies',
        slides: [
            md`# Lecture 22: Compose domain objects with explicit policies
## Compose domain objects, collections, and algorithms`,
            md`## One component owns one reason to change

- <code>Flight</code>: route, capacity, and availability invariant.
- <code>Passenger</code>: passenger identity and contact value.
- <code>Booking</code>: association between one passenger and one flight.
- <code>BookingSystem</code>: collection operations and policies.

High cohesion keeps each responsibility local.`,
            md`## A domain model names the objects and rules that matter

~~~cpp
struct Flight { std::string code; std::string from; std::string to; int seats; };
struct Passenger { std::string rollNumber; std::string name; };
struct Booking { std::size_t flightIndex; std::size_t passengerIndex; };
~~~

Indices express associations without ambiguous ownership.`,
            md`## A predicate turns a domain question into reusable selection

~~~cpp
auto matchesRoute = [requestedFrom, requestedTo](const Flight& flight) {
    return flight.from == requestedFrom && flight.to == requestedTo;
};

auto result = std::find_if(flights.begin(), flights.end(), matchesRoute);
~~~

The lambda is a predicate: a callable returning true or false. Its capture list copies the two requested city values into the callable.`,
            md`## A comparator makes ordering policy explicit and testable

~~~cpp
std::sort(flights.begin(), flights.end(),
    [](const Flight& a, const Flight& b) {
        return a.code < b.code;
    });
~~~

The comparator defines one consistent ordering relation.`,
            md`## Route planning applies graph algorithms to domain constraints

Airports are vertices and direct flights are edges. Route optimization selects a path according to hops, time, distance, or cost.

State the objective before choosing an algorithm.`,
            md`## Patterns separate replaceable policy from stable mechanism

- Factory: choose which concrete service object to create.
- Strategy: supply a pricing or ranking policy through an interface.

Use a design pattern only after the recurring responsibility problem is visible.`,
            md`## Compose domain objects with explicit predicates, comparators, and policies

- Domain classes represent entities, values, and associations.
- Collections expose search and sorting applications.
- Predicates select; comparators order.
- Routing applies graph structure to a stated objective.
- Patterns name reusable responsibility arrangements.`
        ]
    },
    {
        id: 23,
        title: 'Integrate structures, algorithms, and evidence',
        slides: [
            md`# Lecture 23: Integrate structures, algorithms, and evidence
## Select structures and algorithms for integrated problems`,
            md`## The required operation determines the candidate structures

| Application | Structure | Algorithmic idea |
|---|---|---|
| process decimal digits stably | buckets | radix passes |
| transform every tree node | binary tree | recursive traversal |
| multiply matrix blocks | matrices | recursive decomposition |
| vary legal behavior by piece | hierarchy | dynamic dispatch |`,
            md`## Block recursion reduces matrix multiplication to smaller compatible products

Split each matrix into four blocks, recursively multiply compatible block pairs, and add partial results.

The base case multiplies a sufficiently small block directly. A practical implementation must also handle dimensions that are not powers of two.`,
            md`## Stable buckets let radix sort process one digit at a time

For non-negative decimal integers:

1. distribute by the current digit;
2. collect buckets without changing equal-digit order;
3. move to the next digit.

The queue-like bucket structure supplies stable collection order.`,
            md`## Tree inversion swaps each node’s children recursively

~~~cpp
Node* invert(Node* root) {
    if (root == nullptr) return nullptr;
    Node* left = invert(root->left);
    Node* right = invert(root->right);
    root->left = right;
    root->right = left;
    return root;
}
~~~`,
            md`## A shared Piece interface lets each chess type choose its move

A base <code>Piece</code> promises legal-move generation. <code>Rook</code>, <code>Bishop</code>, and <code>Knight</code> implement different movement rules.

The board owns pieces; the caller asks through the common interface.`,
            md`## A capstone needs state, invariants, ownership, stopping rules, and adversarial tests

Before implementation, identify:

- state and invariant;
- ownership and lifetime;
- required operations;
- base case or stopping condition;
- normal, boundary, and invalid tests;
- expected time and space growth.`,
            md`## A capstone is justified by its representation, algorithm, invariant, and evidence

- Represent state with a structure whose operations match the problem.
- Apply algorithms through those operations.
- Preserve bounds, invariants, ownership, and progress.
- Use the dependency graph to revisit the earliest uncertain prerequisite.`
        ]
    }
];

const missingLectureExtras = lectures.filter((lecture) => !lectureExtras[lecture.id]);
if (missingLectureExtras.length > 0) {
    throw new Error(`Missing practical example and practice set for lecture IDs: ${missingLectureExtras.map((lecture) => lecture.id).join(', ')}`);
}

const missingLectureMemes = lectures.filter((lecture) => !lectureMemes[lecture.id] || lectureMemes[lecture.id].length < 3);
if (missingLectureMemes.length > 0 || lectureMemeCount !== lectures.length * 3) {
    throw new Error(`Expected exactly three lecture memes per lecture; missing or incomplete IDs: ${missingLectureMemes.map((lecture) => lecture.id).join(', ') || 'count mismatch'}`);
}

for (const lecture of lectures) {
    for (const meme of lectureMemes[lecture.id]) {
        if (meme.afterSlide < 1 || meme.afterSlide >= lecture.slides.length) {
            throw new Error(`Invalid meme insertion point for L${lecture.id}: ${meme.slug}`);
        }
        const assetPath = path.join(root, 'assets', 'lecture-memes', `l${String(lecture.id).padStart(2, '0')}`, `${meme.slug}.png`);
        if (!fs.existsSync(assetPath)) {
            throw new Error(`Missing meme asset for L${lecture.id}: ${assetPath}`);
        }
    }
}

// These generated briefs make the transferable problem-solving routine visible
// without changing authored slide numbers or the eight-slide live-session limit.
const studioBriefs = {
    1: {
        thread: 'Demo theatre → first robot command',
        problem: 'Make a machine carry out one observable action.',
        model: 'Input describes a command; a finite process produces output.',
        represent: 'Names stand for the few values the action needs.',
        solve: 'Write an input → process → output algorithm, then compile it.',
        verify: 'Predict the exact output; compare it with one run and one deliberate error.',
        improve: 'Rename vague steps and remove every instruction a partner cannot follow.',
        lens: 'simulation and precise sequencing',
        compare: 'a fixed command list versus a rule-based cleaner (preview only)'
    },
    2: {
        thread: 'Encode the cleaning world',
        problem: 'Store position, dirt, battery, and sensor readings without confusing their meanings.',
        model: 'A robot has discrete state plus approximate physical measurements.',
        represent: 'int for counts/coordinates, bool for facts, double for measurements, const for limits.',
        solve: 'Choose each type from meaning, range, precision, and permitted operations.',
        verify: 'Try zero, the largest expected value, a fractional value, and a lossy conversion.',
        improve: 'Replace magic values with named constants and document units.',
        lens: 'representation before algorithm',
        compare: 'one overloaded numeric type versus several meaning-specific types'
    },
    3: {
        thread: 'Track robot state',
        problem: 'Update a robot pose and score while keeping temporary calculations local.',
        model: 'A transition maps old state plus one action to new state.',
        represent: 'Scoped names hold row, column, direction, score, and intermediate expressions.',
        solve: 'Evaluate one transition in dependency order.',
        verify: 'Build a before/after state table and evaluate expressions by hand first.',
        improve: 'Reduce mutable scope and make grouping explicit with names or parentheses.',
        lens: 'state-transition simulation',
        compare: 'many unrelated variables versus one coherent state model introduced later'
    },
    4: {
        thread: 'Make movement safe',
        problem: 'Accept a move only when it stays in bounds and avoids an obstacle.',
        model: 'Each attempted move belongs to exactly one outcome class.',
        represent: 'A decision table maps Boolean conditions to MOVE, BLOCKED, or INVALID.',
        solve: 'Translate mutually exclusive rows into a carefully ordered branch chain.',
        verify: 'Test every table row, exact boundary, just-outside value, and default case.',
        improve: 'Remove overlapping conditions and guard unsafe calculations by short-circuiting.',
        lens: 'exhaustive case analysis',
        compare: 'nested if statements versus a flat decision table and branch chain'
    },
    5: {
        thread: 'Clean an unknown-length corridor',
        problem: 'Continue cleaning until the wall, battery limit, or input sentinel is reached.',
        model: 'Repeated transitions change measurable state toward a stopping condition.',
        represent: 'Position, battery, dirt count, and stop reason are loop state.',
        solve: 'Use while for an event-controlled run and do-while for validated input.',
        verify: 'Trace zero iterations, one iteration, normal progress, and every stop reason.',
        improve: 'Make progress and termination visible in the condition and update.',
        lens: 'iteration and simulation',
        compare: 'event-controlled repetition versus a guessed fixed number of steps'
    },
    6: {
        thread: 'Sweep and render a grid',
        problem: 'Visit each cell of a small room and print an ASCII frame.',
        model: 'A room is rows × columns; the current pair identifies one cell.',
        represent: 'Nested counters represent coordinates; characters represent visible cell states.',
        solve: 'Enumerate every coordinate with nested for loops.',
        verify: 'State the processed-prefix invariant and count expected visits before running.',
        improve: 'Separate the sweep order from rendering and diagnose off-by-one bounds.',
        lens: 'systematic enumeration',
        compare: 'row-major versus column-major traversal'
    },
    7: {
        thread: 'Give robot actions contracts',
        problem: 'Stop one growing main function from mixing movement, sensing, and display.',
        model: 'The controller coordinates small operations with explicit responsibilities.',
        represent: 'Function parameters are inputs; return values report results.',
        solve: 'Decompose by one explainable task and compose calls into a controller.',
        verify: 'Test each contract independently before integrating the functions.',
        improve: 'Remove duplication and rename a function whose contract needs “and”.',
        lens: 'procedural decomposition',
        compare: 'one monolithic procedure versus several testable functions'
    },
    8: {
        thread: 'Build a testable controller',
        problem: 'Let functions observe or intentionally change shared robot state.',
        model: 'Calls form a stack of unfinished responsibilities.',
        represent: 'Values copy small inputs; references alias intentional shared state; const& observes.',
        solve: 'Choose a parameter mode from the contract, not from syntax preference.',
        verify: 'Trace caller and callee state, including a recursive countdown preview.',
        improve: 'Return information instead of mutating when either design is equally clear.',
        lens: 'decomposition with controlled aliasing',
        compare: 'returning a new state versus updating through a reference'
    },
    9: {
        thread: 'Prototype a snake body',
        problem: 'Store ordered body segments and detect whether the head touches one.',
        model: 'A snake is a bounded sequence whose position order matters.',
        represent: 'A fixed array stores segments; an index selects one position.',
        solve: 'Traverse all valid indices and use a linear scan as a trustworthy baseline.',
        verify: 'Test the first segment, last segment, no match, and the smallest valid body.',
        improve: 'Use the actual size as the bound and state what the processed prefix means.',
        lens: 'brute-force linear search',
        compare: 'indexed traversal versus whole-sequence range traversal'
    },
    10: {
        thread: 'Grow the grid world',
        problem: 'Store rooms and paths whose dimensions are known only at runtime.',
        model: 'A grid is a sequence of rows; each row is a sequence of cells.',
        represent: 'A matrix models fixed geometry; vectors model runtime-sized or ragged data.',
        solve: 'Select fixed or dynamic storage, then traverse using each real bound.',
        verify: 'Test 1×1, one row, unequal row lengths, and checked invalid access.',
        improve: 'Pass the grid to a renderer instead of mixing storage with output.',
        lens: 'data-driven simulation',
        compare: 'fixed 2D array versus nested vectors'
    },
    11: {
        thread: 'Record and replay ASCII animation',
        problem: 'Read commands and render complete, validated text frames.',
        model: 'A replay is a sequence of command lines transformed into visible states.',
        represent: 'std::string owns text; positions and character classes describe its structure.',
        solve: 'Parse one rule at a time, then map model state to an ASCII frame.',
        verify: 'Test empty text, spaces, missing delimiters, bad characters, and a valid replay.',
        improve: 'Keep parsing, simulation, and rendering as separate functions.',
        lens: 'string processing and model–view separation',
        compare: 'rebuilding a frame versus incrementally editing the terminal'
    },
    12: {
        thread: 'Repair the simulator from evidence',
        problem: 'Find why a program compiles or runs yet violates its promised behavior.',
        model: 'A defect is the earliest point where observed state diverges from expected state.',
        represent: 'A minimal failing input and trace table capture reproducible evidence.',
        solve: 'Classify, minimize, trace, change one assumption, and retest.',
        verify: 'Run the failing case plus the boundary and regression cases after repair.',
        improve: 'Turn every lost mark or discovered defect into a reusable test.',
        lens: 'systematic debugging',
        compare: 'evidence-guided repair versus editing several guesses at once'
    },
    13: {
        thread: 'Model cells, components, and entities',
        problem: 'Keep each sampled cell and its related properties coherent.',
        model: 'One entity has identity, value, validity, and possibly a location.',
        represent: 'A struct groups fields; a pointer can refer to an existing entity.',
        solve: 'Traverse records and follow only valid, non-null relationships.',
        verify: 'Check member invariants, null pointers, and first/last record access.',
        improve: 'Prefer IDs or references when ownership does not need to move.',
        lens: 'record-based modeling',
        compare: 'parallel arrays versus an array of coherent records'
    },
    14: {
        thread: 'Rebuild snake as a linked body',
        problem: 'Grow and shrink an ordered body without a fixed maximum size.',
        model: 'Each segment owns the next segment; the head owns the complete chain.',
        represent: 'Linked nodes and unique_ptr make links and ownership explicit.',
        solve: 'Build and traverse an exclusively owned chain; ownership transfer is deferred.',
        verify: 'Test empty, one-node, and multi-node bodies; trace object lifetime.',
        improve: 'Compare operation cost and safety against the already-known vector representation.',
        lens: 'linked structure and automatic resource release',
        compare: 'contiguous body storage versus linked nodes'
    },
    15: {
        thread: 'Queue the cells that still need cleaning',
        problem: 'Remember pending dirty cells and service them in a deliberate order.',
        model: 'A stored target is waiting, active, or already cleaned.',
        represent: 'A vector plus a front index acts as a FIFO queue; an array can act as a stack.',
        solve: 'Scan once to collect dirty indices, then process them in stored order.',
        verify: 'Test no dirt, one target, repeated targets, and full capacity.',
        improve: 'Compare FIFO, LIFO, and direct linear search from the operations each needs.',
        lens: 'linear structures, search, and elementary sorting',
        compare: 'FIFO service order versus LIFO service order'
    },
    16: {
        thread: 'Explore mazes and repeated subproblems',
        problem: 'Search choices, undo dead ends, and avoid recomputing identical states.',
        model: 'Each call owns one smaller state and returns an answer to its caller.',
        represent: 'The call stack records choices; a memo table stores solved states.',
        solve: 'Use recursion for structure, backtracking for reversible choices, and memoization for repeated subproblems.',
        verify: 'Prove a decreasing measure reaches a base case and trace each undo.',
        improve: 'Replace repeated recursion with memoization or an iterative frontier when useful.',
        lens: 'recursion, backtracking, and dynamic programming',
        compare: 'direct recursion versus memoized or iterative solutions'
    },
    17: {
        thread: 'Rank routes and accelerate search',
        problem: 'Find ordered data or repeatedly select the most promising route candidate.',
        model: 'An invariant rules out impossible regions or keeps the best priority at the front.',
        represent: 'Sorted array, BST, or array-backed heap supports different operations.',
        solve: 'Use binary search, heap repair, or divide–solve–merge as the operation demands.',
        verify: 'Check the ordering/heap invariant before and after every update.',
        improve: 'Compare asymptotic growth, stability, storage, and worst-case shape.',
        lens: 'divide and conquer, ordered search, and priority-based greedy choice',
        compare: 'linear baseline versus binary search; bubble sort versus merge sort'
    },
    18: {
        thread: 'Turn the robot into a reliable object',
        problem: 'Prevent any caller from creating or leaving an invalid robot state.',
        model: 'A robot owns state and exposes only invariant-preserving operations.',
        represent: 'A class, constructor, private members, and Rule-of-Zero value members.',
        solve: 'Move responsibility beside the state it governs.',
        verify: 'Test construction, copied values, assignment, destruction, and invalid inputs.',
        improve: 'Prefer composition and library-owned resources over handwritten ownership.',
        lens: 'object-oriented modeling and RAII',
        compare: 'public record mutation versus a small invariant-preserving interface'
    },
    19: {
        thread: 'Design a family of cleaning agents',
        problem: 'Share genuine agent behavior without claiming false is-a relationships.',
        model: 'Specialized agents must remain usable wherever the base contract is expected.',
        represent: 'A shallow hierarchy models is-a; member objects model has-a.',
        solve: 'Extract only the common promise and compose independent capabilities.',
        verify: 'Substitute each derived type in base-level scenarios.',
        improve: 'Replace inheritance with composition when substitutability is hard to defend.',
        lens: 'object-oriented abstraction',
        compare: 'inheritance versus composition'
    },
    20: {
        thread: 'Run multiple agent policies',
        problem: 'Let sweep, nearest-dirt, and cautious agents act through one controller.',
        model: 'The environment requests an action without knowing the concrete policy type.',
        represent: 'A virtual interface and one unique_ptr-owned agent.',
        solve: 'Use dynamic dispatch; centralize concrete creation in a factory.',
        verify: 'Call through the base interface and test cleanup plus invalid construction.',
        improve: 'Add a policy without changing the simulation loop.',
        lens: 'runtime polymorphism and simulation',
        compare: 'a growing type switch versus virtual dispatch'
    },
    21: {
        thread: 'Own a mixed actor world',
        problem: 'Store Snake and Cleaner objects together while keeping their relationships safe.',
        model: 'Actors own behavior; graph links describe relationships but do not own actors.',
        represent: 'A vector of unique_ptr-owned actors plus adjacency lists of non-owning indices.',
        solve: 'Traverse actors through one interface and validate every stored relationship.',
        verify: 'Check non-null ownership, in-range links, isolated actors, and cyclic links.',
        improve: 'Keep ownership and graph connectivity independent so either can change safely.',
        lens: 'polymorphic containers and object-graph modeling',
        compare: 'owning smart pointers versus non-owning indices'
    },
    22: {
        thread: 'Rank tasks and model routes',
        problem: 'Separate actors, tasks, relationships, and the policy that ranks candidates.',
        model: 'A task has constraints and a measurable key; a route has vertices and edges.',
        represent: 'Domain records, index associations, predicates, comparators, and a strategy interface.',
        solve: 'Filter with a predicate, rank with a comparator, and isolate policy selection.',
        verify: 'Test empty collections, invalid indices, equal keys, and comparator consistency.',
        improve: 'Swap ranking policies without changing the stored domain objects.',
        lens: 'applied object modeling, collection algorithms, and policy separation',
        compare: 'hard-coded selection versus an explicit replaceable policy'
    },
    23: {
        thread: 'Open capstone and Hall of Fame candidate',
        problem: 'Integrate a game, cleaner, visualization, music generator, or circuit optimizer.',
        model: 'Define state, legal operations, objective, constraints, and audience before coding.',
        represent: 'Choose structures from required operations, ownership, and visualization needs.',
        solve: 'Combine only justified paradigms: recursion, DP, search, greedy, or polymorphism.',
        verify: 'Give a correctness argument, adversarial tests, and a reproducible demonstration.',
        improve: 'Profile, simplify, document trade-offs, and add one meaningful extension.',
        lens: 'algorithm selection and integration',
        compare: 'the first correct baseline versus the final evidence-backed design'
    }
};

const missingStudioBriefs = lectures.filter((lecture) => !studioBriefs[lecture.id]);
if (missingStudioBriefs.length > 0) {
    throw new Error(`Missing algorithmic studio brief for lecture IDs: ${missingStudioBriefs.map((lecture) => lecture.id).join(', ')}`);
}

const lectureOneShowcase = [
    md`## Algorithms become concrete when state changes are visible

| Build | State and structure | Algorithmic idea |
|---|---|---|
| cleaning robot | grid + position + dirt | simulation and sweep |
| graph cleaner | vertices + edges + visited set | BFS/DFS coverage |
| object components | pixels + labels + frontier | flood fill |
| shortest routes | grid/graph + queue/heap + parents | BFS and weighted search |
| Snake, two representations | text/linked body + occupied cells | update loop, traversal, collision search |
| multi-agent cleaner | classes + shared world | policies, allocation, graph coverage |
| music and circuits | event sequences / component graph | randomized generation and optimization |

These are **non-assessed previews**. Today, notice the state change and ask what the program must remember.`,
    md`## One verified model can drive every view

~~~text
Problem → model/state → algorithm → trace
                            ├─ ASCII terminal animation
                            ├─ HTML/SVG interactive view
                            └─ modern C++ graphics window
~~~

- The **model** is the source of truth; a renderer is only a view.
- A recorded trace lets every view replay the same run.
- Extensions can add color, sound, controls, multiple agents, or procedural music without changing a verified core.

By semester end, you should be able to explain not only *what* you built, but *why its representation and algorithm fit the problem*.`
];

// One continuous Grid Snake + Cleaner build. Each slide is inserted only after
// the authored slide that teaches every C++ feature used in its snippet.
const gameEvolutionSlides = {
    1: md`## Game evolution: Output makes the first world visible

| Today's concept | Exact game part enabled |
|---|---|
| observable output | draw one fixed Snake-and-Cleaner frame in the terminal |

~~~cpp
#include <iostream>
int main() {
    std::cout << "+-----+\n";
    std::cout << "|S..*C|\n";
    std::cout << "+-----+\n";
    return 0;
}
~~~

**Predict and verify:** write the seven visible characters in the middle row before running it.

**Next unlock · L02:** replace fixed symbols with named coordinates, score, and dirt state.`,

    2: md`## Game evolution: Named state gives the world memory

| Today's concept | Exact game part enabled |
|---|---|
| typed variables and constants | remember one actor's row, column, score, and board bounds |

~~~cpp
#include <iostream>
int main() {
    const int rows = 5, columns = 9;
    int headRow = 2, headColumn = 3;
    int score = 0;
    bool dirtHere = true;
    std::cout << std::boolalpha  // print bools as true/false
              << rows << ' ' << columns << ' ' << headRow << ' '
              << headColumn << ' ' << score << ' ' << dirtHere << '\n';
}
~~~

**Model check:** row and column are independent whole-number coordinates; dirt is a yes/no fact.

**Next unlock · L03:** compute a new coordinate from the current state and one movement delta.`,

    3: md`## Game evolution: One transition updates the world

| Today's concept | Exact game part enabled |
|---|---|
| expressions and block scope | calculate one candidate move, then commit it |

~~~cpp
#include <iostream>
int main() {
    int row = 2, column = 3;
    int dRow = 0, dColumn = 1;
    {
        int nextRow = row + dRow, nextColumn = column + dColumn;
        row = nextRow; column = nextColumn;
    }
    std::cout << row << ' ' << column << '\n';
}
~~~

**Invariant:** outside the inner block, only the committed position remains visible.

**Next unlock · L04:** accept different directions and reject unsafe moves.`,

    4: md`## Game evolution: A legal move respects the boundary

| Today's concept | Exact game part enabled |
|---|---|
| switch and guarded branching | translate WASD into a direction, reject a wall crossing, and block an obstacle |

~~~cpp
int main() {
    int row=2, column=3, dRow=0, dColumn=0; char command='d';
    switch(command) { case 'w': dRow=-1; break; case 's': dRow=1; break;
        case 'a': dColumn=-1; break; case 'd': dColumn=1; break; default: break; }
    int nextRow=row+dRow, nextColumn=column+dColumn;
    bool inside=nextRow>=0 && nextRow<5 && nextColumn>=0 && nextColumn<9;
    bool blocked=(nextRow==2 && nextColumn==4);
    if (inside && !blocked) { row=nextRow; column=nextColumn; }
}
~~~

**Boundary test:** from column 8, command <code>d</code> must leave the actor at column 8; from (2,3), command <code>d</code> must stop at the obstacle.

**Next unlock · L05:** repeat commands until the game ends.`,

    5: md`## Game evolution: A loop advances the game until it stops

| Today's concept | Exact game part enabled |
|---|---|
| while, do-while, and progress | keep requesting valid moves until quit or collision |

~~~cpp
#include <iostream>
int main() {
    char command;
    do { std::cin >> command; } while (command!='w' && command!='a' &&
                                      command!='s' && command!='d' && command!='q');
    int turns = 0;
    while (command != 'q' && turns < 20) {
        ++turns; std::cin >> command;
    }
}
~~~

**Termination argument:** every accepted non-quit command increases <code>turns</code>; at 20 the loop stops.

**Next unlock · L06:** redraw every row and column after each turn.`,

    6: md`## Game evolution: Rendering turns state into a board

| Today's concept | Exact game part enabled |
|---|---|
| nested for loops | visit every 2D position and choose the symbol to print |

~~~cpp
#include <iostream>
int main() {
    int actorRow=1, actorColumn=3;
    for (int row=0; row<3; ++row) {
        for (int column=0; column<7; ++column) {
            if (row==actorRow && column==actorColumn) std::cout << 'S';
            else std::cout << '.';
        }
        std::cout << '\n';
    }
}
~~~

**Loop invariant:** before row <code>r</code>, every cell in earlier rows has been rendered exactly once.

**Next unlock · L07:** name scoring and movement calculations as testable functions.`,

    7: md`## Game evolution: A scoring contract makes progress measurable

| Today's concept | Exact game part enabled |
|---|---|
| functions and value parameters | award points for cleaning without changing the caller accidentally |

~~~cpp
#include <iostream>
int scoreAfterClean(int score, bool dirtHere) {
    if (dirtHere) score += 10;
    return score;
}
int main() {
    int score=0;
    std::cout << scoreAfterClean(score,true) << ' ' << score << '\n';
}
~~~

**Contract test:** the function returns 10, while the caller's original <code>score</code> remains 0.

**Next unlock · L08:** deliberately mutate row and column through references.`,

    8: md`## Game evolution: A movement function isolates one rule

| Today's concept | Exact game part enabled |
|---|---|
| reference parameters and decomposition | update the caller's two coordinate variables in one named operation |

~~~cpp
void movePlayer(int& row, int& column, int dRow, int dColumn) {
    row += dRow;
    column += dColumn;
}
int main() {
    int row=2, column=3;
    movePlayer(row,column,0,1);
}
~~~

**Mutation contract:** only <code>row</code> and <code>column</code> are aliases; the direction values are copies.

**Next unlock · L09:** store the complete Snake body as sequences of coordinates.`,

    9: md`## Game evolution: Linked segments represent a growing body

| Today's concept | Exact game part enabled |
|---|---|
| fixed arrays and traversal | store several Snake segment coordinates and test a proposed collision |

~~~cpp
#include <array>
int main() {
    std::array<int,4> rows{2,2,2,1};
    std::array<int,4> columns{4,3,2,2};
    int nextRow=2, nextColumn=3;
    bool collision=false;
    for (std::size_t i=0; i<rows.size(); ++i)
        if (rows[i]==nextRow && columns[i]==nextColumn) collision=true;
}
~~~

**Representation check:** index <code>i</code> must name the same segment in both arrays.

**Next unlock · L10:** replace coordinate rules with a stored two-dimensional world.`,

    10: md`## Game evolution: A 2D structure represents the world

| Today's concept | Exact game part enabled |
|---|---|
| two-dimensional arrays | store walls, dirt, and empty cells by row and column |

~~~cpp
#include <iostream>
int main() {
    char world[3][5]{{'#','#','#','#','#'},
                     {'#','*','.','C','#'},
                     {'#','#','#','#','#'}};
    int row=1, column=1;
    if (world[row][column]=='*') world[row][column]='.';
    for (int r=0; r<3; ++r) { for (int c=0; c<5; ++c) std::cout << world[r][c];
        std::cout << '\n'; }
}
~~~

**Invariant:** every access uses one row in [0,3) and one column in [0,5).

**Next unlock · L11:** record and validate a replay as owned text.`,

    11: md`## Game evolution: A replay string stores commands

| Today's concept | Exact game part enabled |
|---|---|
| strings and character validation | store a whole move sequence and reject unknown commands |

~~~cpp
#include <cctype>
#include <string>
int main() {
    std::string replay="wAsD";
    bool valid=true;
    for (std::size_t i=0; valid && i<replay.size(); ++i) {
        unsigned char ch=static_cast<unsigned char>(replay[i]);
        char move=static_cast<char>(std::tolower(ch));
        valid = move=='w' || move=='a' || move=='s' || move=='d';
    }
}
~~~

**Boundary tests:** check the empty replay, one valid character, and one invalid character.

**Next unlock · L12:** turn a replay into a repeatable regression test.`,

    12: md`## Game evolution: A replay becomes a reproducible test

| Today's concept | Exact game part enabled |
|---|---|
| tracing, boundary cases, and assert | replay one move and stop at the first broken expectation |

~~~cpp
#include <cassert>
bool step(int& row, int& column, char move) {
    if (move=='d' && column<4) { ++column; return true; }
    return false;
}
int main() {
    int row=2, column=3;
    assert(step(row,column,'d'));
    assert(row==2 && column==4);
    assert(!step(row,column,'d'));
}
~~~

**Debugging rule:** keep this smallest failing replay before repairing a larger game.

**Next unlock · L13:** group each cell's related fields into one record.`,

    13: md`## Game evolution: Records keep cells and entities coherent

| Today's concept | Exact game part enabled |
|---|---|
| structs and pointers | keep a cell's coordinate and dirt together, then refer to one target |

~~~cpp
#include <array>
struct Cell { int row; int column; bool dirty; };
int main() {
    std::array<Cell,3> cells{{{0,0,false},{0,1,true},{0,2,false}}};
    Cell* target=nullptr;
    for (Cell& cell:cells) if (cell.dirty) target=&cell;
    if (target!=nullptr) target->dirty=false;
}
~~~

**Invariant:** <code>target</code> is either null or points to a live element of <code>cells</code>.

**Next unlock · L14:** make each Snake segment own the next segment dynamically.`,

    14: md`## Game evolution: Linked ownership lets Snake grow safely

| Today's concept | Exact game part enabled |
|---|---|
| dynamic storage and exclusive ownership | let the body grow as a chain of owned segments |

~~~cpp
#include <memory>
struct Segment { int cell=0; std::unique_ptr<Segment> next; };
int main() {
    auto head=std::make_unique<Segment>();
    head->cell=12;
    head->next=std::make_unique<Segment>();
    head->next->cell=11;
}
~~~

**Ownership invariant:** the head exclusively owns the chain; automatic destruction follows every <code>next</code> link.

**Next unlock · L15:** maintain pending dirt as a queue and search stored cells.`,

    15: md`## Game evolution: A queue orders cleaning work

| Today's concept | Exact game part enabled |
|---|---|
| queue behavior on a linear structure | clean dirty cell IDs in first-discovered, first-served order |

~~~cpp
#include <iostream>
#include <vector>
int main() {
    std::vector<int> pending{8,13,21};
    std::size_t front=0;
    while (front<pending.size()) {
        int targetCell=pending[front];
        ++front;
        std::cout << "clean " << targetCell << '\n';
    }
}
~~~

**Queue invariant:** indices below <code>front</code> are cleaned; indices from <code>front</code> onward are pending.

**Next unlock · L16:** explore choices recursively and undo dead ends.`,

    16: md`## Game evolution: Recursive search explores and undoes choices

| Today's concept | Exact game part enabled |
|---|---|
| recursion and backtracking | ask whether the Cleaner can reach dirt through open cells |

~~~cpp
#include <string>
#include <vector>
bool reaches(std::vector<std::string>& grid,int row,int column) {
    if (row<0 || column<0 || row>=static_cast<int>(grid.size()) ||
        column>=static_cast<int>(grid[0].size()) || grid[row][column]=='#') return false;
    if (grid[row][column]=='*') return true;
    grid[row][column]='#';
    return reaches(grid,row-1,column) || reaches(grid,row+1,column) ||
           reaches(grid,row,column-1) || reaches(grid,row,column+1);
}
~~~

**Progress argument:** every recursive branch either stops or marks one previously open cell.

**Next unlock · L17:** accelerate repeated collision checks and prioritize dirt.`,

    17: md`## Game evolution: Invariants make grid decisions faster

| L17 tool | Exact game part enabled |
|---|---|
| binary search | test sorted occupied cell IDs for collision |
| BST | update occupied IDs as the body changes |
| max heap | select the highest-priority dirt target |
| stable merge sort | order equal-priority targets without changing discovery order |

~~~cpp
bool occupied(const int cells[], int count, int id) {
    int left=0, right=count-1;
    while (left<=right) {
        int middle=left+(right-left)/2;
        if (cells[middle]==id) return true;
        if (cells[middle]<id) left=middle+1;
        else right=middle-1;
    }
    return false;
}
~~~

**Invariant:** if <code>id</code> exists, it remains inside the current [left,right] interval.

**Next unlock · L18:** package state and operations inside a reliably constructed game object.`,

    18: md`## Game evolution: A class protects a valid Cleaner

| Today's concept | Exact game part enabled |
|---|---|
| class invariants, construction, and copying | prevent arbitrary coordinate mutation and copy a replay state |

~~~cpp
#include <cassert>
class Cleaner {
    int row_, column_;
public:
    Cleaner(int row,int column):row_(0),column_(0) {
        if (row>=0) row_=row; if (column>=0) column_=column;
    }
    void moveRight(int columns) { if (column_+1<columns) ++column_; }
    int cell(int columns) const { return row_*columns+column_; }
};
int main(){ Cleaner first(1,1); Cleaner replay=first;
    replay.moveRight(5); assert(first.cell(5)==6 && replay.cell(5)==7); }
~~~

**Value test:** changing the copied replay does not change the original Cleaner.

**Next unlock · L19:** model genuine is-a actors and has-a capabilities.`,

    19: md`## Game evolution: Snake and Cleaner can share a world

| Today's concept | Exact game part enabled |
|---|---|
| friend, inheritance, and composition | compare two occupants while only Cleaner has a dirt sensor |

~~~cpp
struct DirtSensor { bool dirty=false; };
class GridOccupant {
    unsigned cell_;
    friend bool sameCell(const GridOccupant&,const GridOccupant&);
public: explicit GridOccupant(unsigned cell):cell_(cell) {}
};
bool sameCell(const GridOccupant& a,const GridOccupant& b){ return a.cell_==b.cell_; }
class SnakeHead:public GridOccupant { public: explicit SnakeHead(unsigned c):GridOccupant(c){} };
class Cleaner:public GridOccupant { DirtSensor sensor_; public: explicit Cleaner(unsigned c):GridOccupant(c){} };
~~~

**Design test:** both derived objects substitute for <code>const GridOccupant&amp;</code>; the sensor remains a has-a member.

**Next unlock · L20:** select different actor behavior through one virtual interface.`,

    20: md`## Game evolution: One interface selects an actor at runtime

| Today's concept | Exact game part enabled |
|---|---|
| virtual dispatch, base ownership, and factory | create one concrete actor while the game uses only its interface |

~~~cpp
#include <cassert>
#include <memory>
struct Actor { virtual char mark() const=0; virtual ~Actor()=default; };
struct Snake:Actor { char mark() const override { return 'S'; } };
std::unique_ptr<Actor> makeSnake() {
    return std::make_unique<Snake>();
}
int main() {
    std::unique_ptr<Actor> actor=makeSnake();
    assert(actor->mark()=='S');
}
~~~

**Substitution test:** <code>main</code> never needs the concrete type after construction.

**Next unlock · L21:** own several differently typed actors in one world.`,

    21: md`## Game evolution: Actors share a graph without sharing ownership

| Today's concept | Exact game part enabled |
|---|---|
| polymorphic container and object graph | own Snake and Cleaner together and store non-owning links |

~~~cpp
#include <cassert>
#include <memory>
#include <vector>
struct Actor { virtual char mark() const=0; virtual ~Actor()=default; };
struct Snake:Actor { char mark() const override{return 'S';} };
struct Cleaner:Actor { char mark() const override{return 'C';} };
int main(){ std::vector<std::unique_ptr<Actor>> actors;
  actors.push_back(std::make_unique<Snake>()); actors.push_back(std::make_unique<Cleaner>());
  std::vector<std::vector<std::size_t>> links{{1},{0}};
  assert(actors[0] && actors[1]); for(const auto& xs:links) for(auto v:xs) assert(v<actors.size()); }
~~~

**Ownership invariant:** the container owns actors; connectivity is represented separately by valid indices.

**Next unlock · L22:** choose and compare route and task-selection policies over this world.`,

    22: md`## Game evolution: A comparator chooses the next target

| Today's concept | Exact game part enabled |
|---|---|
| domain object | one Task records a dirty cell and its route length |
| comparator and sorting | the Cleaner ranks shorter routes first |
| deterministic tie-break | equal routes use row, then column |

~~~cpp
struct Task { int row; int column; int steps; };
std::vector<Task> dirt{{0,4,4},{2,1,3},{4,4,8}};
std::sort(dirt.begin(),dirt.end(),
    [](const Task& a,const Task& b) {
        if (a.steps!=b.steps) return a.steps<b.steps;
        if (a.row!=b.row) return a.row<b.row;
        return a.column<b.column;
    });
Task next{-1,-1,0};
if (!dirt.empty()) next=dirt[0];
~~~

**Invariant/test:** route lengths are nonnegative; after sorting, <code>next</code> is no worse than every remaining task. Test empty, one-task, and equal-distance cases.

**Next unlock · L23:** integrate body, policy, routes, collision rules, and visualization into one verified capstone.`,

    23: md`## Game evolution: One verified capstone connects every layer

| Final build | Exact parts now connected | Concept provenance |
|---|---|---|
| linked Snake | command → candidate head → collision check → body/food update → ASCII frame | state and loops L02–L06; functions/tests L07–L12; records and links L13–L14; search L17; game object L18 |
| grid Cleaner | 2D world → nearest dirt → parent path → legal move → clean and redraw | arrays/strings L09–L11; queue L15; search comparison L16–L17; class invariant L18 |
| multi-agent graph Cleaner | actors → graph links → distinct reservations → synchronous movement → cleaning | inheritance/polymorphism L19–L21; predicates, ranking, routing, and policy L22 |
| capstone decision | required operation → representation → algorithm → invariant → adversarial test | L23 integration checklist |

**One-turn correctness gate:** every Snake segment is distinct and in bounds; every Cleaner step follows a real grid or graph edge; reserved targets are distinct; dirt never increases and decreases exactly when a target is cleaned.

**Adversarial tests:** tail-cell movement, unreachable dirt, equal-distance targets, one actor, and an already-clean world.

**Run/play:** <code>codes/lecture-23-snake-linked-game.cpp</code>, <code>codes/lecture-23-grid-cleaning-robot.cpp</code>, and <code>codes/lecture-23-multi-agent-graph-cleaning.cpp</code>.

**Final extension:** replay the same verified state trace in terminal, ASCII animation, or HTML/SVG without changing the game rules.`
};

const gameVariantAfter = {
    1: 4, 2: 5, 3: 7, 4: 5, 5: 5, 6: 4, 7: 5,
    8: 4, 9: 4, 10: 2, 11: 5, 12: 5, 13: 6, 14: 6,
    15: 6, 16: 5, 17: 7, 18: 4, 19: 7, 20: 6, 21: 6, 22: 5, 23: 7
};

const missingGameVariants = lectures.filter((lecture) =>
    !gameEvolutionSlides[lecture.id] || gameVariantAfter[lecture.id] === undefined);
if (missingGameVariants.length > 0) {
    throw new Error(`Missing game evolution slide for lecture IDs: ${missingGameVariants.map((lecture) => lecture.id).join(', ')}`);
}

// Multiple-choice checks. Like the memes, `afterSlide` is the zero-based index
// of the authored slide each check follows — a quiz belongs against the concept
// it tests, while the idea is still on the screen behind it, and it goes in
// before that slide's meme so nothing separates concept from question.
const quizSlides = {
    3: [{ afterSlide: 6, content: md`## Check yourself: make every binding explicit

Which line parenthesizes <code>total &lt; 20 &amp;&amp; grouped &gt; 0</code> exactly as C++ already evaluates it?

<ol class="course-quiz-options">
<li><button class="course-quiz-option" type="button"><code>total &lt; (20 &amp;&amp; grouped) &gt; 0</code></button></li>
<li><button class="course-quiz-option" type="button" data-course-quiz-correct><code>(total &lt; 20) &amp;&amp; (grouped &gt; 0)</code></button></li>
<li><button class="course-quiz-option" type="button"><code>((total &lt; 20) &amp;&amp; grouped) &gt; 0</code></button></li>
<li><button class="course-quiz-option" type="button"><code>total &lt; ((20 &amp;&amp; grouped) &gt; 0)</code></button></li>
</ol>

<p class="course-quiz-explanation">Relational operators bind tighter than <code>&amp;&amp;</code>, so both comparisons finish before the logical operator combines them.</p>` }],
    4: [
        { afterSlide: 2, content: md`## Check yourself: which branch claims the boundary?

The controller rejects a negative reading, trips above <code>safeLimit</code>, and warns above <code>0.9 * safeLimit</code>. With <code>safeLimit</code> of 10 and no emergency stop, what does a reading of exactly 10 print?

<ol class="course-quiz-options">
<li><button class="course-quiz-option" type="button"><code>INVALID: bad measurement</code></button></li>
<li><button class="course-quiz-option" type="button"><code>TRIP: disconnect supply</code></button></li>
<li><button class="course-quiz-option" type="button" data-course-quiz-correct><code>WARNING: near limit</code></button></li>
<li><button class="course-quiz-option" type="button"><code>NORMAL</code></button></li>
</ol>

<p class="course-quiz-explanation">The trip test is <code>current &gt; safeLimit</code>, and 10 is not greater than 10 — so the reading falls through to the warning band above 9. An exact boundary belongs to whichever branch uses <code>&gt;=</code>.</p>` },
        { afterSlide: 3, content: md`## Check yourself: what can a switch select on?

Which one of these cannot control a <code>switch</code> statement?

<ol class="course-quiz-options">
<li><button class="course-quiz-option" type="button"><code>char command</code></button></li>
<li><button class="course-quiz-option" type="button" data-course-quiz-correct><code>double reading</code></button></li>
<li><button class="course-quiz-option" type="button"><code>int menuChoice</code></button></li>
<li><button class="course-quiz-option" type="button">an enumeration value</button></li>
</ol>

<p class="course-quiz-explanation">A <code>switch</code> compares one discrete value against constant cases, so it accepts integral and enumeration types. A measurement belongs in a branch chain that tests ranges.</p>` },
        { afterSlide: 4, content: md`## Check yourself: why is the guarded division safe?

In <code>resistance &gt; minimumResistance &amp;&amp; voltage / resistance &gt; limit</code>, what stops the division from running on an unusable resistance?

<ol class="course-quiz-options">
<li><button class="course-quiz-option" type="button">The compiler reorders the operands into a safe order.</button></li>
<li><button class="course-quiz-option" type="button">C++ checks every division for a zero denominator.</button></li>
<li><button class="course-quiz-option" type="button">Both operands are evaluated and the second result is discarded.</button></li>
<li><button class="course-quiz-option" type="button" data-course-quiz-correct><code>&amp;&amp;</code> skips its right operand once the left one is false.</button></li>
</ol>

<p class="course-quiz-explanation">Short-circuiting is what makes the guard work: the left test decides the result on its own, so the division is never reached. Order the operands accordingly — the guard has to come first.</p>` }
    ]
};

function markdownSection(content, className = '', attributes = '') {
    const classAttribute = className ? ` class="${className}"` : '';
    const extraAttributes = attributes ? ` ${attributes}` : '';
    return `    <section${classAttribute}${extraAttributes} data-markdown><textarea data-template>\n${content.trim()}\n    </textarea></section>`;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function memeSlide(lectureId, meme) {
    const lectureSlug = `l${String(lectureId).padStart(2, '0')}`;
    const imagePath = `assets/lecture-memes/${lectureSlug}/${meme.slug}.png`;
    const visualPoint = meme.punchline.replace(/[.!?]+$/, '');
    const memeAlt = `${meme.alt.replace(/[.!?]+$/, '')} — visual point: ${visualPoint}.`;
    return md`## ${meme.title}

<figure class="course-meme-figure">
<img src="${imagePath}" alt="${escapeHtml(memeAlt)}" width="900" height="506" loading="lazy">
<figcaption>
<p class="course-meme-setup"><strong>Setup</strong> ${meme.setup}</p>
<p class="course-meme-punchline"><strong>Punchline</strong> ${meme.punchline}</p>
</figcaption>
</figure>`;
}

function studioSlide(brief) {
    return md`## ${brief.problem}

**Studio thread:** ${brief.thread}

| Ask | Today’s answer |
|---|---|
| **Problem** | ${brief.problem} |
| **Model** | ${brief.model} |
| **Represent** | ${brief.represent} |
| **Solve** | ${brief.solve} |
| **Verify** | ${brief.verify} |
| **Improve** | ${brief.improve} |

**Technique lens:** ${brief.lens}

**Compare:** ${brief.compare}`;
}

function practicalExampleSlide(extra) {
    const takeaways = extra.takeaways.map((takeaway) => `- ${takeaway}`).join('\n');
    return md`## ${extra.takeaways[0]} · ${extra.title}

${extra.context}

~~~cpp
${extra.code}
~~~

**Takeaways**

${takeaways}`;
}

function practiceSlide(extra) {
    const problems = extra.problems.map((problem) => `1. ${problem}`).join('\n');
    return md`## Solve five problems to transfer ${extra.title}

**IC151 lab practice · 5 problems**

${problems}

Reaching this set marks the lecture as studied in this browser. [Open the IC151 lab setup and batch schedule](ic151.html).`;
}

function verificationSlide(extra) {
    const checks = extra.problems.slice(0, 3).map((problem) => `- ${problem}`).join('\n');
    return md`## Verify ${extra.title} with a claim, trace, boundary, and improvement

Use the practical example as a small experiment. Before you leave, make the reasoning visible:

- **Claim:** ${extra.takeaways[0]}
- **Trace:** name the state that changes and the observation that would confirm it.
- **Boundary:** choose one smallest, largest, empty, or invalid input that could expose a defect.
- **Improvement:** explain one change that would make the solution clearer or safer.

### Exit ticket

Choose one problem to solve now and two to attempt in the lab:

${checks}`;
}

function handoffSlide(extra) {
    return md`## Explain ${extra.title} without opening the code

Explain today’s idea to a partner without opening the code:

1. State the input, output, and one rule the solution must preserve.
2. Point to the operation that makes progress or changes the state.
3. Name the first test you would run after changing the implementation.

If the explanation needs “and then another unrelated thing,” split the design before you code.`;
}

function page({ id, title, slides }) {
    const extra = lectureExtras[id];
    const instructorByline = '**Instructor:** [Dr. Debasish Pattanayak](https://drdebmath.github.io)';
    const authoredSections = slides.map((slide, slideIndex) => {
        const content = slideIndex === 0 && !slide.includes(instructorByline)
            ? `${slide}\n\n${instructorByline}`
            : slide;
        return markdownSection(content);
    });
    const insertionIndex = gameVariantAfter[id];
    if (insertionIndex < 1 || insertionIndex >= authoredSections.length) {
        throw new Error(`Invalid game slide position for lecture ${id}: ${insertionIndex}`);
    }
    const courseSections = [];
    const memesBySlide = new Map();
    for (const meme of lectureMemes[id]) {
        const existing = memesBySlide.get(meme.afterSlide) || [];
        existing.push(meme);
        memesBySlide.set(meme.afterSlide, existing);
    }
    const quizzesBySlide = new Map();
    for (const quiz of quizSlides[id] || []) {
        if (quiz.afterSlide < 1 || quiz.afterSlide >= authoredSections.length) {
            throw new Error(`Invalid quiz position for lecture ${id}: ${quiz.afterSlide}`);
        }
        const existing = quizzesBySlide.get(quiz.afterSlide) || [];
        existing.push(quiz);
        quizzesBySlide.set(quiz.afterSlide, existing);
    }
    for (let slideIndex = 0; slideIndex < authoredSections.length; slideIndex += 1) {
        if (slideIndex === insertionIndex) {
            courseSections.push(
                markdownSection(gameEvolutionSlides[id], 'course-extra-slide course-game-evolution-slide')
            );
        }
        courseSections.push(authoredSections[slideIndex]);
        for (const quiz of quizzesBySlide.get(slideIndex) || []) {
            courseSections.push(markdownSection(quiz.content, 'course-extra-slide course-quiz-slide'));
        }
        for (const meme of memesBySlide.get(slideIndex) || []) {
            courseSections.push(
                markdownSection(
                    memeSlide(id, meme),
                    'course-extra-slide course-meme-slide',
                    `data-course-meme="${escapeHtml(meme.slug)}"`
                )
            );
        }
    }
    const generatedContext = [
        markdownSection(practicalExampleSlide(extra), 'course-extra-slide practical-example-slide'),
        ...(id === 1 ? lectureOneShowcase.map((slide) => markdownSection(slide, 'course-extra-slide course-showcase-slide')) : [])
    ];
    const studio = markdownSection(
        studioSlide(studioBriefs[id]),
        'course-extra-slide course-algorithmic-studio'
    );
    const practice = markdownSection(
        practiceSlide(extra),
        'course-extra-slide lab-practice-slide',
        `data-course-practice="${id}"`
    );
    const verification = markdownSection(verificationSlide(extra));
    const handoff = markdownSection(handoffSlide(extra));
    const orderedSections = id === 3
        ? [courseSections[0], ...courseSections.slice(1, -1), ...generatedContext, courseSections.at(-1)]
        : [courseSections[0], ...generatedContext, ...courseSections.slice(1)];
    const sections = [...orderedSections, verification, handoff, practice, studio].join('\n');
    return `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="CS103 Lecture ${id}: ${title}">
    <title>Lecture ${id}: ${title}</title>
    <script src="lecture-runtime.js"></script>
    <link rel="stylesheet" href="lecture-modern.css">
</head>
<body>
<div class="reveal"><div class="slides">
${sections}
</div></div>
<script>Reveal.initialize({ hash: true, plugins: [RevealMarkdown, RevealHighlight] });</script>
<script src="lecture-modern.js"></script>
</body>
</html>
`;
}

for (const lecture of lectures) {
    fs.writeFileSync(path.join(root, `lecture${lecture.id}.html`), page(lecture));
}

const reviewRedirect = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="refresh" content="0; url=lecture12.html"><link rel="canonical" href="lecture12.html">
<title>Mid-semester review · CS103</title></head><body><p>The review is now <a href="lecture12.html">Lecture 12 · Repair programs with evidence and tests</a>.</p></body></html>\n`;
fs.writeFileSync(path.join(root, 'midsem-review.html'), reviewRedirect);

console.log(`Generated ${lectures.length} chronological lecture pages.`);
