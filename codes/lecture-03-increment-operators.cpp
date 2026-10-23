// Lecture 3.5 · Pre-increment vs post-increment
#include <iostream>

int main() {
    // Example 1: the difference appears the moment you assign it
    int i = 5, a;
    a = ++i;   // i becomes 6 first, so a = 6

    int j = 5, b;
    b = j++;   // b takes the old 5, then j becomes 6
    std::cout << "i=" << i << " a=" << a << " j=" << j << " b=" << b << '\n';  // added: show results

    // Example 2: cout prints the value of the expression, not the variable
    int n = 3;
    std::cout << n++ << '\n';   // prints 3, n is now 4
    std::cout << n    << '\n';  // prints 4

    int m = 3;
    std::cout << ++m << '\n';   // prints 4, m is now 4

    // Example 3: inside a condition, the comparison sees the expression's value
    int c = 4;
    if (c++ > 4)                       // compares 4 > 4 — false; c is now 5
        std::cout << "yes\n";
    std::cout << "c = " << c << '\n';  // c = 5

    int d = 4;
    if (++d > 4)                       // d becomes 5 first; 5 > 4 — true
        std::cout << "yes\n";          // this one prints
}
