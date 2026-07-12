// Lecture 4 · Decisions and safe branching
#include <iostream>
#include <string_view>

std::string_view protectionState(double current, double safeLimit, bool emergencyStop) {
    if (emergencyStop || current > safeLimit) return "TRIP";
    if (current > 0.9 * safeLimit) return "WARNING";
    if (current < 0 || safeLimit <= 0) return "INVALID INPUT";
    return "NORMAL";
}

int main() {
    const double current = 47.5;
    const double safeLimit = 50.0;
    const bool emergencyStop = false;
    std::cout << protectionState(current, safeLimit, emergencyStop) << '\n';
}
