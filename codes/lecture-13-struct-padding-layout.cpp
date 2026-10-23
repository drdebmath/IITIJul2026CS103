// Lecture 13 · Alignment and padding
#include <cstddef>
#include <iostream>

struct Reading {
    int sensorId;
    double value;
    bool valid;
};

int main() {
    std::cout << "sizeof(int) = " << sizeof(int) << '\n';
    std::cout << "sizeof(double) = " << sizeof(double) << '\n';
    std::cout << "sizeof(bool) = " << sizeof(bool) << '\n';
    std::cout << "sizeof(Reading) = " << sizeof(Reading) << '\n';
    std::cout << "offsetof sensorId = " << offsetof(Reading, sensorId) << '\n';
    std::cout << "offsetof value = " << offsetof(Reading, value) << '\n';
    std::cout << "offsetof valid = " << offsetof(Reading, valid) << '\n';
}
