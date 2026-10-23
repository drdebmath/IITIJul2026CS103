// Lecture 13 · Address-of, dereference, and null pointer
#include <iostream>

int main() {
    int score = 95;
    int* scorePointer = &score;          // holds the address of score
    *scorePointer += 5;                  // dereference: reach score through the pointer
    std::cout << score << '\n';
    std::cout << (scorePointer == &score) << '\n';
    int* none = nullptr;                 // points to no object
    std::cout << (none == nullptr) << '\n';
}
