// Lecture 3 · Block scope
#include <iostream>

int main() {
    int outer = 10;
    {
        int inner = 3;
        outer += inner;
    }
    // inner is not visible here
    std::cout << outer << '\n';  // 13
}
