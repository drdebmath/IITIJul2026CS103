// Lecture 17 · Binary search has a pre-condition: the values are sorted
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> first{35, 40, 52, 58, 70};
    std::vector<int> second{35, 52, 58, 70, 40};
    bool a = std::binary_search(first.begin(), first.end(), 40);
    bool b = std::binary_search(second.begin(), second.end(), 40);
    std::cout << std::boolalpha << a << '\n' << b << '\n';   // true, then false
}
