// Lecture 12 · Set A · Array statistics through references
#include <array>
#include <iostream>
using namespace std;

double summarize(const array<int,5>& a, int& lo, int& hi) {
    lo = a[0];                                   // 1
    hi = a[0];                                   // 2
    int sum = 0;
    for (int value : a) {
        sum += value;                            // 3
        if (value < lo) lo = value;              // 4
        if (value > hi) hi = value;              // 5
    }
    return static_cast<double>(sum) / a.size();  // 6
}

int main() {
    array<int,5> a{8, 3, 11, 6, 2};
    int lo, hi;
    double mean = summarize(a, lo, hi);          // 7
    cout << lo << ' ' << hi << ' ' << mean;      // 8
}
