// Lecture 17 · A struct cannot protect its rule
#include <algorithm>
#include <iostream>
#include <vector>
struct Scores {
    std::vector<int> values;   // rule: ascending order
};
bool contains(const Scores& s, int x) {
    return std::binary_search(s.values.begin(), s.values.end(), x);
}
int main() {
    Scores s{{35, 52, 58, 70}};
    std::cout << std::boolalpha << contains(s, 58) << '\n';   // true
    s.values.push_back(40);                                    // breaks the rule
    std::cout << contains(s, 40) << '\n';                      // false
}
