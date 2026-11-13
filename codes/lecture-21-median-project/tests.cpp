#include "median.h"
#include <cassert>
#include <iostream>

int main() {                                // tests written before the draft
    assert(median({7}) == 7);
    assert(median({3, 1, 2}) == 2);
    assert(median({4, 1, 3, 2}) == 2.5);
    std::cout << "all tests passed\n";
}
