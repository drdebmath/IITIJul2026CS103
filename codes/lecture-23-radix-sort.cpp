// Lecture 23 · Stable bucket passes for LSD radix sort
#include <array>
#include <iostream>
#include <vector>

void digitPass(std::vector<unsigned>& values, unsigned place) {
    std::array<std::vector<unsigned>, 10> buckets;
    for (const unsigned value : values) buckets[(value / place) % 10].push_back(value);

    std::size_t output = 0;
    for (const auto& bucket : buckets) {
        for (const unsigned value : bucket) values[output++] = value;
    }
}

void radixSort(std::vector<unsigned>& values) {
    unsigned largest = 0;
    for (const unsigned value : values) if (value > largest) largest = value;
    for (unsigned place = 1; largest / place > 0; place *= 10) {
        digitPass(values, place);
        if (place > largest / 10) break;
    }
}

int main() {
    std::vector<unsigned> ids{2601034, 2601002, 2601120, 2601011};
    radixSort(ids);
    for (const unsigned id : ids) std::cout << id << '\n';
}
