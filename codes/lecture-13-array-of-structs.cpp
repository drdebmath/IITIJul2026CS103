// Lecture 13 · An array of structs
#include <array>
#include <iostream>

struct Reading {
    int sensorId;
    double value;
    bool valid;
};

int main() {
    std::array<Reading, 3> samples{{
        {1, 30.1, true}, {2, 29.8, true}, {3, 0.0, false}
    }};
    for (const Reading& reading : samples) {
        if (reading.valid) std::cout << reading.sensorId << ": " << reading.value << '\n';
    }
}
