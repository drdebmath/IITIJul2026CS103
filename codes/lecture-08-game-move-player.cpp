// Lecture 8 · Game evolution · movement function
#include <iostream>

void movePlayer(int& row, int& column, int dRow, int dColumn) {
    row += dRow;
    column += dColumn;
}
int main() {
    int row=2, column=3;
    movePlayer(row,column,0,1);
    std::cout << row << ' ' << column << '\n';  // added: show the position
}
