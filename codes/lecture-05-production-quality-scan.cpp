// Lecture 5 · Production-line quality scan
#include <iostream>

int main() {
    int samples, defects = 0;
    std::cin >> samples;

    int i = 0;
    while (i < samples) {
        double diameter;
        std::cin >> diameter;
        if (diameter < 9.95 || diameter > 10.05) ++defects;
        if (defects >= 3) break;
        ++i;
    }
    std::cout << "Defects found: " << defects;
}
