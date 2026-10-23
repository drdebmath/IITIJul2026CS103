// Lecture 7 · Declare once, define once
#include <iostream>

double rectangleArea(double length, double width);  // declaration

int main() {
    std::cout << rectangleArea(4.0, 3.0);
}

double rectangleArea(double length, double width) {
    return length * width;
}
