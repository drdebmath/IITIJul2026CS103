// Lecture 12 · Assert a pre-condition of divide
#include <cassert>
#include <iostream>

// pre-condition: denominator != 0
int divide(int numerator, int denominator) {
    assert(denominator != 0);
    return numerator / denominator;
}

int main() {
    std::cout << divide(7, 2) << '\n';    // pre-condition holds: prints 3
    std::cout << divide(10, 0) << '\n';   // violates the pre-condition
}
