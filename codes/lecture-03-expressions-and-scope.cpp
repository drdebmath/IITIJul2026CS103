// Lecture 3 · Expressions, namespaces, and block scope
#include <iostream>

int completedExperiments = 100;

namespace laboratory {
int adjustment = 3;
}

int main() {
    int ungrouped = 5 + 3 * 2;
    int grouped = (5 + 3) * 2;
    int today = 2;

    {
        int correctedToday = today + laboratory::adjustment;
        completedExperiments += correctedToday;
        std::cout << "inside block: " << correctedToday << '\n';
    }

    std::cout << "expressions: " << ungrouped << ' ' << grouped << '\n';
    std::cout << "completed: " << completedExperiments << '\n';
}
