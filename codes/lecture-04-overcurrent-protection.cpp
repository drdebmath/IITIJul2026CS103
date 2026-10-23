// Lecture 4 · Over-current protection controller
#include <iostream>

int main() {
    double current, safeLimit;
    int stopFlag;
    std::cin >> current >> safeLimit >> stopFlag;
    bool emergencyStop = (stopFlag != 0);

    if (current < 0.0) {
        std::cout << "INVALID: bad measurement";
    } else if (emergencyStop || current > safeLimit) {
        std::cout << "TRIP: disconnect supply";
    } else if (current > 0.9 * safeLimit) {
        std::cout << "WARNING: near limit";
    } else {
        std::cout << "NORMAL";
    }
}
