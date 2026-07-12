// Lecture 13 · Records, arrays of records, and pointer member access
#include <array>
#include <iostream>
#include <string>

struct Reading {
    std::string sensor;
    double value;
    bool valid;
};

void invalidate(Reading* reading) {
    if (reading != nullptr) reading->valid = false;
}

int main() {
    std::array<Reading, 3> readings{{
        {"temperature", 31.2, true},
        {"pressure", 101.7, true},
        {"humidity", 68.4, true}
    }};

    invalidate(&readings[1]);
    for (const Reading& reading : readings) {
        if (reading.valid) std::cout << reading.sensor << '=' << reading.value << '\n';
    }
}
