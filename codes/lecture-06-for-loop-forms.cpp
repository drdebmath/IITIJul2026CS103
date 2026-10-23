// Lecture 6 · Counted and nested for loops
#include <iostream>

int main() {
    for (int step = 1; step <= 5; ++step) {
        std::cout << step << ' ';
    }
    std::cout << '\n';
    for (int i = 0; i < 5; ++i) {
        std::cout << i << ' ';
    }
    std::cout << '\n';
    for (int row = 0; row < 3; ++row) {
        for (int col = 0; col < 4; ++col) {
            std::cout << row << ',' << col << '\n';
        }
    }
}
