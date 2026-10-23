// Lecture 12 · Set B · Recursive power
#include <iostream>
using namespace std;

int power(int base, int exp) {
    if (exp == 0) return 1;                  // 1
    return base * power(base, exp - 1);      // 2, 3
}

int main() {
    int value = power(3, 3);                 // 4
    cout << value << '\n';                   // 5
    return 0;                                // 6
}
