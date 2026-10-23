// Lecture 13 · A struct: one record, several data members
#include <iostream>

struct Reading {
    int sensorId;
    double value;
    bool valid;
};

int main() {
    Reading sample{7, 31.5, true};
    std::cout << "sensor " << sample.sensorId << ": " << sample.value << '\n';
    sample.value = 32.0;                       // change one member
    std::cout << "now " << sample.value << '\n';
}
