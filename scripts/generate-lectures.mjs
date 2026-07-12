import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const md = String.raw;

const lectures = [
    {
        id: 1,
        title: 'Programming & Problem Solving',
        slides: [
            md`# Lecture 1: Programming & Problem Solving
## From a problem to a running C++ program

No computer or programming experience is assumed.

**Instructor:** [Dr. Debasish Pattanayak](https://drdebmath.github.io)`,
            md`## A program follows an algorithm

An **algorithm** is a finite sequence of precise steps.

Use the same problem-solving workflow every time:

1. State the input and expected output.
2. Work one example by hand.
3. Write unambiguous steps.
4. Implement one step at a time.
5. Test normal, boundary, and invalid input.`,
            md`## What the computer does

- The **CPU** executes machine instructions.
- RAM holds active instructions and values temporarily.
- Storage keeps files when power is off.
- Binary encodes information using bits.

**Abstraction** lets C++ express ideas without writing machine instructions directly.`,
            md`## Anatomy of the first program

~~~cpp
#include <iostream>

int main() {
    std::cout << "Hello, CS103!\n";
    return 0;
}
~~~

<code>main</code> is the entry point. Output makes the program's result observable.`,
            md`## Edit, compile, link, run

Save the source as <code>hello.cpp</code>, then use the toolchain:

~~~text
g++ -std=c++17 hello.cpp -o hello
./hello
~~~

- A compiler checks and translates the source.
- A linker combines required compiled parts.
- The executable is the program you run.`,
            md`## Reference: why C++ exists

Programming languages evolved to make instructions safer to express and easier to reuse.

C++ combines:

- high-level functions and standard-library types;
- direct control over representation and resources;
- performance suitable for scientific and systems work.

History is context—not a prerequisite for writing the first program.`,
            md`## Comments, identifiers, and declarations

~~~cpp
// A comment explains intent.
int attempts = 0;          // declaration and initialization
double distanceKm = 2.5;
bool laboratoryOpen = true;
~~~

An identifier names something. A declaration introduces a name and its type.`,
            md`## Session summary

- Begin with input, process, and output.
- An algorithm must be finite and precise.
- The CPU executes the compiled instructions.
- <code>main</code> is the C++ entry point.
- Edit → compile → link → run → test.`
        ]
    },
    {
        id: 2,
        title: 'Types & Representation',
        slides: [
            md`# Lecture 2: Types & Representation
## Give every stored value a deliberate meaning`,
            md`## Variables and static typing

A **variable** is a named storage location. **Static typing** means types are checked before execution.

~~~cpp
int attempts = 0;
double temperature = 31.5;
char grade = 'A';
bool submitted = false;
~~~

The initializer supplies the first value.`,
            md`## Primitive types answer different questions

| Requirement | Suitable type | Example |
|---|---|---|
| whole-number count | <code>int</code> | students |
| fractional measurement | <code>double</code> | voltage |
| one character | <code>char</code> | grade |
| true/false state | <code>bool</code> | connected |

Sizes are implementation-dependent; inspect them with <code>sizeof</code>.`,
            md`## Reference: integer modifiers

<code>signed</code> supports negative and positive values. <code>unsigned</code> represents only non-negative values but wraps at its maximum.

<code>short</code>, <code>long</code>, and <code>long long</code> change minimum range requirements.

Use a modifier only when its range and interaction with other types are understood.`,
            md`## Constants preserve an invariant

~~~cpp
const double safeLimit = 12.5;
double reading = 11.8;

// safeLimit = 13.0;  // compile-time error
~~~

<code>const</code> prevents modification through that name after initialization.`,
            md`## Type inference still produces one type

~~~cpp
auto samples = 12;       // int
auto mean = 7.25;        // double
const auto room = 103;   // const int
~~~

Use <code>auto</code> when the initializer makes the type obvious.`,
            md`## Convert explicitly when information may change

~~~cpp
double mean = 97.56;
int whole = static_cast<int>(mean);  // 97
~~~

An explicit conversion documents intent. Check the destination range first: fractional information may be truncated, and an out-of-range conversion may be invalid.`,
            md`## Session summary

- A type describes values and permitted operations.
- Choose representation from meaning, range, and precision.
- Do not assume exact byte sizes.
- Use <code>const</code> for values that must not change.
- Make potentially lossy conversions explicit.`
        ]
    },
    {
        id: 3,
        title: 'Expressions, Scope & Program State',
        slides: [
            md`# Lecture 3: Expressions, Scope & Program State
## Names, values, visibility, and lifetime`,
            md`## Operators build expressions

~~~cpp
int total = 5 + 3 * 2;       // 11
int grouped = (5 + 3) * 2;   // 16
bool safe = total < 20 && grouped > 0;
~~~

Operator precedence decides binding when parentheses are absent. Prefer parentheses when a reader might hesitate.`,
            md`## A namespace prevents name collisions

~~~cpp
namespace laboratory {
int completed = 0;
}

int main() {
    laboratory::completed = 1;
}
~~~

The scope-resolution operator <code>::</code> selects a name from a namespace.`,
            md`## Scope controls where a name is visible

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
            md`## Scope and lifetime are different

- **Scope:** where source code may use a name.
- **Storage duration:** how long the corresponding object exists.
- **Linkage:** whether declarations in different files name the same entity.

A local static object has block scope but program-long storage duration.`,
            md`## A static local remembers between calls

~~~cpp
#include <iostream>

int nextExperimentNumber() {
    static int completed = 0;
    return ++completed;
}

int main() {
    std::cout << nextExperimentNumber() << ' ';
    std::cout << nextExperimentNumber();  // 1 2
}
~~~`,
            md`## Reference: one definition shared by two files

~~~cpp
// data.cpp
int sharedCount = 0;

// report.cpp
extern int sharedCount;
~~~

<code>extern</code> declares an entity defined elsewhere. A complete executable must still contain <code>main</code> and link every required definition.`,
            md`## Session summary

- Expressions compute values or effects.
- Parentheses make precedence explicit.
- Namespaces organize declarations.
- Scope, storage duration, and linkage answer different questions.
- Avoid global mutable state unless one clearly identified part of the program is responsible for it.`
        ]
    },
    {
        id: 4,
        title: 'Decisions & Safe Branching',
        slides: [
            md`# Lecture 4: Decisions & Safe Branching
## Turn requirements into testable paths`,
            md`## A condition selects a path

Write the rule before the syntax:

| Current | Emergency stop | Result |
|---:|:---:|---|
| above limit | either | trip |
| within limit | true | trip |
| within limit | false | normal |

Every row should correspond to a test.`,
            md`## Order an if / else-if chain carefully

~~~cpp
if (emergencyStop || current > safeLimit) {
    std::cout << "TRIP\n";
} else if (current > 0.9 * safeLimit) {
    std::cout << "WARNING\n";
} else {
    std::cout << "NORMAL\n";
}
~~~

Place exceptional and narrower cases before the normal fallback.`,
            md`## Use switch for discrete choices

~~~cpp
switch (menuChoice) {
case 1: std::cout << "voltage\n"; break;
case 2: std::cout << "current\n"; break;
default: std::cout << "invalid choice\n";
}
~~~

<code>switch</code> is for integral or enumeration values, not numeric ranges.`,
            md`## Short-circuit evaluation can guard an operation

~~~cpp
if (resistance != 0.0 && voltage / resistance > limit) {
    std::cout << "over current\n";
}
~~~

The division runs only when the left condition is true.`,
            md`## Floating-point equality needs a tolerance

~~~cpp
#include <cmath>

bool nearlyEqual(double a, double b, double tolerance) {
    return std::abs(a - b) <= tolerance;
}
~~~

Choose tolerance from the measurement or problem—not one universal constant.`,
            md`## Test the boundaries first

For a safe limit of 10, test:

- normal: 6;
- lower boundary: 0;
- exact boundary: 10;
- just above: 10.01;
- invalid measurement: negative input.

Also test every <code>switch</code> case and its default.`,
            md`## Session summary

- Translate decision tables into branches.
- Order branches from exceptional to fallback.
- Use <code>switch</code> only for discrete alternatives.
- Use short-circuiting to guard unsafe work.
- Treat boundary tests as part of implementation.`
        ]
    },
    {
        id: 5,
        title: 'Iteration I · while & Input Validation',
        slides: [
            md`# Lecture 5: Iteration I
## while, do-while, progress, and stopping`,
            md`## Trace a while loop before running it

~~~cpp
int remaining = 3;
while (remaining > 0) {
    std::cout << remaining << ' ';
    --remaining;
}
~~~

Trace: 3 → 2 → 1 → stop at 0.`,
            md`## Every loop needs progress

Before each iteration, ask:

1. What state does the condition inspect?
2. What must remain true?
3. Which statement moves toward stopping?

If no state moves toward a false condition, the loop may never terminate.`,
            md`## Sentinel input handles an unknown count

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
            md`## do-while validates after the first attempt

~~~cpp
double height = 0.0;
do {
    std::cout << "Positive height: ";
    std::cin >> height;
} while (height <= 0.0);
~~~

The body runs once before the condition is tested.`,
            md`## Three common loop failures

- No update: the condition never changes.
- Wrong direction: the update moves away from stopping.
- Off-by-one: <code>&lt;</code> and <code>&lt;=</code> describe different valid ranges.

Write the intended values beside the loop before choosing the comparison.`,
            md`## Practical pattern: scan until enough defects

~~~cpp
while (tested < available && defects < 3) {
    double diameter;
    std::cin >> diameter;
    if (diameter < 9.95 || diameter > 10.05) ++defects;
    ++tested;
}
~~~

Both stopping reasons remain visible in the condition.`,
            md`## Session summary

- <code>while</code> may execute zero times.
- <code>do-while</code> executes at least once.
- A sentinel can terminate unknown-length input.
- State must make measurable progress.
- Trace normal, boundary, and invalid cases.`
        ]
    },
    {
        id: 6,
        title: 'Iteration II · for, Nested Loops & Invariants',
        slides: [
            md`# Lecture 6: Iteration II
## for loops, nested loops, and invariants`,
            md`## Counted repetition with for

~~~cpp
for (int step = 1; step <= 5; ++step) {
    std::cout << step << ' ';
}
~~~

Read it as initialize → test → body → update → test again.`,
            md`## State the valid counter range

For five zero-based positions, valid indices are 0, 1, 2, 3, 4.

~~~cpp
for (int i = 0; i < 5; ++i) {
    std::cout << i << ' ';
}
~~~

The condition directly states the upper boundary is excluded.`,
            md`## Nested loops enumerate combinations

~~~cpp
for (int row = 0; row < 3; ++row) {
    for (int col = 0; col < 4; ++col) {
        std::cout << row << ',' << col << '\n';
    }
}
~~~

The inner loop completes every column for one row.`,
            md`## A loop invariant explains correctness

Example invariant:

> Before iteration <code>i</code>, positions 0 through <code>i - 1</code> have already been processed.

Check the statement before the first iteration, after one update, and at termination.`,
            md`## Choose the loop from the stopping rule

- <code>while</code>: stop when an event or changing condition says so.
- <code>do-while</code>: perform once, then decide.
- <code>for</code>: traverse a known counter range.

The choice communicates intent; any loop can still be written incorrectly.`,
            md`## Boundary failures to diagnose

~~~cpp
for (int i = 0; i <= 5; ++i)   // six values
for (int i = 5; i >= 0; ++i)   // moves away from stopping
~~~

These are diagnosis examples. Do not run the second loop unchanged.`,
            md`## Session summary

- Put initialization, test, and update together for counted work.
- Nested loops traverse combinations such as rows × columns.
- Write valid values before writing a bound.
- Use an invariant to explain what is already correct.`
        ]
    },
    {
        id: 7,
        title: 'Functions I · Contracts & Calls',
        slides: [
            md`# Lecture 7: Functions I
## Give one operation a clear name and contract`,
            md`## A function owns one task

A function contract states:

- required inputs;
- any preconditions;
- returned result or visible effect.

Small contracts reduce copy-paste and can be tested independently.`,
            md`## Read a definition from the outside inward

~~~cpp
double rectangleArea(double length, double width) {
    return length * width;
}
~~~

Return type → name → parameters → body.`,
            md`## Declaration before use, definition once

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
            md`## Value parameters are local copies

~~~cpp
int doubled(int value) {
    value *= 2;
    return value;
}
~~~

Changing <code>value</code> does not change the caller's argument.`,
            md`## Decompose a calculation into named steps

~~~cpp
double subtotal(double price, int count) { return price * count; }
double tax(double amount, double rate) { return amount * rate; }
double total(double amount, double rate) { return amount + tax(amount, rate); }
~~~

Each name states one responsibility.`,
            md`## Reference: unnamed callable behavior

A lambda expression defines a small callable at its point of use.

~~~cpp
auto isPositive = [](int value) { return value > 0; };
~~~

Named functions remain the default for novice code. Lambdas return later as search and sorting applications.`,
            md`## Session summary

- A function contract states inputs, preconditions, and output.
- A declaration makes a function known before its definition.
- Value parameters are copies.
- Prefer short functions with one explainable responsibility.`
        ]
    },
    {
        id: 8,
        title: 'Functions II · References & Decomposition',
        slides: [
            md`# Lecture 8: Functions II
## References, overloading, decomposition, and the call stack`,
            md`## Value or reference?

~~~cpp
void clampToZero(double& value) {
    if (value < 0.0) value = 0.0;
}
~~~

A reference is another name for the caller's object. Mutation must be part of the contract.`,
            md`## A const reference permits reading, not mutation

~~~cpp
void printReading(const double& reading) {
    std::cout << reading << '\n';
}
~~~

The syntax matters now; avoiding expensive copies becomes useful when records and strings arrive.`,
            md`## Overloads share a name, not a signature

~~~cpp
int absolute(int value);
double absolute(double value);
~~~

The compiler selects from parameter lists. Return type alone cannot distinguish overloads.`,
            md`## Decomposition keeps main readable

~~~cpp
double readPositive();
double calculateFare(double distance, double rate);
void printFare(double fare);
~~~

<code>main</code> coordinates these tasks instead of containing every detail.`,
            md`## Function calls form a call stack

Each active call has a stack frame containing parameters, locals, and return state.

The most recent unfinished call completes first—last in, first out.`,
            md`## Gentle recursion preview

~~~cpp
int factorial(int n) {
    if (n <= 1) return 1;          // base case
    return n * factorial(n - 1);   // smaller input
}
~~~

Every recursive call must move measurably toward a base case.`,
            md`## Session summary

- References can expose caller state intentionally.
- <code>const&</code> provides read-only access through an alias.
- Overloads need distinguishable parameter lists.
- The call stack tracks unfinished calls.
- Recursive design requires a base case and progress.`
        ]
    },
    {
        id: 9,
        title: 'Arrays I · Fixed Sequences & Traversal',
        slides: [
            md`# Lecture 9: Arrays I
## Store and traverse one fixed sequence safely`,
            md`## An array has one element type and fixed extent

~~~cpp
#include <array>

std::array<double, 5> voltage{2.1, 2.3, 2.0, 2.4, 2.2};
~~~

The five elements occupy a contiguous sequence.`,
            md`## An index selects one element

~~~cpp
voltage[0] = 2.5;            // first element
double last = voltage[4];    // fifth element
~~~

For size 5, valid indices are 0 through 4.`,
            md`## Traverse using the actual bound

~~~cpp
double sum = 0.0;
for (std::size_t i = 0; i < voltage.size(); ++i) {
    sum += voltage[i];
}
~~~

The invariant is: elements before <code>i</code> are already included.`,
            md`## Range-for expresses whole-sequence work

~~~cpp
double maximum = voltage[0];
for (double value : voltage) {
    if (value > maximum) maximum = value;
}
~~~

Use an explicit index only when the position matters.`,
            md`## Pass an array without hiding its size

~~~cpp
double mean(const std::array<double, 5>& values) {
    double sum = 0.0;
    for (double value : values) sum += value;
    return sum / values.size();
}
~~~`,
            md`## Out-of-bounds access is undefined behavior

~~~cpp
// voltage[5] = 0.0;  // invalid: no sixth element
~~~

C++ does not automatically protect <code>operator[]</code>. Keep the valid range visible in the loop condition.`,
            md`## Session summary

- A fixed array has one type, one extent, and contiguous elements.
- Zero is the first index.
- Use <code>size()</code> as the traversal bound.
- State the invariant and test empty-boundary logic before coding.`
        ]
    },
    {
        id: 10,
        title: 'Arrays II · Matrices & std::vector',
        slides: [
            md`# Lecture 10: Arrays II
## Matrices and runtime-sized contiguous sequences`,
            md`## A matrix needs one index per dimension

~~~cpp
int image[2][3]{{10, 20, 30}, {40, 50, 60}};
int pixel = image[1][2];  // row 1, column 2
~~~

Both dimensions are zero-based.`,
            md`## Traverse rows and columns with matching bounds

~~~cpp
for (int row = 0; row < 2; ++row) {
    for (int col = 0; col < 3; ++col) {
        std::cout << image[row][col] << ' ';
    }
}
~~~`,
            md`## A vector owns a runtime-sized sequence

~~~cpp
#include <vector>

std::vector<int> readings;
readings.push_back(17);
readings.push_back(21);
~~~

The vector grows while preserving contiguous element storage.`,
            md`## Bounds still matter

~~~cpp
for (std::size_t i = 0; i < readings.size(); ++i) {
    std::cout << readings.at(i) << '\n';
}
~~~

<code>at()</code> checks; <code>operator[]</code> assumes the index is valid.`,
            md`## Choose from the requirement

| Requirement | Representation |
|---|---|
| exactly seven daily readings | fixed array |
| readings until input ends | vector |
| fixed 3 × 3 transform | 2D array |
| rows whose lengths may differ | nested vectors |`,
            md`## Practical pattern: row totals

~~~cpp
std::vector<std::vector<int>> scores{{8, 7, 9}, {6, 10, 8}};
for (const auto& row : scores) {
    int total = 0;
    for (int score : row) total += score;
    std::cout << total << '\n';
}
~~~`,
            md`## Session summary

- A matrix needs row and column bounds.
- A vector owns a contiguous sequence whose size is known at runtime.
- <code>size()</code> states the valid upper bound.
- Choose fixed or dynamic storage from the requirement.`
        ]
    },
    {
        id: 11,
        title: 'Strings & Text Processing',
        slides: [
            md`# Lecture 11: Strings & Text Processing
## Prefer owned text values, then study their representation`,
            md`## std::string owns and sizes its text

~~~cpp
#include <string>

std::string name = "IIT Indore";
std::cout << name.size() << '\n';
~~~

<code>std::string</code> manages its character storage.`,
            md`## Read a complete line

~~~cpp
std::string sentence;
std::getline(std::cin, sentence);
~~~

<code>getline</code> preserves spaces. When mixing formatted extraction and line input, consume the pending newline deliberately.`,
            md`## Search and slice with explicit positions

~~~cpp
std::size_t dash = code.find('-');
if (dash != std::string::npos) {
    std::string prefix = code.substr(0, dash);
}
~~~

Always check whether a search succeeded.`,
            md`## Classify characters safely

~~~cpp
unsigned char ch = static_cast<unsigned char>(text[i]);
if (std::isdigit(ch)) ++digits;
~~~

Character classification comes from <code>&lt;cctype&gt;</code>. Convert through <code>unsigned char</code> before calling it.`,
            md`## Validate one rule at a time

~~~cpp
bool valid = id.size() == 9;
valid = valid && id[0] == 'B' && id[1] == 'T';
for (std::size_t i = 2; valid && i < id.size(); ++i) {
    valid = std::isdigit(static_cast<unsigned char>(id[i]));
}
~~~`,
            md`## Reference: C-style strings

A C-style string is a character array ending at the first null character <code>'\0'</code>.

Functions from <code>&lt;cstring&gt;</code> cannot discover the capacity of a destination buffer. Prefer <code>std::string</code>; use C strings only when an interface requires them.`,
            md`## Session summary

- <code>std::string</code> is the default owned text type.
- Check search results and index bounds.
- Use <code>getline</code> for complete lines.
- Character classification requires a safe unsigned value.
- A buffer overflow is undefined behavior, not a recoverable string operation.`
        ]
    },
    {
        id: 12,
        title: 'Debugging & Assessment Debrief',
        slides: [
            md`# Lecture 12: Debugging & Assessment Debrief
## Turn feedback into a repair strategy`,
            md`## Classify the failure first

- Compile-time: the source violates a language rule.
- Link-time: a required definition is missing or duplicated.
- Run-time: execution fails or reports an exception.
- Logic: the program runs but produces the wrong result.

Classification determines the next useful observation.`,
            md`## Read the first useful diagnostic

For a compiler message:

1. Open the first referenced source line.
2. Read the complete message, not only “error.”
3. Inspect the line immediately before it too.
4. Make one small change.
5. Recompile before changing anything else.`,
            md`## Trace state instead of guessing

~~~cpp
int total = 0;
for (int i = 0; i < 3; ++i) {
    total += values[i];
}
~~~

Record <code>i</code>, <code>values[i]</code>, and <code>total</code> after every iteration.`,
            md`## Boundary tests expose common defects

For an average function, test:

| Case | Why |
|---|---|
| empty input | invalid precondition |
| one value | smallest valid size |
| two unequal integers | reveals integer division |
| maximum expected count | stresses the bound |`,
            md`## Repair a safe average

~~~cpp
double average(const std::vector<int>& values) {
    if (values.empty()) throw std::invalid_argument("empty data");
    long long sum = 0;
    for (int value : values) sum += value;
    return static_cast<double>(sum) / values.size();
}
~~~`,
            md`## Use assessment evidence

For each lost mark, write:

- the concept reference;
- the incorrect assumption;
- one smallest counterexample;
- one new practice problem;
- the date you will retry it without notes.

Revisit prerequisites in the dependency graph instead of memorizing one answer.`,
            md`## Session summary

- Classify before editing.
- Trace changing state explicitly.
- Test the smallest valid and invalid boundaries.
- Repair one assumption at a time.
- Assessment feedback is a map for deliberate practice.`
        ]
    },
    {
        id: 13,
        title: 'Records, Pointers & Memory Layout',
        slides: [
            md`# Lecture 13: Records, Pointers & Memory Layout
## Group related state and inspect addresses safely`,
            md`## A struct models one record

~~~cpp
struct Reading {
    int sensorId;
    double value;
    bool valid;
};

Reading sample{7, 31.5, true};
~~~

Member names keep related values coherent.`,
            md`## Arrays of records support repeated domain data

~~~cpp
std::array<Reading, 3> samples{{
    {1, 30.1, true}, {2, 29.8, true}, {3, 0.0, false}
}};

for (const Reading& reading : samples) {
    if (reading.valid) std::cout << reading.value << '\n';
}
~~~`,
            md`## A pointer stores an address

~~~cpp
int score = 95;
int* scorePointer = &score;
~~~

The pointer is a separate object. <code>&score</code> obtains the address of <code>score</code>.`,
            md`## Dereference only a valid pointer

~~~cpp
if (scorePointer != nullptr) {
    *scorePointer += 5;
}
~~~

Dereferencing accesses the pointed-to object. <code>nullptr</code> explicitly means “no object.”`,
            md`## Dot and arrow select record members

~~~cpp
Reading reading{7, 31.5, true};
Reading* pointer = &reading;

reading.value = 32.0;
pointer->value = 32.5;  // same as (*pointer).value
~~~`,
            md`## Reference: layout, alignment, and pointer arithmetic

Compilers may insert padding so members satisfy alignment constraints. Use <code>sizeof</code> and <code>offsetof</code> to inspect a specific implementation.

Pointer arithmetic is valid only within one array object (or one-past its end). Prefer indexed or range-based traversal.`,
            md`## Session summary

- A struct creates one coherent record type.
- An array of records stores repeated entities.
- A pointer stores an address; dereferencing requires validity.
- Check for <code>nullptr</code> before access.
- Layout is implementation-specific and pointer arithmetic has strict bounds.`
        ]
    },
    {
        id: 14,
        title: 'Dynamic Memory & Linked Structures',
        slides: [
            md`# Lecture 14: Dynamic Memory & Linked Structures
## Make ownership and lifetime explicit`,
            md`## Automatic and dynamic storage solve different needs

Automatic local objects are destroyed when their scope ends. Dynamic storage can outlive the creating scope, so ownership must state who releases it.`,
            md`## Raw new and delete must match

~~~cpp
int* value = new int{42};
std::cout << *value << '\n';
delete value;
value = nullptr;
~~~

Use <code>delete[]</code> only for storage obtained with <code>new[]</code>.`,
            md`## Prefer ownership in a smart pointer

~~~cpp
auto value = std::make_unique<int>(42);
std::cout << *value << '\n';
~~~

A smart pointer releases its owned resource automatically. It prevents ownership leaks, but unrelated non-owning pointers can still dangle.`,
            md`## Name the failure modes

- Memory leak: owned storage becomes unreachable without release.
- Dangling pointer: an address remains after the object has died.
- Double deletion: the same allocation is released twice.
- Allocation failure: <code>new</code> normally throws <code>std::bad_alloc</code>.`,
            md`## A linked list connects separately stored nodes

~~~cpp
struct Node {
    int value;
    std::unique_ptr<Node> next;
};

auto head = std::make_unique<Node>(Node{42, nullptr});
head->next = std::make_unique<Node>(Node{57, nullptr});
~~~`,
            md`## Traverse links until the end

~~~cpp
for (Node* current = head.get(); current != nullptr;
     current = current->next.get()) {
    std::cout << current->value << ' ';
}
~~~

The invariant states that every node before <code>current</code> has been processed.`,
            md`## Reference: the C allocation interface

<code>malloc</code>, <code>calloc</code>, and <code>realloc</code> manage untyped bytes and must be paired with <code>free</code>.

They do not construct or destroy C++ objects. Use them only when a C interface requires them.`,
            md`## Session summary

- Dynamic storage requires an ownership rule.
- Prefer RAII and <code>unique_ptr</code> for exclusive ownership.
- Smart ownership prevents leaks, not every possible dangling observer.
- Linked lists trade contiguous access for explicit links.`
        ]
    },
    {
        id: 15,
        title: 'Linear Structures & Array Algorithms',
        slides: [
            md`# Lecture 15: Linear Structures & Array Algorithms
## Choose operations before representation`,
            md`## An abstract data type is an operation contract

A stack promises <code>push</code>, <code>pop</code>, and <code>top</code>. A queue promises <code>enqueue</code>, <code>dequeue</code>, and <code>front</code>.

The contract does not require a class or one specific representation.`,
            md`## Linear search applies traversal to stored data

~~~cpp
int found = -1;
for (std::size_t i = 0; i < values.size(); ++i) {
    if (values[i] == target) {
        found = static_cast<int>(i);
        break;
    }
}
~~~

Worst case: inspect every element.`,
            md`## Bubble sort applies neighboring swaps

~~~cpp
for (std::size_t end = values.size(); end > 1; --end) {
    for (std::size_t i = 1; i < end; ++i) {
        if (values[i] < values[i - 1])
            std::swap(values[i], values[i - 1]);
    }
}
~~~`,
            md`## A stack is last-in, first-out

With an array representation, keep one integer <code>top</code>:

- push: check capacity, then advance and store;
- pop: check emptiness, read, then retreat;
- top: inspect without removing.

An undo history and function calls are stack applications.`,
            md`## A queue is first-in, first-out

A circular array keeps <code>front</code>, <code>rear</code>, and <code>count</code>. A linked queue keeps pointers to the first and last nodes.

Print jobs and breadth-first exploration are queue applications.`,
            md`## Compare operations, not names

| Requirement | Useful choice |
|---|---|
| scan unsorted readings | array + linear search |
| undo most recent action | stack |
| serve arrival order | queue |
| repeatedly exchange adjacent inversions | array + bubble sort |`,
            md`## Session summary

- An ADT is defined by valid operations and behavior.
- Algorithms are applications of the representation's operations.
- Linear search needs no ordering.
- Stack means LIFO; queue means FIFO.
- Bubble sort is simple but performs quadratic work.`
        ]
    },
    {
        id: 16,
        title: 'Recursive Decomposition in Practice',
        slides: [
            md`# Lecture 16: Recursive Decomposition in Practice
## Prove a smaller call reaches a base case`,
            md`## Trace the call stack

For <code>factorial(3)</code>:

1. <code>factorial(3)</code> waits for <code>factorial(2)</code>.
2. <code>factorial(2)</code> waits for <code>factorial(1)</code>.
3. The base case returns 1.
4. Waiting frames finish in reverse order.`,
            md`## State base case and progress together

~~~cpp
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
~~~

The argument decreases, so a non-negative input reaches the base case.`,
            md`## Reverse a linked list recursively

~~~cpp
Node* reverse(Node* head) {
    if (head == nullptr || head->next == nullptr) return head;
    Node* newHead = reverse(head->next);
    head->next->next = head;
    head->next = nullptr;
    return newHead;
}
~~~`,
            md`## Backtracking generates permutations

Choose one value for the current position, recursively arrange the remainder, then undo the choice.

The data structure is an array; recursion supplies the search order.`,
            md`## Reference: longest common subsequence

For two strings, an LCS recurrence compares their final characters and reduces one or both prefixes.

The direct recursive version repeats subproblems. Memoization stores results so identical states are solved once.`,
            md`## Account for time and space

- Recursive list reversal: O(n) time, O(n) call-stack space.
- Iterative reversal: O(n) time, O(1) auxiliary space.
- Permutation generation: at least proportional to the number of produced permutations.

Complexity describes growth, not stopwatch seconds.`,
            md`## Session summary

- A recursive call must receive a smaller problem.
- A base case handles the smallest problem directly.
- Stack frames consume space.
- Recursion can expose natural structure, while iteration may use less memory.`
        ]
    },
    {
        id: 17,
        title: 'Search Trees, Heaps & Sorting',
        slides: [
            md`# Lecture 17: Search Trees, Heaps & Sorting
## Preserve an invariant to obtain efficient operations`,
            md`## Binary search requires sorted data

~~~cpp
while (left <= right) {
    int middle = left + (right - left) / 2;
    if (values[middle] == target) return middle;
    if (values[middle] < target) left = middle + 1;
    else right = middle - 1;
}
~~~

Each comparison discards one impossible half.`,
            md`## A binary search tree stores the same ordering structurally

For every node:

- keys in the left subtree are smaller;
- keys in the right subtree are larger;
- both subtrees obey the same invariant.

Choose and document one policy for duplicate keys.`,
            md`## Insert by following the invariant

~~~cpp
struct Node { int key; Node* left; Node* right; };

Node* insert(Node* root, int key) {
    if (root == nullptr) return new Node{key, nullptr, nullptr};
    if (key < root->key) root->left = insert(root->left, key);
    else if (key > root->key) root->right = insert(root->right, key);
    return root;
}
~~~`,
            md`## A binary heap exposes the highest priority

A max heap is a complete binary tree where every parent is at least its children.

In a zero-based array, children of index <code>i</code> are <code>2*i+1</code> and <code>2*i+2</code>.`,
            md`## heapify restores heap order

~~~cpp
void heapify(std::vector<int>& a, int size, int root) {
    int largest = root;
    int left = 2 * root + 1, right = left + 1;
    if (left < size && a[left] > a[largest]) largest = left;
    if (right < size && a[right] > a[largest]) largest = right;
    if (largest != root) { std::swap(a[root], a[largest]); heapify(a, size, largest); }
}
~~~`,
            md`## Merge sort divides, solves, and combines

1. Divide the range into two halves.
2. Recursively sort each half.
3. Merge two sorted sequences into temporary storage.

Merge sort is stable and O(n log n); its array implementation uses additional storage. Heap sort is in-place but not stable.`,
            md`## Session summary

- Binary search exploits sorted-array order.
- A BST encodes ordering in links.
- A heap encodes priority in a complete tree.
- heapify repairs a local invariant.
- Merge sort applies recursive decomposition to sequences.`
        ]
    },
    {
        id: 18,
        title: 'Object Design & Value Semantics',
        slides: [
            md`# Lecture 18: Object Design & Value Semantics
## Protect invariants and make object lifetime predictable`,
            md`## A class combines state, behavior, and access control

~~~cpp
class Counter {
private:
    int value = 0;
public:
    void increment() { ++value; }
    int current() const { return value; }
};
~~~

The invariant is: <code>value</code> is modified only through the public interface.`,
            md`## Constructors establish valid state

~~~cpp
class Rectangle {
    double length;
    double width;
public:
    Rectangle(double l, double w) : length(l), width(w) {}
    double area() const { return length * width; }
};
~~~

Overloaded constructors may offer several distinct valid initialization paths.`,
            md`## Copy construction and assignment are different

~~~cpp
Rectangle first(4.0, 3.0);
Rectangle copied = first;  // copy construction: new object
Rectangle assigned(1.0, 1.0);
assigned = first;          // copy assignment: existing object
~~~

Value members such as numbers and strings usually support the Rule of Zero.`,
            md`## Destruction and RAII bind resource lifetime to an object

A destructor runs when an object's lifetime ends. RAII stores a resource in an owning object whose destructor releases it.

Prefer <code>std::string</code>, <code>std::vector</code>, and smart pointers over handwritten ownership and deep-copy code.`,
            md`## Reference: operators should preserve value meaning

Useful value-type operations include:

- <code>operator+</code> returning a new value;
- <code>operator==</code> comparing observable state;
- <code>operator&lt;&lt;</code> inserting into a stream;
- copy assignment safely replacing an existing value.

Do not change an operator's expected meaning.`,
            md`## A friend is narrow trusted access

~~~cpp
class Complex {
    double real, imaginary;
public:
    Complex(double r, double i) : real(r), imaginary(i) {}
    friend std::ostream& operator<<(std::ostream&, const Complex&);
};
~~~

Friendship is explicit access, not inheritance and not a security boundary.`,
            md`## Session summary

- A class should protect a meaningful invariant.
- Constructors initialize; assignment replaces an existing value.
- Destruction ends lifetime and releases owned resources.
- Prefer Rule-of-Zero member types.
- Overloads and friends must keep interfaces unsurprising.`
        ]
    },
    {
        id: 19,
        title: 'Friend Access & Inheritance Foundations',
        slides: [
            md`# Lecture 19: Friend Access & Inheritance Foundations
## Move from one value type to a justified is-a relationship`,
            md`## Friendship should remain exceptional

A friend function is a non-member granted access to private and protected members.

Use it for symmetric operations such as stream insertion when a normal public interface would be less clear.`,
            md`## Public inheritance means substitutability

If <code>ElectricCar</code> publicly inherits <code>Vehicle</code>, every operation promised by <code>Vehicle</code> must remain meaningful for <code>ElectricCar</code>.

This is an **is-a** relationship, not merely code reuse.`,
            md`## A class hierarchy is a dependency tree

~~~text
Vehicle
├── Bicycle
└── Car
    └── ElectricCar
~~~

The base owns common behavior; derived classes add or refine specialized behavior.`,
            md`## A small base and derived class

~~~cpp
class Vehicle {
public:
    int wheels() const { return 4; }
};

class ElectricCar : public Vehicle {
public:
    int batteryPercent() const { return 80; }
};
~~~`,
            md`## Construction proceeds base before derived

1. Base members are initialized.
2. The base constructor runs.
3. Derived members are initialized.
4. The derived constructor runs.

Destruction occurs in the reverse order.`,
            md`## Prefer composition for has-a relationships

A <code>Car</code> has an <code>Engine</code>; it is not an engine.

Composition usually exposes fewer dependencies and is easier to change. Inheritance is appropriate only when substitutability is defensible.`,
            md`## Session summary

- Friend access is narrow and explicit.
- Public inheritance models is-a and substitutability.
- A hierarchy shares a justified base abstraction.
- Base construction precedes derived construction.
- Prefer composition for has-a relationships.`
        ]
    },
    {
        id: 20,
        title: 'Inheritance & Runtime Polymorphism',
        slides: [
            md`# Lecture 20: Inheritance & Runtime Polymorphism
## Select behavior from the runtime object safely`,
            md`## Public and private inheritance make different promises

- Public inheritance preserves the base interface and models is-a.
- Private inheritance is an implementation technique and does not promise substitutability.

Composition is usually clearer than private inheritance.`,
            md`## Reference: multiple and virtual inheritance

Multiple inheritance gives one derived class more than one direct base.

In a diamond, virtual inheritance can share one common base subobject. Use these mechanisms only when the domain model genuinely requires them; they are not the starting point for polymorphism.`,
            md`## A virtual function enables dynamic dispatch

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
            md`## Own polymorphic objects safely

~~~cpp
std::vector<std::unique_ptr<Shape>> shapes;
shapes.push_back(std::make_unique<Square>(4.0));

double total = 0.0;
for (const auto& shape : shapes) total += shape->area();
~~~

The virtual destructor makes deletion through the base interface safe.`,
            md`## A factory centralizes concrete construction

~~~cpp
std::unique_ptr<Shape> makeSquare(double side) {
    return std::make_unique<Square>(side);
}
~~~

A factory returns an abstraction while choosing a concrete type in one place.`,
            md`## Test the substitutability contract

For every derived type, test:

- calls made through a base reference;
- cleanup through base ownership;
- invalid constructor inputs;
- behavior added by a new derived type without changing existing callers.`,
            md`## Session summary

- Public inheritance promises substitutability.
- Dynamic dispatch selects an override at runtime.
- Polymorphic bases need virtual destructors.
- Own derived objects with smart pointers.
- Factories separate construction choice from use.`
        ]
    },
    {
        id: 21,
        title: 'Polymorphic Data Structures',
        slides: [
            md`# Lecture 21: Polymorphic Data Structures
## Store varied behavior behind one safe interface`,
            md`## A heterogeneous container owns one base interface

~~~cpp
std::vector<std::unique_ptr<Shape>> shapes;
shapes.push_back(std::make_unique<Circle>(2.0));
shapes.push_back(std::make_unique<Square>(3.0));
~~~

Concrete types differ; ownership and the operation contract are uniform.`,
            md`## Algorithms use only the promised operation

~~~cpp
double totalArea(const std::vector<std::unique_ptr<Shape>>& shapes) {
    double total = 0.0;
    for (const auto& shape : shapes) total += shape->area();
    return total;
}
~~~

Adding a new shape does not change this traversal.`,
            md`## An object graph stores entities and relationships

~~~text
[Indore] --rail--> [Ujjain]
    |
   road
    v
[Dewas]
~~~

Vertices model entities; edges model relationships. The graph is a structure, not an external visualization service.`,
            md`## Choose graph storage from operations

- Adjacency list: store outgoing neighbors for each vertex.
- Edge list: store relationships as records.
- Matrix: direct pair lookup but quadratic storage.

Polymorphism is useful only when vertex or edge behavior genuinely varies.`,
            md`## Ownership must stay unambiguous

Let the graph own vertices and edges with smart pointers. Store non-owning IDs or indices for relationships when possible.

Avoid cycles of shared ownership; graph connectivity is not the same as memory ownership.`,
            md`## Extension exercise

Add a <code>WeightedEdge</code> with a cost and a <code>ScheduledEdge</code> with departure time.

Write one traversal that prints every edge through the base interface, then identify which operations do not require polymorphism.`,
            md`## Session summary

- Heterogeneous containers combine a base contract with safe ownership.
- Algorithms depend on operations, not concrete type names.
- Object graphs separate entities from relationships.
- Pick adjacency representation from required operations.
- Keep graph links separate from ownership links.`
        ]
    },
    {
        id: 22,
        title: 'Applied Object Systems',
        slides: [
            md`# Lecture 22: Applied Object Systems
## Compose domain objects, collections, and algorithms`,
            md`## Assign one responsibility to each component

- <code>Flight</code>: route, capacity, and availability invariant.
- <code>Passenger</code>: passenger identity and contact value.
- <code>Booking</code>: association between one passenger and one flight.
- <code>BookingSystem</code>: collection operations and policies.

High cohesion keeps each responsibility local.`,
            md`## A domain model names relationships

~~~cpp
struct Flight { std::string code; std::string from; std::string to; int seats; };
struct Passenger { std::string rollNumber; std::string name; };
struct Booking { std::size_t flightIndex; std::size_t passengerIndex; };
~~~

Indices express associations without ambiguous ownership.`,
            md`## Search applies a predicate to the collection

~~~cpp
auto matchesRoute = [&](const Flight& flight) {
    return flight.from == requestedFrom && flight.to == requestedTo;
};

auto result = std::find_if(flights.begin(), flights.end(), matchesRoute);
~~~

The lambda is a predicate: a callable returning true or false.`,
            md`## Sorting applies a comparator

~~~cpp
std::sort(flights.begin(), flights.end(),
    [](const Flight& a, const Flight& b) {
        return a.code < b.code;
    });
~~~

The comparator defines one consistent ordering relation.`,
            md`## Routing is a graph application

Airports are vertices and direct flights are edges. Route optimization selects a path according to hops, time, distance, or cost.

State the objective before choosing an algorithm.`,
            md`## Patterns separate policy from mechanism

- Factory: choose which concrete service object to create.
- Strategy: supply a pricing or ranking policy through an interface.

Use a design pattern only after the recurring responsibility problem is visible.`,
            md`## Session summary

- Domain classes represent entities, values, and associations.
- Collections expose search and sorting applications.
- Predicates select; comparators order.
- Routing applies graph structure to a stated objective.
- Patterns name reusable responsibility arrangements.`
        ]
    },
    {
        id: 23,
        title: 'Recursive & Polymorphic Capstones',
        slides: [
            md`# Lecture 23: Recursive & Polymorphic Capstones
## Select structures and algorithms for integrated problems`,
            md`## Begin with the required operation

| Application | Structure | Algorithmic idea |
|---|---|---|
| process decimal digits stably | buckets | radix passes |
| transform every tree node | binary tree | recursive traversal |
| multiply matrix blocks | matrices | recursive decomposition |
| vary legal behavior by piece | hierarchy | dynamic dispatch |`,
            md`## Block-recursive matrix multiplication

Split each matrix into four blocks, recursively multiply compatible block pairs, and add partial results.

The base case multiplies a sufficiently small block directly. A practical implementation must also handle dimensions that are not powers of two.`,
            md`## Radix sort applies stable buckets

For non-negative decimal integers:

1. distribute by the current digit;
2. collect buckets without changing equal-digit order;
3. move to the next digit.

The queue-like bucket structure supplies stable collection order.`,
            md`## Invert a binary tree

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
            md`## Chess applies runtime polymorphism

A base <code>Piece</code> promises legal-move generation. <code>Rook</code>, <code>Bishop</code>, and <code>Knight</code> implement different movement rules.

The board owns pieces; the caller asks through the common interface.`,
            md`## Integration checklist

Before implementation, identify:

- state and invariant;
- ownership and lifetime;
- required operations;
- base case or stopping condition;
- normal, boundary, and invalid tests;
- expected time and space growth.`,
            md`## Course summary

- Represent state with a structure whose operations match the problem.
- Apply algorithms through those operations.
- Preserve bounds, invariants, ownership, and progress.
- Use the dependency graph to revisit the earliest uncertain prerequisite.`
        ]
    }
];

function page({ id, title, slides }) {
    const sections = slides.map((slide) => `    <section data-markdown><textarea data-template>\n${slide.trim()}\n    </textarea></section>`).join('\n');
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
<script src="course-progress.js"></script>
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
<title>Mid-semester review · CS103</title></head><body><p>The review is now <a href="lecture12.html">Lecture 12 · Debugging & Assessment Debrief</a>.</p></body></html>\n`;
fs.writeFileSync(path.join(root, 'midsem-review.html'), reviewRedirect);

console.log(`Generated ${lectures.length} chronological lecture pages.`);
