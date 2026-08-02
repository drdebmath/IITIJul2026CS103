// Lecture 15 · Linear search as an array application
#include <array>
#include <cstddef>
#include <iostream>
#include <vector>

bool firstIndexOf(const std::array<int, 9>& values, int target,
                  std::size_t& foundIndex) {
    for (std::size_t i = 0; i < values.size(); ++i) {
        if (values[i] == target) {
            foundIndex = i;
            return true;
        }
    }
    return false;
}

std::vector<std::size_t> allIndicesOf(const std::array<int, 9>& values,
                                      int target) {
    std::vector<std::size_t> matches;
    for (std::size_t i = 0; i < values.size(); ++i) {
        if (values[i] == target) matches.push_back(i);
    }
    return matches;
}

int main() {
    const std::array<int, 9> readings{12, 45, 23, 67, 23, 89, 34, 23, 56};
    constexpr int target = 23;

    std::size_t first = 0;
    if (firstIndexOf(readings, target, first))
        std::cout << "First match at index " << first << '\n';

    std::cout << "All matching indices:";
    for (const std::size_t index : allIndicesOf(readings, target)) {
        std::cout << ' ' << index;
    }
    std::cout << '\n';
}
