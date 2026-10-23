// Lecture 6 · Game evolution · render the board
#include <iostream>
int main() {
    int actorRow=1, actorColumn=3;
    for (int row=0; row<3; ++row) {
        for (int column=0; column<7; ++column) {
            if (row==actorRow && column==actorColumn) std::cout << 'S';
            else std::cout << '.';
        }
        std::cout << '\n';
    }
}
