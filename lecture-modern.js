(function () {
    'use strict';

    const extras = {
        1: {
            title: 'Travel-time estimator',
            context: 'Turn a familiar quantity problem into the input → process → output pattern used by every program.',
            code: `#include <iostream>

int main() {
    double distanceKm, speedKmph;
    std::cin >> distanceKm >> speedKmph;

    double travelHours = distanceKm / speedKmph;
    std::cout << "Estimated hours: " << travelHours << std::endl;
}`,
            takeaways: ['Inputs become named values.', 'The formula is the algorithm.', 'Output makes the result observable.'],
            problems: [
                'Read a temperature in Celsius and print the Fahrenheit equivalent.',
                'Read the length and width of a classroom and print area and perimeter.',
                'Read three quiz scores and print their arithmetic mean.',
                'Read seconds and express the duration as hours, minutes, and seconds.',
                'Write an IPO chart and C++ program for estimating simple interest.'
            ]
        },
        2: {
            title: 'Choose types for a sensor packet',
            context: 'A weather station mixes counts, precise measurements, status flags, and identifiers—each deserves an intentional type.',
            code: `#include <iostream>

int main() {
    int stationId = 2048;
    double temperature = 31.625;
    float humidity = 68.4f;
    bool batteryLow = false;
    char quality = 'A';

    std::cout << stationId << " " << temperature << " "
              << humidity << " " << quality << " " << batteryLow;
}`,
            takeaways: ['Range and precision guide type choice.', 'A type documents intent.', 'Narrow types are useful only when their limits are understood.'],
            problems: [
                'Choose types for roll number, CGPA, hostel block, and fee-paid status.',
                'Print the size and numeric limits of the fundamental arithmetic types.',
                'Demonstrate truncation when a double is converted to int.',
                'Compare signed and unsigned behavior near zero.',
                'Use const and auto to model the radius and area of a circle.'
            ]
        },
        3: {
            title: 'Update game state without leaking temporary names',
            context: 'A small block holds one reward calculation while the score remains available to the rest of the program.',
            code: `#include <iostream>

int main() {
    int score = 4;
    {
        int collectedReward = 3;
        score += collectedReward;
    }
    std::cout << score << std::endl;
}`,
            takeaways: ['Expressions transform program state.', 'Scope hides transition-only names.', 'The longer-lived score remains available afterward.'],
            problems: [
                'Trace local and global variables with the same name.',
                'Use one inner block for a temporary score update, then print the outer score.',
                'Place two variables with the same name in different namespaces and select both with ::.',
                'Evaluate five expressions involving arithmetic and logical precedence.',
                'Refactor a program to remove an unnecessary global variable.'
            ]
        },
        4: {
            title: 'Over-current protection controller',
            context: 'A controller must classify current readings and disconnect equipment only when the safety rule is satisfied.',
            code: `#include <iostream>

int main() {
    double current, safeLimit;
    bool emergencyStop;
    std::cin >> current >> safeLimit >> emergencyStop;

    if (emergencyStop || current > safeLimit) {
        std::cout << "TRIP: disconnect supply";
    } else if (current > 0.9 * safeLimit) {
        std::cout << "WARNING: near limit";
    } else {
        std::cout << "NORMAL";
    }
}`,
            takeaways: ['Order branches from exceptional to normal.', 'Short-circuiting expresses safety logic clearly.', 'Every boundary value needs a test.'],
            problems: [
                'Classify a temperature as freezing, safe, warm, or dangerous.',
                'Compute income tax using three progressive slabs.',
                'Use switch to implement a menu-driven unit converter.',
                'Validate whether three lengths can form a triangle and classify it.',
                'Design boundary tests for an elevator load controller.'
            ]
        },
        5: {
            title: 'Production-line quality scan',
            context: 'A loop processes repeated measurements, counts defects, and stops early if too many failures appear.',
            code: `#include <iostream>

int main() {
    int samples, defects = 0;
    std::cin >> samples;

    int i = 0;
    while (i < samples) {
        double diameter;
        std::cin >> diameter;
        if (diameter < 9.95 || diameter > 10.05) ++defects;
        if (defects >= 3) break;
        ++i;
    }
    std::cout << "Defects found: " << defects;
}`,
            takeaways: ['while repeats while a condition stays true.', 'A state update must move toward termination.', 'break is appropriate when the result is already known.'],
            problems: [
                'Read values until a sentinel and report minimum, maximum, and mean.',
                'Validate a positive password length using a do-while loop.',
                'Count down from an input value to zero with while.',
                'Keep asking for a temperature until it lies in a stated safe range.',
                'Trace and repair a while loop whose control variable never changes.'
            ]
        },
        6: {
            title: 'Find an anomalous temperature in a week',
            context: 'An array stores a fixed measurement window; one traversal computes the mean and locates the largest deviation.',
            code: `#include <array>
#include <cmath>
#include <iostream>

int main() {
    std::array<double, 7> t{31.2, 31.5, 37.8, 31.1, 30.9, 31.4, 31.0};
    double sum = 0;
    for (double value : t) sum += value;
    double mean = sum / t.size();

    std::size_t anomaly = 0;
    for (std::size_t i = 1; i < t.size(); ++i)
        if (std::abs(t[i] - mean) > std::abs(t[anomaly] - mean)) anomaly = i;

    std::cout << "Anomaly index: " << anomaly;
}`,
            takeaways: ['The structure makes a complete data window available.', 'Traversal applies one rule to every element.', 'Searching is an application of array access.'],
            problems: [
                'Rotate an array right by k positions without using another full array.',
                'Find the second-largest distinct value in an array.',
                'Reverse a fixed array in place.',
                'Count how many readings lie above the mean.',
                'Implement linear search on a fixed array and report the first matching index.'
            ]
        },
        7: {
            title: 'Travel estimate behind a function contract',
            context: 'The caller validates input, then a small function receives two values and returns one calculated result.',
            code: `#include <iostream>

double estimateTravel(double distanceKm, double speedKmph) {
    return distanceKm / speedKmph;
}

int main() {
    double distance = 420;
    double speed = 70;
    if (distance >= 0 && speed > 0)
        std::cout << "Travel time: " << estimateTravel(distance, speed) << " hours";
}`,
            takeaways: ['A function owns one clear responsibility.', 'Parameters are inputs to this contract.', 'The return value is the calculated output.'],
            problems: [
                'Write a function that returns the area of a rectangle.',
                'Write a function that converts Celsius to Fahrenheit.',
                'Write a boolean function that reports whether an integer is even.',
                'Refactor a unit converter so each conversion is a separate function.',
                'State the inputs, output, and precondition of a safe division function.'
            ]
        },
        8: {
            title: 'Represent and filter sensor records',
            context: 'A struct keeps each reading coherent; passing by const reference lets a function inspect records efficiently.',
            code: `#include <iostream>
#include <string>

struct Reading {
    std::string sensor;
    double value;
    bool valid;
};

void printIfValid(const Reading& r) {
    if (r.valid) std::cout << r.sensor << ": " << r.value << std::endl;
}

int main() {
    Reading sample{"pressure-2", 101.7, true};
    printIfValid(sample);
}`,
            takeaways: ['A struct models one domain record.', 'Member names replace parallel loose variables.', 'References avoid unnecessary record copies.'],
            problems: [
                'Model a book and sort an array of books by price.',
                'Calculate and print the padding of three alternate struct layouts.',
                'Update a student record through a pointer and the arrow operator.',
                'Use a lambda to filter employees above a salary threshold.',
                'Build a singly linked list node and insert at the front.'
            ]
        },
        9: {
            title: 'Ownership-safe linked sample log',
            context: 'Each node exclusively owns the next node, so the complete chain is released automatically.',
            code: `#include <iostream>
#include <memory>

struct Node {
    int sample;
    std::unique_ptr<Node> next;
};

int main() {
    auto head = std::make_unique<Node>();
    head->sample = 42;
    head->next = std::make_unique<Node>();
    head->next->sample = 57;
    for (Node* p = head.get(); p; p = p->next.get())
        std::cout << p->sample << " ";
}`,
            takeaways: ['Ownership determines who releases memory.', 'Links turn separate allocations into a structure.', 'Leaving scope releases the complete owned chain automatically.'],
            problems: [
                'Allocate an integer array dynamically and compute its median.',
                'Implement insert-at-end and delete-by-value for a linked list.',
                'Demonstrate and then repair a dangling-pointer bug.',
                'Rewrite a raw owning pointer with unique_ptr.',
                'Detect whether a linked list contains a cycle.'
            ]
        },
        10: {
            title: 'Dispatch print jobs with a queue',
            context: 'FIFO order is a property of the queue structure; the scheduling algorithm simply consumes that interface.',
            code: `#include <iostream>
#include <queue>
#include <string>

int main() {
    std::queue<std::string> jobs;
    jobs.push("report.pdf");
    jobs.push("diagram.png");
    jobs.push("notes.txt");

    while (!jobs.empty()) {
        std::cout << "Printing " << jobs.front() << std::endl;
        jobs.pop();
    }
}`,
            takeaways: ['The structure supplies the ordering guarantee.', 'The algorithm uses only front, push, and pop.', 'Choosing a structure simplifies the application.'],
            problems: [
                'Implement a stack using a fixed array and test overflow and underflow.',
                'Implement a circular queue using an array.',
                'Check balanced brackets using a stack.',
                'Use linear search to find all overdue jobs in an array.',
                'Sort student records by score using bubble sort and a comparator.'
            ]
        },
        11: {
            title: 'Prioritize emergency maintenance',
            context: 'A heap makes the highest-priority request available immediately while preserving efficient insertion.',
            code: `#include <iostream>
#include <queue>

int main() {
    std::priority_queue<int> severity;
    severity.push(2);
    severity.push(5);
    severity.push(3);
    std::cout << "Next severity: " << severity.top();
}`,
            takeaways: ['A heap encodes priority as a structural invariant.', 'The largest stored severity is exposed first.', 'The application inherits logarithmic insertion.'],
            problems: [
                'Implement iterative binary search and count comparisons.',
                'Insert, search, and print an inorder traversal of a BST.',
                'Build a min-heap without using priority_queue.',
                'Implement merge sort and measure its comparisons.',
                'Choose the best structure for a dictionary, task scheduler, and undo history.'
            ]
        },
        12: {
            title: 'Integrated rainfall analyzer',
            context: 'A compact program combines input validation, arrays, functions, and searching—the pre-mid-semester toolkit.',
            code: `#include <algorithm>
#include <iostream>
#include <vector>

double total(const std::vector<double>& rain) {
    double sum = 0;
    for (double value : rain) sum += value;
    return sum;
}

int main() {
    std::vector<double> rain{0, 4.2, 18.0, 2.1, 0, 7.5, 1.0};
    auto wettest = std::max_element(rain.begin(), rain.end());
    std::cout << total(rain) << " " << (wettest - rain.begin());
}`,
            takeaways: ['Small concepts compose into one solution.', 'A function separates calculation from orchestration.', 'The structure determines which algorithms are available.'],
            problems: [
                'Build a menu-driven student-score analyzer using functions.',
                'Read a matrix and report its saddle points.',
                'Process a sentence and count each vowel case-insensitively.',
                'Implement a queue of structs using dynamic nodes.',
                'Explain the time and space cost of your analyzer.'
            ]
        },
        13: {
            title: 'Debug a safe average function',
            context: 'Most exam bugs are contract violations: an empty range, a wrong bound, an uninitialized accumulator, or integer division.',
            code: `#include <cassert>
#include <vector>

bool average(const std::vector<int>& values, double& result) {
    if (values.empty()) return false;
    long long sum = 0;
    for (int value : values) sum += value;
    result = static_cast<double>(sum) / values.size();
    return true;
}

int main() {
    double result = 0.0;
    assert(average({1, 2}, result) && result == 1.5);
    assert(!average({}, result));
}`,
            takeaways: ['State preconditions explicitly.', 'Initialize every accumulator.', 'Test empty, one-element, and boundary cases.'],
            problems: [
                'Repair five off-by-one errors in supplied loop fragments.',
                'Write tests that expose integer division in an average function.',
                'Find and fix a null-pointer dereference in a list traversal.',
                'Explain assignment-versus-comparison and design a warning example.',
                'Create a ten-case test plan for binary search.'
            ]
        },
        14: {
            title: 'Validate an institute enrollment ID',
            context: 'A useful text rule combines string length, fixed prefixes, and character classification.',
            code: `#include <cctype>
#include <iostream>
#include <string>

bool validId(const std::string& id) {
    if (id.size() != 9 || id.substr(0, 2) != "BT") return false;
    for (std::size_t i = 2; i < id.size(); ++i)
        if (!std::isdigit(static_cast<unsigned char>(id[i]))) return false;
    return true;
}

int main() {
    std::cout << std::boolalpha << validId("BT2601034");
}`,
            takeaways: ['std::string owns and sizes text safely.', 'Validation is a sequence of explicit predicates.', 'cctype functions require careful character conversion.'],
            problems: [
                'Normalize a full name to title case while preserving spaces.',
                'Count words without using stringstream.',
                'Find every occurrence of a substring, including overlaps.',
                'Validate a password against four independent rules.',
                'Implement run-length encoding and decoding for a string.'
            ]
        },
        15: {
            title: 'Encapsulate a bank account',
            context: 'The class protects its invariant—balance cannot become negative—while constructors establish a valid starting state.',
            code: `#include <string>

class Account {
    std::string owner_;
    double balance_;
public:
    Account(const std::string& owner, double opening)
        : owner_(owner), balance_(0.0) {
        if (opening > 0.0) balance_ = opening;
    }
    bool withdraw(double amount) {
        if (amount <= 0 || amount > balance_) return false;
        balance_ -= amount;
        return true;
    }
    double balance() const { return balance_; }
};`,
            takeaways: ['A constructor establishes invariants.', 'Private state changes through controlled operations.', 'Methods express domain rules, not just setters.'],
            problems: [
                'Design a Temperature class that rejects values below absolute zero.',
                'Implement default, parameterized, and copy constructors for a Matrix class.',
                'Overload + and == for a Fraction class.',
                'Overload stream input and output for a Time value.',
                'Implement a dynamic Buffer class using the rule of three.'
            ]
        },
        16: {
            title: 'Calibrate inherited energy meters',
            context: 'A friend calibration function has one narrow privilege; a derived meter reuses the protected correction operation without introducing dynamic dispatch yet.',
            code: `#include <iostream>

class Meter {
    double offset_ = 0;
    friend void calibrate(Meter&, double);
protected:
    double corrected(double raw) const { return raw + offset_; }
public:
    double read(double raw) const { return corrected(raw); }
};

void calibrate(Meter& meter, double offset) { meter.offset_ = offset; }

class EnergyMeter : public Meter {
public:
    double kilowattHours(double raw) const { return corrected(raw); }
};`,
            takeaways: ['Inheritance reuses a stable base abstraction.', 'protected exposes only what derived classes need.', 'Friend access remains narrow and purposeful.'],
            problems: [
                'Build a Vehicle base class with Car and Bicycle specializations.',
                'Demonstrate public, protected, and private member accessibility.',
                'Use a friend function to compare private measurements from two objects.',
                'Explain why a polymorphic base class needs a virtual destructor.',
                'Refactor duplicated derived-class behavior into a base class.'
            ]
        },
        17: {
            title: 'Create notifications through one interface',
            context: 'A factory returns a base pointer; virtual dispatch selects the concrete notification without conditionals at the call site.',
            code: `#include <memory>
#include <string>

class Notifier {
public:
    virtual std::string send() const = 0;
    virtual ~Notifier() = default;
};
class Email : public Notifier {
public:
    std::string send() const override { return "email sent"; }
};

std::unique_ptr<Notifier> makeNotifier() {
    return std::make_unique<Email>();
}`,
            takeaways: ['The caller depends on an abstraction.', 'Virtual dispatch replaces type-switching.', 'The factory centralizes object creation.'],
            problems: [
                'Model a diamond hierarchy and resolve it using virtual inheritance.',
                'Compare public and private inheritance with a working example.',
                'Implement a Shape hierarchy and compute total area polymorphically.',
                'Create a factory that builds payment strategies from a code.',
                'Trace construction and destruction order in multiple inheritance.'
            ]
        },
        18: {
            title: 'Store heterogeneous shapes safely',
            context: 'A container of owning base pointers becomes an extensible data structure whose aggregation algorithm is independent of concrete types.',
            code: `#include <memory>
#include <vector>

class Shape {
public:
    virtual double area() const = 0;
    virtual ~Shape() = default;
};

double totalArea(const std::vector<std::unique_ptr<Shape>>& shapes) {
    double total = 0;
    for (const auto& shape : shapes) total += shape->area();
    return total;
}`,
            takeaways: ['Polymorphism lets one structure store varied behavior.', 'unique_ptr makes ownership explicit.', 'The aggregation algorithm depends only on the interface.'],
            problems: [
                'Implement Circle and Rectangle classes for the shape container.',
                'Create a polymorphic graph whose edges compute different travel costs.',
                'Write a deep-copy operation for a container of cloneable objects.',
                'Add a new shape without modifying the total-area algorithm.',
                'Compare a polymorphic container with std::variant for this problem.'
            ]
        },
        19: {
            title: 'Search and rank available flights',
            context: 'The object model supplies flight records; standard algorithms filter and rank those records for a real booking workflow.',
            code: `#include <algorithm>
#include <iostream>
#include <string>
#include <vector>

struct Flight { std::string code, from, to; double fare; };

int main() {
    std::vector<Flight> flights{{"AI1", "IDR", "DEL", 5100}, {"AI2", "IDR", "DEL", 4600}};
    std::sort(flights.begin(), flights.end(),
              [](const Flight& a, const Flight& b) { return a.fare < b.fare; });
    auto match = std::find_if(flights.begin(), flights.end(),
              [](const Flight& f) { return f.from == "IDR" && f.to == "DEL"; });
    if (match != flights.end()) std::cout << match->code << " " << match->fare;
}`,
            takeaways: ['Domain objects are the data structure’s elements.', 'Comparators encode a user-facing ranking rule.', 'Algorithms compose with the object model.'],
            problems: [
                'Design classes for passengers, flights, and bookings with clear ownership.',
                'Filter flights by route, date, and remaining capacity.',
                'Sort matching flights by fare and then departure time.',
                'Model airports as a graph and find a minimum-hop route.',
                'Apply one design pattern to make payment processing extensible.'
            ]
        },
        20: {
            title: 'Reverse a linked chain recursively',
            context: 'The recursive call solves the smaller tail; pointer rewiring makes the old head the new tail.',
            code: `struct Node { int value; Node* next; };

Node* reverse(Node* head) {
    if (!head || !head->next) return head;
    Node* newHead = reverse(head->next);
    head->next->next = head;
    head->next = nullptr;
    return newHead;
}`,
            takeaways: ['The base case handles an empty or one-node list.', 'The call stack remembers each old head.', 'The algorithm is meaningful because of the linked structure.'],
            problems: [
                'Trace recursive factorial and draw every stack frame.',
                'Generate all permutations of a string without duplicates.',
                'Compute the longest common subsequence recursively with memoization.',
                'Reverse a linked list iteratively and compare space use.',
                'Implement bucket sort for normalized decimal values.'
            ]
        },
        21: {
            title: 'Sort fixed-width institute IDs by digits',
            context: 'Radix sort exploits the digit structure of integer keys; the stable bucket pass is the algorithmic application.',
            code: `#include <array>
#include <vector>

void digitPass(std::vector<int>& values, int place) {
    std::array<std::vector<int>, 10> buckets;
    for (int value : values) buckets[(value / place) % 10].push_back(value);
    std::size_t out = 0;
    for (const auto& bucket : buckets)
        for (int value : bucket) values[out++] = value;
}`,
            takeaways: ['The key representation determines the buckets.', 'Stable passes preserve earlier digit order.', 'The array of vectors is the structure that makes the algorithm direct.'],
            problems: [
                'Complete LSD radix sort for non-negative integers.',
                'Extend radix sort to handle negative integers.',
                'Implement block-recursive multiplication for square matrices.',
                'Invert a binary tree recursively and iteratively.',
                'Design a ChessPiece hierarchy and generate legal moves polymorphically.'
            ]
        },
        22: {
            title: 'Print a multiplication table without guessing bounds',
            context: 'A counted loop names its start, continuation rule, and update in one place; the loop invariant explains what has already been printed.',
            code: `#include <iostream>

int main() {
    int number;
    std::cin >> number;
    for (int multiplier = 1; multiplier <= 10; ++multiplier) {
        std::cout << number << " × " << multiplier
                  << " = " << number * multiplier << '\\n';
    }
}`,
            takeaways: ['The counter has one clear valid range.', 'The update moves toward termination.', 'The invariant describes completed rows.'],
            problems: [
                'Print the first n odd numbers and their sum.',
                'Draw an r-by-c rectangle using nested loops.',
                'Trace a loop with <= changed to < and explain the difference.',
                'Rewrite a counted while loop as a for loop.',
                'Find and repair three non-terminating or off-by-one loops.'
            ]
        },
        23: {
            title: 'Return two results without global state',
            context: 'Input values are copied; output references name the caller’s existing variables. The contract makes both roles explicit.',
            code: `#include <iostream>

void orderPair(int first, int second, int& smaller, int& larger) {
    if (first <= second) {
        smaller = first;
        larger = second;
    } else {
        smaller = second;
        larger = first;
    }
}

int main() {
    int low = 0, high = 0;
    orderPair(17, 4, low, high);
    std::cout << low << " " << high << '\\n';
}`,
            takeaways: ['Parameter roles are visible at the interface.', 'References avoid hidden global state.', 'One function performs one testable job.'],
            problems: [
                'Write a function that swaps two integers through references.',
                'Overload absoluteValue for int and double.',
                'Split a bill calculator into input, calculation, and output functions.',
                'Compare a large read-only parameter by value and const reference.',
                'Write factorial recursively and identify its base case.'
            ]
        },
        24: {
            title: 'Summarize a classroom score matrix',
            context: 'A matrix needs one loop per dimension; a vector is useful when the number of stored values is known only at runtime.',
            code: `#include <iostream>
#include <vector>

int main() {
    std::vector<std::vector<int>> scores{{8, 7, 9}, {6, 10, 8}};
    for (std::size_t row = 0; row < scores.size(); ++row) {
        int total = 0;
        for (std::size_t col = 0; col < scores[row].size(); ++col)
            total += scores[row][col];
        std::cout << "row " << row << " total=" << total << '\\n';
    }
}`,
            takeaways: ['Each index stays within its own dimension.', 'size() supplies the actual bound.', 'The structure matches rows containing columns.'],
            problems: [
                'Compute every row sum and column sum of a matrix.',
                'Find the largest element and report its row and column.',
                'Read n values into a vector and compute their mean.',
                'Use at() to demonstrate checked access and handle failure.',
                'Choose array or vector for four stated storage requirements.'
            ]
        }
    };

    // The source examples predate the chronological 2026 numbering. Remap them
    // once so every injected application and practice set follows lecture1–23.
    const legacyExtras = { ...extras };
    const chronologicalExtraSources = {
        1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 22, 7: 7, 8: 23,
        9: 6, 10: 24, 11: 14, 12: 13, 13: 8, 14: 9, 15: 10,
        16: 20, 17: 11, 18: 15, 19: 16, 20: 17, 21: 18, 22: 19, 23: 21
    };
    Object.keys(extras).forEach((id) => delete extras[id]);
    Object.entries(chronologicalExtraSources).forEach(([lecture, source]) => {
        extras[lecture] = legacyExtras[source];
    });

    const progress = window.CS103Progress;
    const lectureId = progress ? progress.lectureIdFromPath(window.location.pathname) : Number((window.location.pathname.match(/lecture(\d+)/i) || [])[1]);
    const extra = extras[lectureId];
    if (!extra) return;

    const conceptTree = Array.isArray(window.CS103ConceptTree) ? window.CS103ConceptTree : [];
    const allConcepts = conceptTree.flatMap((phase) => phase.modules.flatMap((module) => module.concepts));
    const lectureConcepts = allConcepts.filter((concept) => concept.lecture === lectureId);
    const requestedConceptId = new URLSearchParams(window.location.search).get('concept');
    const requestedConcept = lectureConcepts.find((concept) => concept.id === requestedConceptId) || null;
    const lectureContext = (window.CS103LectureContexts && window.CS103LectureContexts[lectureId]) || null;
    const sessionPlan = (window.CS103SessionPlans && window.CS103SessionPlans[lectureId]) || null;
    const coreAuthoredSlides = sessionPlan ? new Set(sessionPlan) : null;
    let showReferenceSlides = new URLSearchParams(window.location.search).get('mode') === 'reference'
        || Boolean(requestedConcept && coreAuthoredSlides && !coreAuthoredSlides.has(requestedConcept.slide));
    const scheduleSession = window.CS103Schedule && window.CS103Schedule.sessions.find((session) => session.lectureId === lectureId);
    const themeStorageKey = 'cs103-theme';
    const embedded = window.self !== window.top;
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sequence = progress ? progress.lectureSequence : Object.keys(extras).map(Number).sort((a, b) => a - b).map((id) => ({ id, file: `lecture${id}.html`, title: extras[id].title }));
    const sequenceIndex = sequence.findIndex((lecture) => lecture.id === lectureId);
    const scheduledSequence = scheduleSession ? scheduleSession.sequence : Math.max(1, sequenceIndex + 1);
    const lectureMeta = sequence[sequenceIndex] || { title: `Lecture ${lectureId}` };
    const previousLecture = sequenceIndex > 0 ? sequence[sequenceIndex - 1] : null;
    const nextLecture = sequenceIndex >= 0 && sequenceIndex < sequence.length - 1 ? sequence[sequenceIndex + 1] : null;
    const revealElement = document.querySelector('.reveal');
    let practiceSlide;
    let practiceObserver;
    let revealReady = false;
    let deckPrepared = false;
    let readerMode = false;
    let scrollFrame = 0;
    let preparationTimer = 0;

    document.body.classList.add('course-modern');
    if (embedded) document.body.classList.add('course-embedded');

    function preferredTheme() {
        const saved = window.localStorage.getItem(themeStorageKey);
        if (saved === 'dark' || saved === 'light') return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme, persist = false) {
        const normalized = theme === 'dark' ? 'dark' : 'light';
        document.documentElement.dataset.courseTheme = normalized;
        document.documentElement.style.colorScheme = normalized;
        document.body.dataset.courseTheme = normalized;
        if (persist) window.localStorage.setItem(themeStorageKey, normalized);
        const button = document.getElementById('course-theme-button');
        if (button) {
            const next = normalized === 'dark' ? 'light' : 'dark';
            button.innerHTML = icon('theme', `${next === 'dark' ? 'Dark' : 'Light'} mode`);
            button.setAttribute('aria-label', `Use ${next} mode`);
            button.setAttribute('aria-pressed', String(normalized === 'dark'));
            button.title = `Use ${next} mode`;
        }
    }

    applyTheme(document.documentElement.dataset.courseTheme || preferredTheme());

    function icon(name, label) {
        const glyphs = { home: '⌂', previous: '←', next: '→', complete: '✓', graph: '◇', fullscreen: '⛶', theme: document.documentElement.dataset.courseTheme === 'dark' ? '☀' : '◐' };
        return `<span class="course-control-icon" aria-hidden="true">${glyphs[name]}</span><span class="course-control-label">${label}</span>`;
    }

    function createDeckBar() {
        if (!revealElement || revealElement.querySelector('.course-deck-bar')) return;
        const bar = document.createElement('nav');
        bar.className = 'course-deck-bar';
        bar.setAttribute('aria-label', 'Lecture and slide navigation');
        bar.innerHTML = `
            <a class="course-deck-home" href="index.html" aria-label="Course home">${icon('home', 'Course')}</a>
            <a class="course-lecture-prev${previousLecture ? '' : ' is-disabled'}" href="${previousLecture ? previousLecture.file : '#'}" aria-label="${previousLecture ? `Previous lecture: ${previousLecture.title}` : 'No previous lecture'}">${icon('previous', 'Lecture')}</a>
            <button class="course-slide-prev" id="course-slide-prev" type="button" aria-label="Previous slide">${icon('previous', 'Slide')}</button>
            <span class="course-deck-title"><small id="course-deck-location">Session ${String(scheduledSequence).padStart(2, '0')} · preparing</small><strong>${lectureMeta.title}</strong></span>
            <button class="course-slide-next" id="course-slide-next" type="button" aria-label="Next slide">${icon('next', 'Slide')}</button>
            <a class="course-lecture-next${nextLecture ? '' : ' is-disabled'}" href="${nextLecture ? nextLecture.file : '#'}" aria-label="${nextLecture ? `Next lecture: ${nextLecture.title}` : 'No next lecture'}">${icon('next', 'Lecture')}</a>
            <button class="deck-complete-button" id="deck-complete-button" type="button">${icon('complete', 'Mark studied')}</button>
            <a class="course-speedrun-link" href="speedrun.html">${icon('graph', 'Graph')}</a>
            <button class="course-theme-button" id="course-theme-button" type="button">${icon('theme', 'Theme')}</button>
            <button class="course-fullscreen-button" id="course-fullscreen-button" type="button">${icon('fullscreen', 'Full screen')}</button>
        `;
        revealElement.appendChild(bar);

        bar.querySelector('#deck-complete-button').addEventListener('click', () => {
            if (!progress) return;
            if (progress.isComplete(lectureId)) progress.markIncomplete(lectureId);
            else progress.markComplete(lectureId);
            updateProgressUI();
        });
        bar.querySelector('#course-slide-prev').addEventListener('click', () => navigateSlide(-1));
        bar.querySelector('#course-slide-next').addEventListener('click', () => navigateSlide(1));
        bar.querySelector('#course-theme-button').addEventListener('click', () => applyTheme(document.documentElement.dataset.courseTheme === 'dark' ? 'light' : 'dark', true));
        bar.querySelector('#course-fullscreen-button').addEventListener('click', toggleFullscreen);
        applyTheme(document.documentElement.dataset.courseTheme || preferredTheme());

        const fullscreenSupported = Boolean(revealElement.requestFullscreen || revealElement.webkitRequestFullscreen);
        if (!fullscreenSupported) bar.querySelector('#course-fullscreen-button').hidden = true;
    }

    function authoredLeafSlides() {
        return leafSlides().filter((section) => !section.matches('.course-extra-slide, [data-course-context], [data-course-continuation]'));
    }

    function annotateAuthoredSlides() {
        authoredLeafSlides().forEach((section, index) => {
            section.dataset.courseAuthoredSlide = String(index + 1);
        });
    }

    function createNoviceOnboardingSlides() {
        if (lectureId !== 1) return [];
        const start = document.createElement('section');
        start.className = 'course-extra-slide course-novice-slide';
        start.innerHTML = `
            <span class="course-extra-kicker">Start here · no prior computer use assumed</span>
            <h2>Turn on, sign in, and get oriented.</h2>
            <ol class="course-novice-steps">
                <li><strong>Power:</strong> press the computer’s power button once and wait.</li>
                <li><strong>Sign in:</strong> ask the instructor or TA if the machine requests credentials you do not have.</li>
                <li><strong>Pointer:</strong> move the mouse; single-click selects, double-click opens.</li>
                <li><strong>Keyboard:</strong> use Backspace to remove text and Enter to confirm a command.</li>
                <li><strong>Ask early:</strong> nothing here is assumed knowledge, and getting stuck is normal.</li>
            </ol>`;
        const screen = document.createElement('section');
        screen.className = 'course-extra-slide course-novice-slide';
        screen.innerHTML = `
            <span class="course-extra-kicker">Digital basics</span>
            <h2>Five objects you will use today.</h2>
            <div class="course-novice-grid">
                <article><strong>Window</strong><span>A rectangular area belonging to one application.</span></article>
                <article><strong>Browser</strong><span>The application used to open this course website.</span></article>
                <article><strong>File</strong><span>A named unit of saved information such as <code>hello.cpp</code>.</span></article>
                <article><strong>Folder</strong><span>A container used to organize files.</span></article>
                <article><strong>Terminal</strong><span>A text interface where commands such as <code>g++</code> are entered.</span></article>
            </div>`;
        return [start, screen];
    }

    function injectNoviceOnboardingSlides() {
        const first = authoredLeafSlides()[0];
        if (!first) return;
        let after = first;
        createNoviceOnboardingSlides().forEach((slide) => {
            after.after(slide);
            after = slide;
        });
    }

    function markReferenceSlides() {
        if (!coreAuthoredSlides) return;
        document.querySelectorAll('[data-course-authored-slide]').forEach((section) => {
            const core = coreAuthoredSlides.has(Number(section.dataset.courseAuthoredSlide));
            section.classList.toggle('course-reference-slide', !core);
            if (!core) section.dataset.courseReference = 'true';
        });
    }

    function updateReferenceButton() {
        const button = document.getElementById('course-reference-toggle');
        if (!button) return;
        button.textContent = showReferenceSlides ? 'Use 55-minute core' : 'Show reference slides';
        button.setAttribute('aria-pressed', String(showReferenceSlides));
    }

    function setReferenceVisibility(show) {
        showReferenceSlides = Boolean(show);
        document.body.classList.toggle('course-show-reference', showReferenceSlides);
        document.body.classList.toggle('course-core-session', !showReferenceSlides);
        document.querySelectorAll('.course-reference-slide').forEach((section) => {
            section.hidden = !showReferenceSlides;
            if (!showReferenceSlides) {
                section.setAttribute('data-visibility', 'hidden');
                section.setAttribute('aria-hidden', 'true');
            } else {
                section.removeAttribute('data-visibility');
                section.removeAttribute('aria-hidden');
            }
        });
        updateReferenceButton();
        if (!window.Reveal || !revealReady) return;
        if (showReferenceSlides) paginateDeck();
        window.Reveal.sync();
        window.Reveal.layout();
        updateSlideUI(currentSlide());
    }

    function checkpointQuestions() {
        const terms = lectureConcepts.map((concept) => concept.term);
        const outcomes = lectureContext ? lectureContext.outcomes : [];
        const firstTerm = terms[0] || lectureMeta.title;
        const secondTerm = terms[1] || firstTerm;
        const lastTerm = terms[terms.length - 1] || firstTerm;
        return [
            `Without looking at the definition, explain “${firstTerm}” in one sentence.`,
            firstTerm === secondTerm
                ? `What must be true before you can use today’s main idea safely?`
                : `How is “${secondTerm}” connected to “${firstTerm}”?`,
            `Before running the practical example “${extra.title}”, predict its first observable result.`,
            `Name one normal case, one boundary case, and one invalid case for today’s code.`,
            outcomes[0]
                ? `Can you now do this outcome without notes: “${outcomes[0]}”? Explain your next step.`
                : `When would you choose “${lastTerm}” in a new problem, and when would you avoid it?`
        ];
    }

    function createCheckpointSlide(question, index) {
        const minute = (index + 1) * 10;
        const section = document.createElement('section');
        section.className = 'course-extra-slide course-checkpoint-slide';
        section.dataset.courseMinute = String(minute);
        section.innerHTML = `
            <span class="course-extra-kicker">Minute ${minute} · Checkpoint ${index + 1} of 5</span>
            <h2>${question}</h2>
            <div class="course-checkpoint-routine">
                <span><strong>Think</strong> 30 seconds</span>
                <span><strong>Pair</strong> compare reasoning</span>
                <span><strong>Share</strong> one precise sentence</span>
            </div>
            <p>Predict or explain first. Run code only after committing to an answer.</p>`;
        return section;
    }

    function injectCheckpoints() {
        if (document.querySelector('[data-course-minute]')) return;
        const coreSlides = Array.from(document.querySelectorAll('[data-course-authored-slide]'))
            .filter((slide) => !slide.classList.contains('course-reference-slide'));
        if (!coreSlides.length) return;
        const questions = checkpointQuestions();
        questions.forEach((question, index) => {
            const anchorIndex = Math.min(coreSlides.length - 1, Math.ceil(((index + 1) * coreSlides.length) / questions.length) - 1);
            coreSlides[anchorIndex].after(createCheckpointSlide(question, index));
        });
    }

    function decorateConceptSlides() {
        const bySlide = new Map();
        lectureConcepts.forEach((concept) => {
            if (!bySlide.has(concept.slide)) bySlide.set(concept.slide, []);
            bySlide.get(concept.slide).push(concept);
        });
        bySlide.forEach((concepts, slide) => {
            const section = document.querySelector(`[data-course-authored-slide="${slide}"]`);
            if (!section || section.querySelector('.course-slide-reference')) return;
            const badge = document.createElement('div');
            badge.className = 'course-slide-reference';
            badge.setAttribute('aria-label', `Concept reference ${concepts[0].reference}`);
            badge.title = concepts.map((concept) => concept.title).join(' · ');
            badge.innerHTML = `<strong>${concepts[0].reference}</strong><span>${concepts.length} concept${concepts.length === 1 ? '' : 's'}</span>`;
            section.prepend(badge);
        });
    }

    function termPattern(value) {
        const escaped = String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return new RegExp(`(?<![\\p{L}\\p{N}_])${escaped}(?![\\p{L}\\p{N}_])`, 'iu');
    }

    function makeDefinedTerm(text, concept) {
        const term = document.createElement('dfn');
        const tooltip = document.createElement('span');
        const tooltipId = `definition-${concept.id}`;
        term.className = 'course-defined-term';
        term.tabIndex = 0;
        term.dataset.concept = concept.id;
        term.setAttribute('aria-describedby', tooltipId);
        term.append(document.createTextNode(text));
        tooltip.className = 'course-term-tooltip';
        tooltip.id = tooltipId;
        tooltip.setAttribute('role', 'tooltip');
        tooltip.textContent = concept.definition;
        term.appendChild(tooltip);
        return term;
    }

    function wrapFirstTechnicalTerm(section, concept) {
        const aliases = [concept.term, ...(concept.aliases || [])]
            .filter(Boolean)
            .sort((left, right) => right.length - left.length);
        const walker = document.createTreeWalker(section, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
                const parent = node.parentElement;
                if (!parent || parent.closest('pre, code, a, script, style, textarea, dfn, .course-slide-reference, .course-glossary-introductions')) return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            }
        });
        const textNodes = [];
        while (walker.nextNode()) textNodes.push(walker.currentNode);

        for (const alias of aliases) {
            const pattern = termPattern(alias);
            for (const textNode of textNodes) {
                const match = pattern.exec(textNode.nodeValue);
                if (!match) continue;
                const before = textNode.nodeValue.slice(0, match.index);
                const matched = textNode.nodeValue.slice(match.index, match.index + match[0].length);
                const after = textNode.nodeValue.slice(match.index + match[0].length);
                const fragment = document.createDocumentFragment();
                if (before) fragment.appendChild(document.createTextNode(before));
                fragment.appendChild(makeDefinedTerm(matched, concept));
                if (after) fragment.appendChild(document.createTextNode(after));
                textNode.replaceWith(fragment);
                return true;
            }
        }
        return false;
    }

    function decorateTechnicalTerms() {
        const conceptsBySlide = new Map();
        lectureConcepts.forEach((concept) => {
            if (!conceptsBySlide.has(concept.slide)) conceptsBySlide.set(concept.slide, []);
            conceptsBySlide.get(concept.slide).push(concept);
        });
        conceptsBySlide.forEach((concepts, slide) => {
            const section = document.querySelector(`[data-course-authored-slide="${slide}"]`);
            if (!section) return;
            const fallback = concepts.filter((concept) => !wrapFirstTechnicalTerm(section, concept));
            if (!fallback.length) return;
            const introductions = document.createElement('aside');
            introductions.className = 'course-glossary-introductions';
            introductions.setAttribute('aria-label', 'Technical terms introduced on this slide');
            const label = document.createElement('span');
            label.textContent = 'New terms';
            introductions.appendChild(label);
            fallback.forEach((concept) => introductions.appendChild(makeDefinedTerm(concept.term, concept)));
            section.appendChild(introductions);
        });

        const supplemental = Array.isArray(window.CS103SupplementalGlossary)
            ? window.CS103SupplementalGlossary.filter((entry) => entry.lecture === lectureId)
            : [];
        // Supporting vocabulary can first appear in generated onboarding,
        // learning-path, checkpoint, or practical-example slides. Walk the
        // complete rendered deck in reading order so the first visible use—not
        // merely the first authored Markdown use—receives the definition.
        const orderedSlides = leafSlides();
        supplemental.forEach((entry) => {
            for (const section of orderedSlides) {
                if (wrapFirstTechnicalTerm(section, entry)) break;
            }
        });
    }

    function focusRequestedConcept() {
        if (!requestedConcept || !window.Reveal) return;
        const target = document.querySelector(`[data-course-authored-slide="${requestedConcept.slide}"]`);
        if (!target) return;
        target.classList.add('course-requested-concept');
        if (readerMode) {
            target.scrollIntoView({ behavior: reduceMotionQuery.matches ? 'auto' : 'smooth', block: 'start' });
            updateSlideUI(target);
            return;
        }
        const indices = window.Reveal.getIndices(target);
        if (indices) window.Reveal.slide(indices.h, indices.v, indices.f);
    }

    function createExampleSlide() {
        const section = document.createElement('section');
        section.className = 'course-extra-slide practical-example-slide';

        const kicker = document.createElement('span');
        kicker.className = 'course-extra-kicker';
        kicker.textContent = 'Practical application';

        const heading = document.createElement('h2');
        heading.textContent = extra.title;

        const layout = document.createElement('div');
        layout.className = 'practical-example-layout';

        const copy = document.createElement('div');
        copy.className = 'practical-example-copy';
        const paragraph = document.createElement('p');
        paragraph.textContent = extra.context;
        const list = document.createElement('ul');
        extra.takeaways.forEach((takeaway) => {
            const item = document.createElement('li');
            item.textContent = takeaway;
            list.appendChild(item);
        });
        copy.append(paragraph, list);

        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.className = 'language-cpp';
        code.textContent = extra.code;
        pre.appendChild(code);
        layout.append(copy, pre);
        section.append(kicker, heading, layout);
        return section;
    }

    function createPracticeSlide() {
        const section = document.createElement('section');
        section.className = 'course-extra-slide lab-practice-slide';
        section.setAttribute('data-course-practice', String(lectureId));

        const kicker = document.createElement('span');
        kicker.className = 'course-extra-kicker';
        kicker.textContent = 'IC151 · Lab practice';

        const heading = document.createElement('h2');
        heading.textContent = 'Practice set · 5 problems';

        const list = document.createElement('ol');
        list.className = 'lab-practice-list';
        extra.problems.forEach((problem) => {
            const item = document.createElement('li');
            item.textContent = problem;
            list.appendChild(item);
        });

        const note = document.createElement('p');
        note.className = 'practice-complete-note';
        note.append('Reaching this set marks the lecture as studied in this browser. ', Object.assign(document.createElement('a'), { href: 'ic151.html', textContent: 'Open the IC151 lab setup and batch schedule.' }));
        section.append(kicker, heading, list, note);
        return section;
    }

    function createNavigationSlide() {
        const section = document.createElement('section');
        section.className = 'course-extra-slide course-navigation-slide';
        section.setAttribute('data-course-navigation', String(lectureId));

        const kicker = document.createElement('span');
        kicker.className = 'course-extra-kicker';
        kicker.textContent = 'Course navigation';

        const heading = document.createElement('h2');
        heading.textContent = nextLecture ? 'Continue the sequence.' : 'Course sequence complete.';

        const navigation = document.createElement('nav');
        navigation.className = 'lecture-end-nav';
        navigation.setAttribute('aria-label', 'End of lecture navigation');
        navigation.innerHTML = `
            ${previousLecture ? `<a href="${previousLecture.file}"><span>← Previous</span><strong>${previousLecture.title}</strong></a>` : '<span class="is-disabled">No previous lecture</span>'}
            ${nextLecture ? `<a href="${nextLecture.file}"><span>Next →</span><strong>${nextLecture.title}</strong></a>` : '<span class="is-disabled">No next lecture</span>'}
            <a href="index.html"><span>Course home</span><strong>Schedule & assessment</strong></a>
            <a href="speedrun.html"><span>Dependency graph</span><strong>Review prerequisites</strong></a>
        `;
        section.append(kicker, heading, navigation);
        return section;
    }

    function injectExtraSlides() {
        const slides = document.querySelector('.reveal .slides');
        if (!slides || slides.querySelector('[data-course-practice]')) return;

        const exampleSlide = createExampleSlide();
        practiceSlide = createPracticeSlide();
        const lastSlide = slides.lastElementChild;
        const isNavigation = lastSlide && /back to course outline|navigation/i.test(lastSlide.textContent || '');
        if (isNavigation) lastSlide.remove();
        const midSessionCheckpoint = slides.querySelector('[data-course-minute="30"]');
        if (midSessionCheckpoint) midSessionCheckpoint.after(exampleSlide);
        else slides.appendChild(exampleSlide);
        slides.append(practiceSlide, createNavigationSlide());

        if (window.hljs) {
            const code = exampleSlide.querySelector('code');
            try { window.hljs.highlightElement(code); } catch (error) { /* Highlighting is optional. */ }
        }
    }

    function updateProgressUI() {
        if (!progress) return;
        const summary = progress.getSummary();
        const completeButton = document.getElementById('deck-complete-button');
        const complete = progress.isComplete(lectureId);
        if (completeButton) {
            completeButton.innerHTML = icon('complete', complete ? `Studied ${summary.completedCount}/${summary.total}` : `Study ${summary.completedCount}/${summary.total}`);
            completeButton.classList.toggle('is-complete', complete);
            completeButton.setAttribute('aria-pressed', String(complete));
            completeButton.setAttribute('aria-label', complete ? 'Mark this lecture not studied' : 'Mark this lecture studied');
        }
    }

    function markCompleteFromPractice() {
        if (progress && !progress.isComplete(lectureId)) progress.markComplete(lectureId);
        updateProgressUI();
    }

    function insertTextAtCaret(text) {
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const node = document.createTextNode(text);
        range.insertNode(node);
        range.setStartAfter(node);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    function caretOffset(element) {
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount || !element.contains(selection.anchorNode)) return element.textContent.length;
        const range = selection.getRangeAt(0).cloneRange();
        range.selectNodeContents(element);
        range.setEnd(selection.anchorNode, selection.anchorOffset);
        return range.toString().length;
    }

    function placeCaret(element, offset) {
        element.focus({ preventScroll: true });
        const node = element.firstChild || element.appendChild(document.createTextNode(''));
        const range = document.createRange();
        const selection = window.getSelection();
        range.setStart(node, Math.min(offset, node.textContent.length));
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    function enhanceCodeBlock(pre, editorIndex) {
        const code = pre.querySelector(':scope > code');
        if (!code || pre.closest('.course-code-editor')) return;
        const original = code.textContent.replace(/^\n/, '').replace(/\n\s*$/, '');
        const originalLines = original.split('\n');
        const languageClass = Array.from(code.classList).find((name) => /^(language-|lang-|cpp$|c\+\+$)/i.test(name));
        const language = languageClass ? languageClass.replace(/^(language-|lang-)/i, '').toUpperCase() : 'CODE';
        const editor = document.createElement('div');
        editor.className = 'course-code-editor';
        Array.from(pre.classList).forEach((className) => editor.classList.add(className));
        Array.from(pre.attributes).forEach((attribute) => {
            if (attribute.name.startsWith('data-') && attribute.name !== 'data-course-code-editor') editor.setAttribute(attribute.name, attribute.value);
        });
        editor.dataset.courseCodeEditor = String(editorIndex);
        editor.setAttribute('role', 'group');
        editor.setAttribute('aria-label', `${language} editable focus viewer`);
        editor.innerHTML = `
            <div class="course-code-toolbar">
                <strong>${language} focus editor</strong>
                <span>Click or use ↑ ↓ to magnify a line</span>
                <button class="course-code-copy" type="button">Copy</button>
                <button class="course-code-reset" type="button">Reset</button>
            </div>
            <div class="course-code-viewport" tabindex="0" aria-label="Scrollable code"></div>
        `;
        const viewport = editor.querySelector('.course-code-viewport');

        function lineElements() {
            return Array.from(viewport.querySelectorAll('.course-code-line'));
        }

        function renumber() {
            lineElements().forEach((line, index) => {
                line.dataset.line = String(index);
                line.querySelector('.course-code-line-number').textContent = String(index + 1);
                line.querySelector('.course-code-line-text').setAttribute('aria-label', `Code line ${index + 1}`);
            });
        }

        function createLine(text) {
            const line = document.createElement('div');
            line.className = 'course-code-line';
            const number = document.createElement('span');
            number.className = 'course-code-line-number';
            number.setAttribute('aria-hidden', 'true');
            const editable = document.createElement('span');
            editable.className = 'course-code-line-text';
            editable.setAttribute('contenteditable', 'plaintext-only');
            editable.setAttribute('spellcheck', 'false');
            editable.setAttribute('autocapitalize', 'off');
            editable.setAttribute('role', 'textbox');
            editable.textContent = text || '';
            line.append(number, editable);
            return line;
        }

        function focusLine(index, shouldScroll) {
            const lines = lineElements();
            const clamped = Math.max(0, Math.min(index, lines.length - 1));
            lines.forEach((line, lineIndex) => {
                const distance = Math.abs(lineIndex - clamped);
                line.classList.toggle('is-active', distance === 0);
                line.classList.toggle('is-near', distance > 0 && distance <= 1);
            });
            if (shouldScroll !== false && lines[clamped]) {
                const top = lines[clamped].offsetTop - viewport.clientHeight / 2 + lines[clamped].offsetHeight / 2;
                viewport.scrollTo({ top: Math.max(0, top), behavior: reduceMotionQuery.matches ? 'auto' : 'smooth' });
            }
        }

        function restore() {
            viewport.replaceChildren(...originalLines.map(createLine));
            renumber();
            focusLine(0, false);
        }

        viewport.addEventListener('focusin', (event) => {
            const line = event.target.closest('.course-code-line');
            if (line) focusLine(Number(line.dataset.line));
        });
        viewport.addEventListener('pointerdown', (event) => {
            const line = event.target.closest('.course-code-line');
            if (line) focusLine(Number(line.dataset.line));
        });
        viewport.addEventListener('keydown', (event) => {
            const editable = event.target.closest('.course-code-line-text');
            if (!editable) return;
            const line = editable.closest('.course-code-line');
            const index = Number(line.dataset.line);
            const lines = lineElements();
            if (event.key === 'Tab') {
                event.preventDefault();
                insertTextAtCaret('    ');
            } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                event.preventDefault();
                const targetIndex = Math.max(0, Math.min(lines.length - 1, index + (event.key === 'ArrowUp' ? -1 : 1)));
                const target = lines[targetIndex].querySelector('.course-code-line-text');
                placeCaret(target, Math.min(caretOffset(editable), target.textContent.length));
                focusLine(targetIndex);
            } else if (event.key === 'Enter') {
                event.preventDefault();
                const offset = caretOffset(editable);
                const value = editable.textContent;
                editable.textContent = value.slice(0, offset);
                const newLine = createLine(value.slice(offset));
                line.after(newLine);
                renumber();
                placeCaret(newLine.querySelector('.course-code-line-text'), 0);
                focusLine(index + 1);
            } else if (event.key === 'Backspace' && caretOffset(editable) === 0 && index > 0) {
                event.preventDefault();
                const previous = lines[index - 1].querySelector('.course-code-line-text');
                const previousLength = previous.textContent.length;
                previous.textContent += editable.textContent;
                line.remove();
                renumber();
                placeCaret(previous, previousLength);
                focusLine(index - 1);
            }
        });
        editor.querySelector('.course-code-copy').addEventListener('click', async (event) => {
            const value = lineElements().map((line) => line.querySelector('.course-code-line-text').textContent).join('\n');
            try {
                await navigator.clipboard.writeText(value);
                event.currentTarget.textContent = 'Copied';
                window.setTimeout(() => { event.currentTarget.textContent = 'Copy'; }, 1200);
            } catch (error) {
                console.warn('Clipboard access was unavailable.', error);
            }
        });
        editor.querySelector('.course-code-reset').addEventListener('click', restore);
        restore();
        pre.replaceWith(editor);
    }

    function enhanceCodeBlocks() {
        Array.from(document.querySelectorAll('.reveal .slides pre > code')).forEach((code, index) => enhanceCodeBlock(code.parentElement, index));
    }

    function leafSlides() {
        return Array.from(document.querySelectorAll('.reveal .slides section')).filter((section) => {
            const leaf = !Array.from(section.children).some((child) => child.tagName === 'SECTION');
            const visibleReference = showReferenceSlides || !section.classList.contains('course-reference-slide');
            return leaf && visibleReference;
        });
    }

    function createMeasureStage() {
        let stage = document.querySelector('.course-measure-stage');
        if (stage) return stage;
        stage = document.createElement('div');
        stage.className = 'reveal course-measure-stage';
        stage.setAttribute('aria-hidden', 'true');
        stage.innerHTML = '<div class="slides"></div>';
        document.body.appendChild(stage);
        return stage;
    }

    function measureSlide(section) {
        const stage = createMeasureStage();
        const host = stage.querySelector('.slides');
        const clone = section.cloneNode(true);
        clone.classList.remove('present', 'past', 'future');
        clone.removeAttribute('hidden');
        clone.removeAttribute('aria-hidden');
        host.replaceChildren(clone);
        const measurement = {
            fits: clone.scrollHeight <= clone.clientHeight + 2 && clone.scrollWidth <= clone.clientWidth + 2,
            height: clone.scrollHeight,
            width: clone.scrollWidth
        };
        host.replaceChildren();
        return measurement;
    }

    function directHeading(section) {
        return Array.from(section.children).find((child) => /^H[1-3]$/.test(child.tagName));
    }

    function pageContentCount(section) {
        return Array.from(section.children).filter((child) => !child.matches('h1, h2, h3, .course-extra-kicker, .course-continuation-label, aside.notes, script, style')).length;
    }

    function createContinuation(source, sourceHeading, after, part) {
        const continuation = document.createElement('section');
        Array.from(source.attributes).forEach((attribute) => {
            if (!['id', 'class', 'style', 'data-markdown', 'hidden', 'aria-hidden'].includes(attribute.name)) continuation.setAttribute(attribute.name, attribute.value);
        });
        Array.from(source.classList).filter((name) => !['present', 'past', 'future', 'stack'].includes(name)).forEach((name) => continuation.classList.add(name));
        continuation.classList.add('course-continuation-slide');
        continuation.dataset.courseContinuation = String(part);
        const label = document.createElement('span');
        label.className = 'course-continuation-label';
        label.textContent = `Part ${part}`;
        const heading = document.createElement(sourceHeading ? sourceHeading.tagName : 'h2');
        heading.textContent = `${sourceHeading ? sourceHeading.textContent.replace(/\s+· continued.*$/i, '') : lectureMeta.title} · continued`;
        continuation.append(label, heading);
        after.after(continuation);
        return continuation;
    }

    function splitList(block, current, nextPage) {
        const items = Array.from(block.children);
        if (!items.length) return null;
        const ordered = block.tagName === 'OL';
        const initialStart = Number(block.getAttribute('start') || 1);
        let consumed = 0;
        let list = block.cloneNode(false);
        list.replaceChildren();
        current.appendChild(list);
        items.forEach((item) => {
            list.appendChild(item);
            if (!measureSlide(current).fits && list.children.length > 1) {
                item.remove();
                current = nextPage(current);
                list = block.cloneNode(false);
                list.replaceChildren();
                if (ordered) list.setAttribute('start', String(initialStart + consumed));
                current.appendChild(list);
                list.appendChild(item);
            }
            consumed += 1;
        });
        return current;
    }

    function splitTable(block, current, nextPage) {
        const rows = Array.from(block.querySelectorAll('tbody > tr'));
        if (rows.length < 2) return null;
        const makeTable = () => {
            const table = block.cloneNode(false);
            const caption = block.querySelector(':scope > caption');
            const head = block.querySelector(':scope > thead');
            if (caption) table.appendChild(caption.cloneNode(true));
            if (head) table.appendChild(head.cloneNode(true));
            table.appendChild(document.createElement('tbody'));
            return table;
        };
        let table = makeTable();
        current.appendChild(table);
        rows.forEach((row) => {
            table.tBodies[0].appendChild(row);
            if (!measureSlide(current).fits && table.tBodies[0].rows.length > 1) {
                row.remove();
                current = nextPage(current);
                table = makeTable();
                current.appendChild(table);
                table.tBodies[0].appendChild(row);
            }
        });
        return current;
    }

    function splitContainer(block, current, nextPage) {
        const children = Array.from(block.children);
        const interactive = block.matches('[id], form') || block.querySelector('canvas, svg, form, script, style, [contenteditable], [id]');
        if (children.length < 2 || interactive) return null;
        let shell = block.cloneNode(false);
        shell.replaceChildren();
        current.appendChild(shell);
        children.forEach((child) => {
            shell.appendChild(child);
            if (!measureSlide(current).fits && shell.children.length > 1) {
                child.remove();
                current = nextPage(current);
                shell = block.cloneNode(false);
                shell.replaceChildren();
                current.appendChild(shell);
                shell.appendChild(child);
            }
        });
        return current;
    }

    function splitBlock(block, current, nextPage) {
        if (block.matches('ul, ol')) return splitList(block, current, nextPage);
        if (block.matches('table')) return splitTable(block, current, nextPage);
        if (block.matches('div, article, main')) return splitContainer(block, current, nextPage);
        return null;
    }

    function paginateSlide(section) {
        const heading = directHeading(section);
        const directChildren = Array.from(section.children);
        const headingIndex = heading ? directChildren.indexOf(heading) : -1;
        const movable = directChildren.filter((child, index) => index > headingIndex && !child.matches('aside.notes, script, style'));
        if (!movable.length) {
            section.classList.add('course-slide-dense');
            if (!measureSlide(section).fits) section.classList.add('course-slide-ultra-dense');
            return;
        }

        movable.forEach((child) => child.remove());
        let current = section;
        let part = 2;
        const nextPage = (after) => createContinuation(section, heading, after, part++);

        movable.forEach((block) => {
            current.appendChild(block);
            if (measureSlide(current).fits) return;
            block.remove();
            if (pageContentCount(current) > 0) current = nextPage(current);
            current.appendChild(block);
            if (measureSlide(current).fits) return;
            block.remove();
            const lastSplitPage = splitBlock(block, current, nextPage);
            if (lastSplitPage) {
                current = lastSplitPage;
                if (!measureSlide(current).fits) current.classList.add('course-slide-dense');
                return;
            }
            current.appendChild(block);
            current.classList.add('course-slide-dense');
            if (!measureSlide(current).fits) current.classList.add('course-slide-ultra-dense');
            if (!measureSlide(current).fits) {
                block.classList.add('course-overflow-safety');
                console.warn('A complex interactive block required an internal safety scroller.', block);
            }
        });
    }

    function paginateDeck() {
        const originals = leafSlides().filter((section) => !section.matches('[data-course-continuation]'));
        originals.forEach((section) => {
            if (!measureSlide(section).fits) paginateSlide(section);
        });
        document.querySelector('.course-measure-stage')?.remove();
    }

    function fullscreenElement() {
        return document.fullscreenElement || document.webkitFullscreenElement || null;
    }

    function updateFullscreenUI() {
        const active = Boolean(fullscreenElement());
        document.body.classList.toggle('course-fullscreen', active);
        const button = document.getElementById('course-fullscreen-button');
        if (button) {
            button.innerHTML = icon('fullscreen', active ? 'Exit full screen' : 'Full screen');
            button.setAttribute('aria-label', active ? 'Exit full screen' : 'Enter full screen');
        }
    }

    async function toggleFullscreen() {
        try {
            if (fullscreenElement()) {
                const exit = document.exitFullscreen || document.webkitExitFullscreen;
                if (exit) await exit.call(document);
            } else {
                const request = revealElement.requestFullscreen || revealElement.webkitRequestFullscreen;
                if (request) await request.call(revealElement);
            }
        } catch (error) {
            console.warn('Full-screen mode was unavailable.', error);
        }
    }

    function nearestReaderSlide() {
        const slides = leafSlides();
        if (!slides.length) return null;
        const targetY = window.innerHeight * 0.34;
        return slides.reduce((nearest, slide) => {
            const distance = Math.abs(slide.getBoundingClientRect().top - targetY);
            return !nearest || distance < nearest.distance ? { slide, distance } : nearest;
        }, null).slide;
    }

    function currentSlide() {
        return readerMode ? nearestReaderSlide() : (window.Reveal && window.Reveal.getCurrentSlide ? window.Reveal.getCurrentSlide() : leafSlides()[0]);
    }

    function slidePosition(slide) {
        const slides = leafSlides();
        const index = Math.max(0, slides.indexOf(slide));
        return { index, total: slides.length };
    }

    function updateSlideUI(slide) {
        const active = slide || currentSlide();
        if (!active) return;
        const position = slidePosition(active);
        const location = document.getElementById('course-deck-location');
        const previous = document.getElementById('course-slide-prev');
        const next = document.getElementById('course-slide-next');
        const authored = Number(active.dataset.courseAuthoredSlide);
        const continuation = Number(active.dataset.courseContinuation);
        let reference = `Slide ${position.index + 1} of ${position.total}`;
        if (authored) reference = `L${String(lectureId).padStart(2, '0')} · S${String(authored).padStart(2, '0')}${continuation ? String.fromCharCode(95 + continuation) : ''}`;
        else if (active.matches('[data-course-context]')) reference = 'Learning path';
        else if (active.matches('[data-course-practice]')) reference = 'Practice set';
        else if (active.matches('[data-course-navigation]')) reference = 'Course navigation';
        else if (active.matches('.practical-example-slide')) reference = 'Practical application';
        if (location) location.textContent = `Session ${String(scheduledSequence).padStart(2, '0')} · ${reference}`;
        if (previous) previous.disabled = position.index === 0;
        if (next) next.disabled = position.index >= position.total - 1;
    }

    function navigateSlide(direction) {
        if (readerMode) {
            const slides = leafSlides();
            const active = nearestReaderSlide();
            const index = Math.max(0, slides.indexOf(active));
            const target = slides[Math.max(0, Math.min(slides.length - 1, index + direction))];
            if (target) target.scrollIntoView({ behavior: reduceMotionQuery.matches ? 'auto' : 'smooth', block: 'start' });
        } else if (window.Reveal) {
            if (direction < 0) window.Reveal.prev();
            else window.Reveal.next();
        }
    }

    function applyDisplayMode() {
        if (!revealReady || !window.Reveal) return;
        const shouldRead = !embedded && !fullscreenElement();
        if (shouldRead === readerMode) {
            updateFullscreenUI();
            window.Reveal.layout();
            return;
        }
        const anchor = currentSlide();
        const indices = anchor && window.Reveal.getIndices ? window.Reveal.getIndices(anchor) : null;
        readerMode = shouldRead;
        document.body.classList.toggle('course-reader-mode', readerMode);
        document.documentElement.classList.toggle('course-reader-root', readerMode);
        window.Reveal.configure({
            width: 1920,
            height: 1080,
            margin: 0.018,
            minScale: 0.1,
            maxScale: 1,
            center: false,
            disableLayout: readerMode,
            controls: !readerMode,
            progress: !readerMode,
            keyboard: !readerMode,
            touch: !readerMode,
            slideNumber: readerMode ? false : 'c/t',
            scrollActivationWidth: null
        });
        if (!readerMode) {
            window.Reveal.sync();
            if (indices) window.Reveal.slide(indices.h, indices.v, indices.f);
            window.Reveal.layout();
        } else {
            window.requestAnimationFrame(() => {
                if (anchor) anchor.scrollIntoView({ block: 'start' });
                updateSlideUI(anchor);
            });
        }
        updateFullscreenUI();
        watchPracticeSlide();
    }

    function watchPracticeSlide() {
        if (practiceObserver) practiceObserver.disconnect();
        practiceSlide = document.querySelector(`[data-course-practice="${lectureId}"]`);
        if (!practiceSlide || !('IntersectionObserver' in window)) return;
        practiceObserver = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.55)) markCompleteFromPractice();
        }, { threshold: [0.55] });
        practiceObserver.observe(practiceSlide);
    }

    function prepareDeck() {
        if (deckPrepared || !revealReady || !window.Reveal) return;
        deckPrepared = true;
        window.clearTimeout(preparationTimer);
        decorateConceptSlides();
        decorateTechnicalTerms();
        enhanceCodeBlocks();
        paginateDeck();
        window.Reveal.sync();
        window.Reveal.layout();
        updateSlideUI(window.Reveal.getCurrentSlide());
        applyDisplayMode();
        watchPracticeSlide();
        if (requestedConcept) window.requestAnimationFrame(focusRequestedConcept);
    }

    function onRevealReady() {
        if (revealReady) return;
        revealReady = true;
        try {
            window.Reveal.configure({
                width: 1920,
                height: 1080,
                margin: 0.018,
                minScale: 0.1,
                maxScale: 1,
                center: false,
                controls: true,
                controlsTutorial: false,
                progress: true,
                hash: true,
                touch: true,
                slideNumber: 'c/t',
                transition: 'fade',
                backgroundTransition: 'fade',
                scrollActivationWidth: null
            });
            window.Reveal.on('slidechanged', (event) => {
                updateSlideUI(event.currentSlide);
                if (event.currentSlide && event.currentSlide.matches('[data-course-practice]')) markCompleteFromPractice();
            });
        } catch (error) {
            console.warn('Reveal configuration could not be synchronized.', error);
        }
        if (document.readyState === 'complete') window.requestAnimationFrame(prepareDeck);
        else window.addEventListener('load', () => window.requestAnimationFrame(prepareDeck), { once: true });
        preparationTimer = window.setTimeout(prepareDeck, 1800);
    }

    function handleReaderScroll() {
        if (!readerMode || scrollFrame) return;
        scrollFrame = window.requestAnimationFrame(() => {
            scrollFrame = 0;
            updateSlideUI(nearestReaderSlide());
        });
    }

    annotateAuthoredSlides();
    markReferenceSlides();
    setReferenceVisibility(showReferenceSlides);
    injectNoviceOnboardingSlides();
    injectCheckpoints();
    createDeckBar();
    injectExtraSlides();
    updateProgressUI();

    if (window.Reveal && typeof window.Reveal.on === 'function') {
        if (typeof window.Reveal.isReady === 'function' && window.Reveal.isReady()) onRevealReady();
        else window.Reveal.on('ready', onRevealReady);
    }

    window.addEventListener('cs103:progresschange', updateProgressUI);
    window.addEventListener('scroll', handleReaderScroll, { passive: true });
    window.addEventListener('resize', applyDisplayMode, { passive: true });
    window.addEventListener('orientationchange', applyDisplayMode, { passive: true });
    window.addEventListener('storage', (event) => {
        if (event.key === themeStorageKey && (event.newValue === 'light' || event.newValue === 'dark')) applyTheme(event.newValue);
    });
    document.addEventListener('fullscreenchange', applyDisplayMode);
    document.addEventListener('webkitfullscreenchange', applyDisplayMode);
    document.addEventListener('keydown', (event) => {
        if (!event.shiftKey) {
            const typing = event.target.closest?.('input, textarea, select, [contenteditable="true"], [contenteditable="plaintext-only"]');
            if (!typing && event.key.toLowerCase() === 'f' && readerMode) {
                event.preventDefault();
                toggleFullscreen();
            }
            return;
        }
        if (event.key === 'ArrowLeft' && previousLecture) window.location.assign(previousLecture.file);
        if (event.key === 'ArrowRight' && nextLecture) window.location.assign(nextLecture.file);
    });
}());
