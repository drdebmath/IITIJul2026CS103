// Lecture 21 · No warning and a plausible answer, but a read past the end of the array
// Compile again with: g++ -std=c++17 -Wall -g -fsanitize=address
#include <iostream>

int largest(const int* a, int n) {          // pre-condition: n > 0
    int best = a[0];
    for (int i = 1; i <= n; ++i)            // error: should be i < n
        if (a[i] > best) best = a[i];
    return best;
}

int main() {
    int* marks = new int[4]{62, 91, 78, 85};
    std::cout << "largest: " << largest(marks, 4) << '\n';
    delete[] marks;
}
