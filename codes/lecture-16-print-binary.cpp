// Lecture 16 · A shrinking measure: printBinary with a pre-condition
#include <cassert>
#include <iostream>

void printBinary(int n) {
    assert(n >= 0);                           // pre-condition (Lecture 12)
    if (n >= 2) printBinary(n / 2);           // measure n halves: reaches 0 or 1
    std::cout << n % 2;
}

int main() {
    printBinary(6);  std::cout << '\n';
    printBinary(13); std::cout << '\n';
}
