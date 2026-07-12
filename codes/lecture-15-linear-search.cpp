// Lecture 15 · Linear search as an array application
#include <array>
#include <cstddef>
#include <iostream>
#include <optional>
#include <vector>

template <typename T, std::size_t N>
std::optional<std::size_t> firstIndexOf(const std::array<T, N>& values, const T& target) {
    for (std::size_t i = 0; i < values.size(); ++i) {
        if (values[i] == target) return i;
    }
    return std::nullopt;
}

template <typename T, std::size_t N>
std::vector<std::size_t> allIndicesOf(const std::array<T, N>& values, const T& target) {
    std::vector<std::size_t> matches;
    for (std::size_t i = 0; i < values.size(); ++i) {
        if (values[i] == target) matches.push_back(i);
    }
    return matches;
}

int main() {
    const std::array<int, 9> readings{12, 45, 23, 67, 23, 89, 34, 23, 56};
    constexpr int target = 23;

    if (const auto first = firstIndexOf(readings, target)) {
        std::cout << "First match at index " << *first << '\n';
    }

    std::cout << "All matching indices:";
    for (const std::size_t index : allIndicesOf(readings, target)) {
        std::cout << ' ' << index;
    }
    std::cout << '\n';
}
