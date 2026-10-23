// Lecture 2 · Game evolution · named state
#include <iostream>
int main() {
    const int rows = 5, columns = 9;
    int headRow = 2, headColumn = 3;
    int score = 0;
    bool dirtHere = true;
    std::cout << std::boolalpha  // print bools as true/false
              << rows << ' ' << columns << ' ' << headRow << ' '
              << headColumn << ' ' << score << ' ' << dirtHere << '\n';
}
