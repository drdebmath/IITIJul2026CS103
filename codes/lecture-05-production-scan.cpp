// Lecture 5 · Iteration, invariants, and early termination
#include <iostream>

int main() {
    int sampleCount = 0;
    std::cin >> sampleCount;
    if (sampleCount < 0) return 1;

    int defects = 0;
    int processed = 0;
    while (processed < sampleCount && defects < 3) {
        double diameter = 0;
        std::cin >> diameter;
        if (!std::cin) return 1;
        if (diameter < 9.95 || diameter > 10.05) ++defects;
        ++processed;
        // Invariant: defects is the number of rejected items among [0, processed).
    }

    std::cout << "processed=" << processed << " defects=" << defects << '\n';
}
