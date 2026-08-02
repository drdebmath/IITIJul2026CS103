// Lecture 4 · Decisions and safe branching
#include <iostream>

int main() {
    const double current = 47.5;
    const double safeLimit = 50.0;
    const bool emergencyStop = false;

    if (current < 0.0 || safeLimit <= 0.0) {
        std::cout << "INVALID INPUT\n";
    } else if (emergencyStop || current > safeLimit) {
        std::cout << "TRIP\n";
    } else if (current > 0.9 * safeLimit) {
        std::cout << "WARNING\n";
    } else {
        std::cout << "NORMAL\n";
    }
}
