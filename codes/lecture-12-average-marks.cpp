// Lecture 12 · Average marks without dividing by zero
#include <cassert>
#include <iostream>
#include <vector>

// pre-condition: values is not empty
// post-condition: returns the mean of values
double average(const std::vector<int>& values) {
    assert(!values.empty());                 // empty would divide by zero
    long long sum = 0;
    for (int value : values) sum += value;
    return static_cast<double>(sum) / values.size();
}

void testAverage() {                         // test driver
    assert(average({1, 2}) == 1.5);          // catches integer division
    assert(average({90}) == 90.0);           // one value
}

int main() {
    testAverage();
    std::vector<int> marks;
    int mark = 0;
    while (std::cin >> mark && mark != -1) marks.push_back(mark);
    if (marks.empty()) {                     // user input: check with if
        std::cout << "no marks entered\n";
        return 1;
    }
    std::cout << "average: " << average(marks) << '\n';
}
