// Lecture 13 · Pointer arithmetic
#include <iostream>

int main() {
    int a[4]{10, 20, 30, 40};
    int* p = a;                       // the array name converts to &a[0]
    std::cout << *p << ' ' << *(p + 2) << ' ' << p[3] << '\n';
    ++p;                              // move to the next int
    std::cout << *p << '\n';
    int* end = a + 4;                 // one past the end: may be compared, never dereferenced
    std::cout << (end - p) << '\n';   // elements between p and end
    for (int* q = a; q != end; ++q) std::cout << *q << ' ';
    std::cout << '\n';
}
