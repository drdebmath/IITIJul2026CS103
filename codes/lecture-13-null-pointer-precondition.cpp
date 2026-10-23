// Lecture 13 · A pointer parameter has a pre-condition
#include <cassert>
#include <iostream>

struct Reading {
    int sensorId;
    double value;
    bool valid;
};

// pre-condition: reading != nullptr
void invalidate(Reading* reading) {
    assert(reading != nullptr);
    reading->valid = false;
}

int main() {
    Reading r{7, 31.5, true};
    invalidate(&r);
    std::cout << r.valid << std::endl;
    Reading* missing = nullptr;
    invalidate(missing);                // violates the pre-condition
}
