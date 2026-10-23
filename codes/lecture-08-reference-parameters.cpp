// Lecture 8 · Copy, alias, or read-only access
#include <iostream>

void clampToZero(double& value) {
    if (value < 0.0) value = 0.0;
}

void printReading(const double& reading) {
    std::cout << reading << '\n';
}

void bump(int& value) { value += 1; }

int absolute(int value) { return value < 0 ? -value : value; }          // added: definitions for the overloads
double absolute(double value) { return value < 0.0 ? -value : value; }

int main() {
    double reading = -2.5;
    clampToZero(reading);
    printReading(reading);
    int x = 5;
    bump(x);
    std::cout << x << '\n';
    std::cout << absolute(-3) << ' ' << absolute(-2.5) << '\n';
}
