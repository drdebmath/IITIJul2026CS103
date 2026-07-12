// Lecture 6 · Counted and nested loops
#include <iostream>

int main() {
    constexpr int rows = 3;
    constexpr int columns = 4;

    for (int row = 1; row <= rows; ++row) {
        for (int column = 1; column <= columns; ++column) {
            std::cout << '(' << row << ',' << column << ") ";
        }
        std::cout << '\n';
    }
}
