// Lecture 8 · Recursion needs a base case
#include <iostream>

int factorial(int n) {
    if (n <= 1) return 1;          // base case
    return n * factorial(n - 1);   // smaller input
}
int main() {
    std::cout << factorial(3) << '\n';  // added: print the result
}
