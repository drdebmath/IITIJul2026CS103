// Lecture 9 · Game evolution · linked segments
#include <iostream>
#include <array>
int main() {
    std::array<int,4> rows{2,2,2,1};
    std::array<int,4> columns{4,3,2,2};
    int nextRow=2, nextColumn=3;
    bool collision=false;
    for (std::size_t i=0; i<rows.size(); ++i)
        if (rows[i]==nextRow && columns[i]==nextColumn) collision=true;
    std::cout << std::boolalpha << collision << '\n';  // added: show the result
}
