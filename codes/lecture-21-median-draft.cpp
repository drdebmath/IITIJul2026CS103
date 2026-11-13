// Lecture 21 · The tests judge the draft: this median() fails its third test
#include <algorithm>
#include <cassert>
#include <iostream>
#include <vector>

// Specification
// pre-condition:  v is not empty
// post-condition: returns the middle value of v in sorted order;
//                 for an even count, the mean of the two middle values
double median(std::vector<double> v) {      // draft from the assistant
    std::sort(v.begin(), v.end());
    return v[v.size() / 2];
}

int main() {                                // tests written before the draft
    assert(median({7}) == 7);
    assert(median({3, 1, 2}) == 2);
    assert(median({4, 1, 3, 2}) == 2.5);
    std::cout << "all tests passed\n";
}
