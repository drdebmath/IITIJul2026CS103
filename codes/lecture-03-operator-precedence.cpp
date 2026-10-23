// Lecture 3 · Operators and expressions
#include <iostream>

int main() {
    int total = 5 + 3 * 2;       // 11
    int grouped = (5 + 3) * 2;   // 16
    bool safe = total < 20 && grouped > 0;
    std::cout << total << ' ' << grouped << ' ' << safe << '\n';  // added: print the results
}
