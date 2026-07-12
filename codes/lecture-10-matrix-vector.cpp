// Lecture 10 · Matrices and runtime-sized vectors
#include <iostream>
#include <vector>

int main() {
    const std::vector<std::vector<int>> scores{{8, 7, 9}, {6, 10, 8}};

    for (std::size_t row = 0; row < scores.size(); ++row) {
        int total = 0;
        for (std::size_t column = 0; column < scores.at(row).size(); ++column) {
            total += scores.at(row).at(column);
        }
        std::cout << "row " << row << " total=" << total << '\n';
    }
}
