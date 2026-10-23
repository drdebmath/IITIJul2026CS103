// Lecture 13 · Member access: dot and arrow
#include <iostream>

struct Reading {
    int sensorId;
    double value;
    bool valid;
};

int main() {
    Reading reading{7, 31.5, true};
    Reading* pointer = &reading;

    reading.value = 32.0;       // dot: through the object
    pointer->value = 32.5;      // arrow: through the pointer
    (*pointer).value += 0.5;    // the same thing, spelled out
    std::cout << reading.value << '\n';
}
