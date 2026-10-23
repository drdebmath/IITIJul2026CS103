// Lecture 14 · Allocation failure
#include <cstddef>
#include <iostream>
#include <new>

int main() {
    std::size_t count = static_cast<std::size_t>(-1) / 8;   // far more ints than any machine has
    try {
        int* huge = new int[count];
        delete[] huge;
    } catch (const std::bad_alloc& e) {
        std::cout << "allocation failed: " << e.what() << '\n';
    }
    int* maybe = new (std::nothrow) int[count];
    if (maybe == nullptr) std::cout << "nothrow: nullptr\n";
    delete[] maybe;
}
