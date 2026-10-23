// Lecture 6 · Multiplication table
#include <iostream>

int main() {
    int number;
    std::cin >> number;
    for (int multiplier = 1; multiplier <= 10; ++multiplier) {
        std::cout << number << " × " << multiplier
                  << " = " << number * multiplier << '\n';
    }
}
