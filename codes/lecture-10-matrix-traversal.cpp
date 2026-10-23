// Lecture 10 · Two-dimensional arrays
#include <iostream>

int main() {
    int image[2][3]{{10, 20, 30}, {40, 50, 60}};
    int pixel = image[1][2];  // row 1, column 2
    for (int row = 0; row < 2; ++row) {
        for (int col = 0; col < 3; ++col) {
            std::cout << image[row][col] << ' ';
        }
    }
    std::cout << '\n' << pixel << '\n';  // added
}
