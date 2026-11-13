// Lecture 21 · The corrected median() passes the same three tests
#include <algorithm>
#include <cassert>
#include <iostream>
#include <vector>

// Specification
// pre-condition:  v is not empty
// post-condition: returns the middle value of v in sorted order;
//                 for an even count, the mean of the two middle values
double median(std::vector<double> v) {
    assert(!v.empty());                     // pre-condition
    std::sort(v.begin(), v.end());
    std::size_t mid = v.size() / 2;
    if (v.size() % 2 == 1) return v[mid];
    return (v[mid - 1] + v[mid]) / 2;
}

int main() {
    assert(median({7}) == 7);
    assert(median({3, 1, 2}) == 2);
    assert(median({4, 1, 3, 2}) == 2.5);
    std::cout << "all tests passed\n";
}
