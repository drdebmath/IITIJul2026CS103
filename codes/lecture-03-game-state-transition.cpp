// Lecture 3 · Game evolution · one transition
#include <iostream>
int main() {
    int row = 2, column = 3;
    int dRow = 0, dColumn = 1;
    {
        int nextRow = row + dRow, nextColumn = column + dColumn;
        row = nextRow; column = nextColumn;
    }
    std::cout << row << ' ' << column << '\n';
}
