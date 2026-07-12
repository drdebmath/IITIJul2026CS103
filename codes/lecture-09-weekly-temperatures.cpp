// Lecture 9 · Fixed arrays and safe traversal
#include <array>
#include <iostream>

int main() {
    const std::array<double, 7> temperatures{31.2, 31.5, 32.1, 30.9, 31.8, 32.4, 31.0};

    double total = 0;
    for (std::size_t index = 0; index < temperatures.size(); ++index) {
        total += temperatures[index];
    }

    const double mean = total / temperatures.size();
    std::cout << "weekly mean=" << mean << '\n';
}
