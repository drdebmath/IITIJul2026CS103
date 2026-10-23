// Lecture 10 · Summarize a classroom score matrix
#include <iostream>
#include <vector>

int main() {
    std::vector<std::vector<int>> scores{{8, 7, 9}, {6, 10, 8}};
    for (std::size_t row = 0; row < scores.size(); ++row) {
        int total = 0;
        for (std::size_t col = 0; col < scores[row].size(); ++col)
            total += scores[row][col];
        std::cout << "row " << row << " total=" << total << '\n';
    }
}
