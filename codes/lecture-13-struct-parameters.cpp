// Lecture 13 · Passing a struct to a function
#include <iostream>

struct Reading {
    int sensorId;
    double value;
    bool valid;
};

void print(const Reading& reading) {            // read-only, no copy
    std::cout << reading.sensorId << ": " << reading.value << '\n';
}

void scale(Reading& reading, double factor) {   // may change the caller's object
    reading.value *= factor;
}

int main() {
    Reading a{7, 31.5, true};
    Reading b = a;                // copies every member
    scale(b, 2.0);
    print(a);
    print(b);
}
