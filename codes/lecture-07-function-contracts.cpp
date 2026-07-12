// Lecture 7 · Function contracts, parameters, and return values
#include <iostream>

double rectangleArea(double length, double width) {
    return length * width;
}

double celsiusToFahrenheit(double celsius) {
    return celsius * 9.0 / 5.0 + 32.0;
}

bool isEven(int value) {
    return value % 2 == 0;
}

int main() {
    std::cout << "area=" << rectangleArea(3.0, 4.0) << '\n';
    std::cout << "temperature=" << celsiusToFahrenheit(25.0) << " F\n";
    std::cout << std::boolalpha << "42 is even=" << isEven(42) << '\n';
}
