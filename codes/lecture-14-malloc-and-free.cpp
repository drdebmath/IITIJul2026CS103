// Lecture 14 · C allocation: malloc and free
#include <cstdlib>
#include <iostream>

int main() {
    int* values = static_cast<int*>(std::malloc(3 * sizeof(int)));  // 12 untyped bytes
    if (values == nullptr) return 1;                                // malloc reports failure with nullptr
    for (int i = 0; i < 3; ++i) values[i] = (i + 1) * 10;
    std::cout << values[0] + values[1] + values[2] << '\n';
    std::free(values);                                              // free pairs with malloc, not delete
    values = nullptr;
}
