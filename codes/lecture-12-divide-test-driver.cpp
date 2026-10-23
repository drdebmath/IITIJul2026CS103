// Lecture 12 · Test divide with a test driver
#include <cassert>
#include <iostream>

// pre-condition: denominator != 0
int divide(int numerator, int denominator) {
    assert(denominator != 0);
    return numerator / denominator;
}

void testDivide() {               // test driver
    assert(divide(7, 2) == 3);    // integer division
    assert(divide(-7, 2) == -3);  // truncates toward zero
    assert(divide(0, 5) == 0);    // zero numerator is fine
}

int main() {
    testDivide();
    std::cout << "all tests passed\n";
    std::cout << divide(10, 0) << '\n';   // violates the pre-condition
}
