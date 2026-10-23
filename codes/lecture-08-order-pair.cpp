// Lecture 8 · Return two results without global variables
#include <iostream>

void orderPair(int first, int second, int& smaller, int& larger) {
    if (first <= second) {
        smaller = first;
        larger = second;
    } else {
        smaller = second;
        larger = first;
    }
}

int main() {
    int low = 0, high = 0;
    orderPair(17, 4, low, high);
    std::cout << low << " " << high << '\n';
}
