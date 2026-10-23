// Lecture 12 · Set A · Recursive sum of the first n numbers
#include <iostream>
using namespace std;

int sumTo(int n) {
    if (n == 0) return 0;          // 1
    return n + sumTo(n - 1);       // 2
}

int main() {
    int n = 5;
    int answer = sumTo(n);         // 3
    if (answer > 10) {
        cout << answer;            // 4
    } else {
        cout << 0;
    }
    cout << '\n';                  // 5
    return 0;                      // 6
}
