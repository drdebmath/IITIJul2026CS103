// Lecture 13 · Structure layout, alignment, and padding
#include <cstddef>
#include <iostream>

struct Scattered {
    char tag;
    int count;
    double measurement;
    char quality;
};

struct Grouped {
    double measurement;
    int count;
    char tag;
    char quality;
};

int main() {
    const Scattered first{'A', 1, 2.0, 'D'};
    const Grouped second{2.0, 1, 'A', 'D'};

    std::cout << "Scattered size=" << sizeof(first)
              << " alignment=" << alignof(Scattered) << '\n';
    std::cout << "  offsets: tag=" << offsetof(Scattered, tag)
              << " count=" << offsetof(Scattered, count)
              << " measurement=" << offsetof(Scattered, measurement)
              << " quality=" << offsetof(Scattered, quality) << '\n';

    std::cout << "Grouped size=" << sizeof(second)
              << " alignment=" << alignof(Grouped) << '\n';
    std::cout << "  offsets: measurement=" << offsetof(Grouped, measurement)
              << " count=" << offsetof(Grouped, count)
              << " tag=" << offsetof(Grouped, tag)
              << " quality=" << offsetof(Grouped, quality) << '\n';
}
