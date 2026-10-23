// Lecture 13 · Check before you dereference
#include <iostream>

int main() {
    int score = 95;
    int* scorePointer = &score;
    int* none = nullptr;

    if (scorePointer != nullptr) {
        *scorePointer += 5;           // safe: it points to score
    }

    if (none != nullptr) {
        *none = 0;                    // skipped: no object to reach
    } else {
        std::cout << "no object\n";
    }
    std::cout << score << '\n';  // added: show the result
}
