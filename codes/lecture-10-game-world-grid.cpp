// Lecture 10 · Game evolution · 2D world
#include <iostream>
int main() {
    char world[3][5]{{'#','#','#','#','#'},
                     {'#','*','.','C','#'},
                     {'#','#','#','#','#'}};
    int row=1, column=1;
    if (world[row][column]=='*') world[row][column]='.';
    for (int r=0; r<3; ++r) { for (int c=0; c<5; ++c) std::cout << world[r][c];
        std::cout << '\n'; }
}
