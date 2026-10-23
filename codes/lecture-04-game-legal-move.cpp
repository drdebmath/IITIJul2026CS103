// Lecture 4 · Game evolution · legal move
#include <iostream>

int main() {
    int row=2, column=3, dRow=0, dColumn=0; char command='d';
    switch(command) { case 'w': dRow=-1; break; case 's': dRow=1; break;
        case 'a': dColumn=-1; break; case 'd': dColumn=1; break; default: break; }
    int nextRow=row+dRow, nextColumn=column+dColumn;
    bool inside=nextRow>=0 && nextRow<5 && nextColumn>=0 && nextColumn<9;
    bool blocked=(nextRow==2 && nextColumn==4);
    if (inside && !blocked) { row=nextRow; column=nextColumn; }
    std::cout << row << ' ' << column << '\n';  // added: show the position
}
