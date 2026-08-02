// Lecture 14 · The C allocation interface used safely from C++
// Prefer vector and smart pointers unless a C interface requires these calls.

#include <cstdlib>
#include <iostream>

void printValues(const int* values, std::size_t count) {
    for (std::size_t i = 0; i < count; ++i) {
        std::cout << values[i] << ' ';
    }
    std::cout << '\n';
}

int main() {
    const std::size_t firstCount = 5;
    int* values = static_cast<int*>(std::malloc(firstCount * sizeof(int)));
    if (values == nullptr) {
        std::cout << "malloc failed\n";
        return 1;
    }

    for (std::size_t i = 0; i < firstCount; ++i) {
        values[i] = static_cast<int>(i * 10);
    }
    printValues(values, firstCount);

    const std::size_t largerCount = 8;
    void* resizedStorage = std::realloc(values, largerCount * sizeof(int));
    if (resizedStorage == nullptr) {
        std::free(values);
        std::cout << "realloc failed\n";
        return 1;
    }
    values = static_cast<int*>(resizedStorage);
    for (std::size_t i = firstCount; i < largerCount; ++i) {
        values[i] = static_cast<int>(i * 10);
    }
    printValues(values, largerCount);
    std::free(values);

    const std::size_t zeroCount = 4;
    int* zeroes = static_cast<int*>(std::calloc(zeroCount, sizeof(int)));
    if (zeroes == nullptr) {
        std::cout << "calloc failed\n";
        return 1;
    }
    printValues(zeroes, zeroCount);
    std::free(zeroes);
}
