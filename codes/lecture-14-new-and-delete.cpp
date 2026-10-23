// Lecture 14 · new and delete
#include <iostream>

int main() {
    int* one = new int{42};              // one int, initialized
    int* many = new int[3]{10, 20, 30};  // three ints
    std::cout << *one << ' ' << many[0] + many[1] + many[2] << '\n';
    delete one;                          // matches new
    delete[] many;                       // matches new[]
    one = nullptr;
    many = nullptr;
}
