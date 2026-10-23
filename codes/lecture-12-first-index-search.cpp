// Lecture 12 · Set B · Search an array using a function
#include <array>
#include <iostream>
using namespace std;

int firstIndex(const array<int,6>& a, int key) {
    for (size_t i = 0; i < a.size(); ++i) {  // 1
        if (a[i] == key) {                   // 2
            return static_cast<int>(i);      // 3
        }
    }
    return -1;                               // 4
}

int main() {
    array<int,6> a{4, 9, 2, 9, 7, 1};
    int p = firstIndex(a, 9);                // 5
    if (p != -1) cout << p;                  // 6
    else cout << "missing";
    cout << '\n';                            // 7
    return 0;                                // 8
}
