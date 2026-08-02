export const lectureExtras = {
    "1": {
        "title": "Travel-time estimator",
        "context": "Turn a familiar quantity problem into the input → process → output pattern used by every program.",
        "code": "#include <iostream>\n\nint main() {\n    double distanceKm, speedKmph;\n    std::cin >> distanceKm >> speedKmph;\n\n    double travelHours = distanceKm / speedKmph;\n    std::cout << \"Estimated hours: \" << travelHours << std::endl;\n}",
        "takeaways": [
            "Inputs become named values.",
            "The formula is the algorithm.",
            "Output makes the result observable."
        ],
        "problems": [
            "Read a temperature in Celsius and print the Fahrenheit equivalent.",
            "Read the length and width of a classroom and print area and perimeter.",
            "Read three quiz scores and print their arithmetic mean.",
            "Read seconds and express the duration as hours, minutes, and seconds.",
            "Write an IPO chart and C++ program for estimating simple interest."
        ]
    },
    "2": {
        "title": "Choose types for a sensor packet",
        "context": "A weather station mixes counts, precise measurements, status flags, and identifiers—each deserves an intentional type.",
        "code": "#include <iostream>\n\nint main() {\n    int stationId = 2048;\n    double temperature = 31.625;\n    float humidity = 68.4f;\n    bool batteryLow = false;\n    char quality = 'A';\n\n    std::cout << stationId << \" \" << temperature << \" \"\n              << humidity << \" \" << quality << \" \" << batteryLow;\n}",
        "takeaways": [
            "Range and precision guide type choice.",
            "A type documents intent.",
            "Narrow types are useful only when their limits are understood."
        ],
        "problems": [
            "Choose types for roll number, CGPA, hostel block, and fee-paid status.",
            "Print the size and numeric limits of the fundamental arithmetic types.",
            "Demonstrate truncation when a double is converted to int.",
            "Compare signed and unsigned behavior near zero.",
            "Use const and auto to model the radius and area of a circle."
        ]
    },
    "3": {
        "title": "Update game state without leaking temporary names",
        "context": "A small block holds one reward calculation while the score remains available to the rest of the program.",
        "code": "#include <iostream>\n\nint main() {\n    int score = 4;\n    {\n        int collectedReward = 3;\n        score += collectedReward;\n    }\n    std::cout << score << std::endl;\n}",
        "takeaways": [
            "Expressions transform program state.",
            "Scope hides transition-only names.",
            "The longer-lived score remains available afterward."
        ],
        "problems": [
            "Trace local and global variables with the same name.",
            "Use one inner block for a temporary score update, then print the outer score.",
            "Place two variables with the same name in different namespaces and select both with ::.",
            "Evaluate five expressions involving arithmetic and logical precedence.",
            "Refactor a program to remove an unnecessary global variable."
        ]
    },
    "4": {
        "title": "Over-current protection controller",
        "context": "A controller must classify current readings and disconnect equipment only when the safety rule is satisfied.",
        "code": "#include <iostream>\n\nint main() {\n    double current, safeLimit;\n    bool emergencyStop;\n    std::cin >> current >> safeLimit >> emergencyStop;\n\n    if (emergencyStop || current > safeLimit) {\n        std::cout << \"TRIP: disconnect supply\";\n    } else if (current > 0.9 * safeLimit) {\n        std::cout << \"WARNING: near limit\";\n    } else {\n        std::cout << \"NORMAL\";\n    }\n}",
        "takeaways": [
            "Order branches from exceptional to normal.",
            "Short-circuiting expresses safety logic clearly.",
            "Every boundary value needs a test."
        ],
        "problems": [
            "Classify a temperature as freezing, safe, warm, or dangerous.",
            "Compute income tax using three progressive slabs.",
            "Use switch to implement a menu-driven unit converter.",
            "Validate whether three lengths can form a triangle and classify it.",
            "Design boundary tests for an elevator load controller."
        ]
    },
    "5": {
        "title": "Production-line quality scan",
        "context": "A loop processes repeated measurements, counts defects, and stops early if too many failures appear.",
        "code": "#include <iostream>\n\nint main() {\n    int samples, defects = 0;\n    std::cin >> samples;\n\n    int i = 0;\n    while (i < samples) {\n        double diameter;\n        std::cin >> diameter;\n        if (diameter < 9.95 || diameter > 10.05) ++defects;\n        if (defects >= 3) break;\n        ++i;\n    }\n    std::cout << \"Defects found: \" << defects;\n}",
        "takeaways": [
            "while repeats while a condition stays true.",
            "A state update must move toward termination.",
            "break is appropriate when the result is already known."
        ],
        "problems": [
            "Read values until a sentinel and report minimum, maximum, and mean.",
            "Validate a positive password length using a do-while loop.",
            "Count down from an input value to zero with while.",
            "Keep asking for a temperature until it lies in a stated safe range.",
            "Trace and repair a while loop whose control variable never changes."
        ]
    },
    "6": {
        "title": "Print a multiplication table without guessing bounds",
        "context": "A counted loop names its start, continuation rule, and update in one place; the loop invariant explains what has already been printed.",
        "code": "#include <iostream>\n\nint main() {\n    int number;\n    std::cin >> number;\n    for (int multiplier = 1; multiplier <= 10; ++multiplier) {\n        std::cout << number << \" × \" << multiplier\n                  << \" = \" << number * multiplier << '\\n';\n    }\n}",
        "takeaways": [
            "The counter has one clear valid range.",
            "The update moves toward termination.",
            "The invariant describes completed rows."
        ],
        "problems": [
            "Print the first n odd numbers and their sum.",
            "Draw an r-by-c rectangle using nested loops.",
            "Trace a loop with <= changed to < and explain the difference.",
            "Rewrite a counted while loop as a for loop.",
            "Find and repair three non-terminating or off-by-one loops."
        ]
    },
    "7": {
        "title": "Travel estimate behind a function contract",
        "context": "The caller validates input, then a small function receives two values and returns one calculated result.",
        "code": "#include <iostream>\n\ndouble estimateTravel(double distanceKm, double speedKmph) {\n    return distanceKm / speedKmph;\n}\n\nint main() {\n    double distance = 420;\n    double speed = 70;\n    if (distance >= 0 && speed > 0)\n        std::cout << \"Travel time: \" << estimateTravel(distance, speed) << \" hours\";\n}",
        "takeaways": [
            "A function owns one clear responsibility.",
            "Parameters are inputs to this contract.",
            "The return value is the calculated output."
        ],
        "problems": [
            "Write a function that returns the area of a rectangle.",
            "Write a function that converts Celsius to Fahrenheit.",
            "Write a boolean function that reports whether an integer is even.",
            "Refactor a unit converter so each conversion is a separate function.",
            "State the inputs, output, and precondition of a safe division function."
        ]
    },
    "8": {
        "title": "Return two results without global state",
        "context": "Input values are copied; output references name the caller’s existing variables. The contract makes both roles explicit.",
        "code": "#include <iostream>\n\nvoid orderPair(int first, int second, int& smaller, int& larger) {\n    if (first <= second) {\n        smaller = first;\n        larger = second;\n    } else {\n        smaller = second;\n        larger = first;\n    }\n}\n\nint main() {\n    int low = 0, high = 0;\n    orderPair(17, 4, low, high);\n    std::cout << low << \" \" << high << '\\n';\n}",
        "takeaways": [
            "Parameter roles are visible at the interface.",
            "References avoid hidden global state.",
            "One function performs one testable job."
        ],
        "problems": [
            "Write a function that swaps two integers through references.",
            "Overload absoluteValue for int and double.",
            "Split a bill calculator into input, calculation, and output functions.",
            "Compare a large read-only parameter by value and const reference.",
            "Write factorial recursively and identify its base case."
        ]
    },
    "9": {
        "title": "Find an anomalous temperature in a week",
        "context": "An array stores a fixed measurement window; one traversal computes the mean and locates the largest deviation.",
        "code": "#include <array>\n#include <cmath>\n#include <iostream>\n\nint main() {\n    std::array<double, 7> t{31.2, 31.5, 37.8, 31.1, 30.9, 31.4, 31.0};\n    double sum = 0;\n    for (double value : t) sum += value;\n    double mean = sum / t.size();\n\n    std::size_t anomaly = 0;\n    for (std::size_t i = 1; i < t.size(); ++i)\n        if (std::abs(t[i] - mean) > std::abs(t[anomaly] - mean)) anomaly = i;\n\n    std::cout << \"Anomaly index: \" << anomaly;\n}",
        "takeaways": [
            "The structure makes a complete data window available.",
            "Traversal applies one rule to every element.",
            "Searching is an application of array access."
        ],
        "problems": [
            "Rotate an array right by k positions without using another full array.",
            "Find the second-largest distinct value in an array.",
            "Reverse a fixed array in place.",
            "Count how many readings lie above the mean.",
            "Implement linear search on a fixed array and report the first matching index."
        ]
    },
    "10": {
        "title": "Summarize a classroom score matrix",
        "context": "A matrix needs one loop per dimension; a vector is useful when the number of stored values is known only at runtime.",
        "code": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> scores{{8, 7, 9}, {6, 10, 8}};\n    for (std::size_t row = 0; row < scores.size(); ++row) {\n        int total = 0;\n        for (std::size_t col = 0; col < scores[row].size(); ++col)\n            total += scores[row][col];\n        std::cout << \"row \" << row << \" total=\" << total << '\\n';\n    }\n}",
        "takeaways": [
            "Each index stays within its own dimension.",
            "size() supplies the actual bound.",
            "The structure matches rows containing columns."
        ],
        "problems": [
            "Compute every row sum and column sum of a matrix.",
            "Find the largest element and report its row and column.",
            "Read n values into a vector and compute their mean.",
            "Use at() to demonstrate checked access and handle failure.",
            "Choose array or vector for four stated storage requirements."
        ]
    },
    "11": {
        "title": "Validate an institute enrollment ID",
        "context": "A useful text rule combines string length, fixed prefixes, and character classification.",
        "code": "#include <cctype>\n#include <iostream>\n#include <string>\n\nbool validId(const std::string& id) {\n    if (id.size() != 9 || id.substr(0, 2) != \"BT\") return false;\n    for (std::size_t i = 2; i < id.size(); ++i)\n        if (!std::isdigit(static_cast<unsigned char>(id[i]))) return false;\n    return true;\n}\n\nint main() {\n    std::cout << std::boolalpha << validId(\"BT2601034\");\n}",
        "takeaways": [
            "std::string owns and sizes text safely.",
            "Validation is a sequence of explicit predicates.",
            "cctype functions require careful character conversion."
        ],
        "problems": [
            "Normalize a full name to title case while preserving spaces.",
            "Count words without using stringstream.",
            "Find every occurrence of a substring, including overlaps.",
            "Validate a password against four independent rules.",
            "Implement run-length encoding and decoding for a string."
        ]
    },
    "12": {
        "title": "Debug a safe average function",
        "context": "Most exam bugs are contract violations: an empty range, a wrong bound, an uninitialized accumulator, or integer division.",
        "code": "#include <cassert>\n#include <vector>\n\nbool average(const std::vector<int>& values, double& result) {\n    if (values.empty()) return false;\n    long long sum = 0;\n    for (int value : values) sum += value;\n    result = static_cast<double>(sum) / values.size();\n    return true;\n}\n\nint main() {\n    double result = 0.0;\n    assert(average({1, 2}, result) && result == 1.5);\n    assert(!average({}, result));\n}",
        "takeaways": [
            "State preconditions explicitly.",
            "Initialize every accumulator.",
            "Test empty, one-element, and boundary cases."
        ],
        "problems": [
            "Repair five off-by-one errors in supplied loop fragments.",
            "Write tests that expose integer division in an average function.",
            "Find and fix a null-pointer dereference in a list traversal.",
            "Explain assignment-versus-comparison and design a warning example.",
            "Create a ten-case test plan for binary search."
        ]
    },
    "13": {
        "title": "Represent and filter sensor records",
        "context": "A struct keeps each reading coherent; passing by const reference lets a function inspect records efficiently.",
        "code": "#include <iostream>\n#include <string>\n\nstruct Reading {\n    std::string sensor;\n    double value;\n    bool valid;\n};\n\nvoid printIfValid(const Reading& r) {\n    if (r.valid) std::cout << r.sensor << \": \" << r.value << std::endl;\n}\n\nint main() {\n    Reading sample{\"pressure-2\", 101.7, true};\n    printIfValid(sample);\n}",
        "takeaways": [
            "A struct models one domain record.",
            "Member names replace parallel loose variables.",
            "References avoid unnecessary record copies."
        ],
        "problems": [
            "Model a book and sort an array of books by price.",
            "Calculate and print the padding of three alternate struct layouts.",
            "Update a student record through a pointer and the arrow operator.",
            "Use a lambda to filter employees above a salary threshold.",
            "Build a singly linked list node and insert at the front."
        ]
    },
    "14": {
        "title": "Ownership-safe linked sample log",
        "context": "Each node exclusively owns the next node, so the complete chain is released automatically.",
        "code": "#include <iostream>\n#include <memory>\n\nstruct Node {\n    int sample;\n    std::unique_ptr<Node> next;\n};\n\nint main() {\n    auto head = std::make_unique<Node>();\n    head->sample = 42;\n    head->next = std::make_unique<Node>();\n    head->next->sample = 57;\n    for (Node* p = head.get(); p; p = p->next.get())\n        std::cout << p->sample << \" \";\n}",
        "takeaways": [
            "Ownership determines who releases memory.",
            "Links turn separate allocations into a structure.",
            "Leaving scope releases the complete owned chain automatically."
        ],
        "problems": [
            "Allocate an integer array dynamically and compute its median.",
            "Implement insert-at-end and delete-by-value for a linked list.",
            "Demonstrate and then repair a dangling-pointer bug.",
            "Rewrite a raw owning pointer with unique_ptr.",
            "Detect whether a linked list contains a cycle."
        ]
    },
    "15": {
        "title": "Dispatch print jobs with a queue",
        "context": "FIFO order is a property of the queue structure; the scheduling algorithm simply consumes that interface.",
        "code": "#include <iostream>\n#include <queue>\n#include <string>\n\nint main() {\n    std::queue<std::string> jobs;\n    jobs.push(\"report.pdf\");\n    jobs.push(\"diagram.png\");\n    jobs.push(\"notes.txt\");\n\n    while (!jobs.empty()) {\n        std::cout << \"Printing \" << jobs.front() << std::endl;\n        jobs.pop();\n    }\n}",
        "takeaways": [
            "The structure supplies the ordering guarantee.",
            "The algorithm uses only front, push, and pop.",
            "Choosing a structure simplifies the application."
        ],
        "problems": [
            "Implement a stack using a fixed array and test overflow and underflow.",
            "Implement a circular queue using an array.",
            "Check balanced brackets using a stack.",
            "Use linear search to find all overdue jobs in an array.",
            "Sort student records by score using bubble sort and a comparator."
        ]
    },
    "16": {
        "title": "Reverse a linked chain recursively",
        "context": "The recursive call solves the smaller tail; pointer rewiring makes the old head the new tail.",
        "code": "struct Node { int value; Node* next; };\n\nNode* reverse(Node* head) {\n    if (!head || !head->next) return head;\n    Node* newHead = reverse(head->next);\n    head->next->next = head;\n    head->next = nullptr;\n    return newHead;\n}",
        "takeaways": [
            "The base case handles an empty or one-node list.",
            "The call stack remembers each old head.",
            "The algorithm is meaningful because of the linked structure."
        ],
        "problems": [
            "Trace recursive factorial and draw every stack frame.",
            "Generate all permutations of a string without duplicates.",
            "Compute the longest common subsequence recursively with memoization.",
            "Reverse a linked list iteratively and compare space use.",
            "Implement bucket sort for normalized decimal values."
        ]
    },
    "17": {
        "title": "Prioritize emergency maintenance",
        "context": "A heap makes the highest-priority request available immediately while preserving efficient insertion.",
        "code": "#include <iostream>\n#include <queue>\n\nint main() {\n    std::priority_queue<int> severity;\n    severity.push(2);\n    severity.push(5);\n    severity.push(3);\n    std::cout << \"Next severity: \" << severity.top();\n}",
        "takeaways": [
            "A heap encodes priority as a structural invariant.",
            "The largest stored severity is exposed first.",
            "The application inherits logarithmic insertion."
        ],
        "problems": [
            "Implement iterative binary search and count comparisons.",
            "Insert, search, and print an inorder traversal of a BST.",
            "Build a min-heap without using priority_queue.",
            "Implement merge sort and measure its comparisons.",
            "Choose the best structure for a dictionary, task scheduler, and undo history."
        ]
    },
    "18": {
        "title": "Encapsulate a bank account",
        "context": "The class protects its invariant—balance cannot become negative—while constructors establish a valid starting state.",
        "code": "#include <string>\n\nclass Account {\n    std::string owner_;\n    double balance_;\npublic:\n    Account(const std::string& owner, double opening)\n        : owner_(owner), balance_(0.0) {\n        if (opening > 0.0) balance_ = opening;\n    }\n    bool withdraw(double amount) {\n        if (amount <= 0 || amount > balance_) return false;\n        balance_ -= amount;\n        return true;\n    }\n    double balance() const { return balance_; }\n};",
        "takeaways": [
            "A constructor establishes invariants.",
            "Private state changes through controlled operations.",
            "Methods express domain rules, not just setters."
        ],
        "problems": [
            "Design a Temperature class that rejects values below absolute zero.",
            "Implement default, parameterized, and copy constructors for a Matrix class.",
            "Overload + and == for a Fraction class.",
            "Overload stream input and output for a Time value.",
            "Implement a dynamic Buffer class using the rule of three."
        ]
    },
    "19": {
        "title": "Calibrate inherited energy meters",
        "context": "A friend calibration function has one narrow privilege; a derived meter reuses the protected correction operation without introducing dynamic dispatch yet.",
        "code": "#include <iostream>\n\nclass Meter {\n    double offset_ = 0;\n    friend void calibrate(Meter&, double);\nprotected:\n    double corrected(double raw) const { return raw + offset_; }\npublic:\n    double read(double raw) const { return corrected(raw); }\n};\n\nvoid calibrate(Meter& meter, double offset) { meter.offset_ = offset; }\n\nclass EnergyMeter : public Meter {\npublic:\n    double kilowattHours(double raw) const { return corrected(raw); }\n};",
        "takeaways": [
            "Inheritance reuses a stable base abstraction.",
            "protected exposes only what derived classes need.",
            "Friend access remains narrow and purposeful."
        ],
        "problems": [
            "Build a Vehicle base class with Car and Bicycle specializations.",
            "Demonstrate public, protected, and private member accessibility.",
            "Use a friend function to compare private measurements from two objects.",
            "Explain why a polymorphic base class needs a virtual destructor.",
            "Refactor duplicated derived-class behavior into a base class."
        ]
    },
    "20": {
        "title": "Create notifications through one interface",
        "context": "A factory returns a base pointer; virtual dispatch selects the concrete notification without conditionals at the call site.",
        "code": "#include <memory>\n#include <string>\n\nclass Notifier {\npublic:\n    virtual std::string send() const = 0;\n    virtual ~Notifier() = default;\n};\nclass Email : public Notifier {\npublic:\n    std::string send() const override { return \"email sent\"; }\n};\n\nstd::unique_ptr<Notifier> makeNotifier() {\n    return std::make_unique<Email>();\n}",
        "takeaways": [
            "The caller depends on an abstraction.",
            "Virtual dispatch replaces type-switching.",
            "The factory centralizes object creation."
        ],
        "problems": [
            "Model a diamond hierarchy and resolve it using virtual inheritance.",
            "Compare public and private inheritance with a working example.",
            "Implement a Shape hierarchy and compute total area polymorphically.",
            "Create a factory that builds payment strategies from a code.",
            "Trace construction and destruction order in multiple inheritance."
        ]
    },
    "21": {
        "title": "Store heterogeneous shapes safely",
        "context": "A container of owning base pointers becomes an extensible data structure whose aggregation algorithm is independent of concrete types.",
        "code": "#include <memory>\n#include <vector>\n\nclass Shape {\npublic:\n    virtual double area() const = 0;\n    virtual ~Shape() = default;\n};\n\ndouble totalArea(const std::vector<std::unique_ptr<Shape>>& shapes) {\n    double total = 0;\n    for (const auto& shape : shapes) total += shape->area();\n    return total;\n}",
        "takeaways": [
            "Polymorphism lets one structure store varied behavior.",
            "unique_ptr makes ownership explicit.",
            "The aggregation algorithm depends only on the interface."
        ],
        "problems": [
            "Implement Circle and Rectangle classes for the shape container.",
            "Create a polymorphic graph whose edges compute different travel costs.",
            "Write a deep-copy operation for a container of cloneable objects.",
            "Add a new shape without modifying the total-area algorithm.",
            "Compare a polymorphic container with std::variant for this problem."
        ]
    },
    "22": {
        "title": "Search and rank available flights",
        "context": "The object model supplies flight records; standard algorithms filter and rank those records for a real booking workflow.",
        "code": "#include <algorithm>\n#include <iostream>\n#include <string>\n#include <vector>\n\nstruct Flight { std::string code, from, to; double fare; };\n\nint main() {\n    std::vector<Flight> flights{{\"AI1\", \"IDR\", \"DEL\", 5100}, {\"AI2\", \"IDR\", \"DEL\", 4600}};\n    std::sort(flights.begin(), flights.end(),\n              [](const Flight& a, const Flight& b) { return a.fare < b.fare; });\n    auto match = std::find_if(flights.begin(), flights.end(),\n              [](const Flight& f) { return f.from == \"IDR\" && f.to == \"DEL\"; });\n    if (match != flights.end()) std::cout << match->code << \" \" << match->fare;\n}",
        "takeaways": [
            "Domain objects are the data structure’s elements.",
            "Comparators encode a user-facing ranking rule.",
            "Algorithms compose with the object model."
        ],
        "problems": [
            "Design classes for passengers, flights, and bookings with clear ownership.",
            "Filter flights by route, date, and remaining capacity.",
            "Sort matching flights by fare and then departure time.",
            "Model airports as a graph and find a minimum-hop route.",
            "Apply one design pattern to make payment processing extensible."
        ]
    },
    "23": {
        "title": "Sort fixed-width institute IDs by digits",
        "context": "Radix sort exploits the digit structure of integer keys; the stable bucket pass is the algorithmic application.",
        "code": "#include <array>\n#include <vector>\n\nvoid digitPass(std::vector<int>& values, int place) {\n    std::array<std::vector<int>, 10> buckets;\n    for (int value : values) buckets[(value / place) % 10].push_back(value);\n    std::size_t out = 0;\n    for (const auto& bucket : buckets)\n        for (int value : bucket) values[out++] = value;\n}",
        "takeaways": [
            "The key representation determines the buckets.",
            "Stable passes preserve earlier digit order.",
            "The array of vectors is the structure that makes the algorithm direct."
        ],
        "problems": [
            "Complete LSD radix sort for non-negative integers.",
            "Extend radix sort to handle negative integers.",
            "Implement block-recursive multiplication for square matrices.",
            "Invert a binary tree recursively and iteratively.",
            "Design a ChessPiece hierarchy and generate legal moves polymorphically."
        ]
    }
};
