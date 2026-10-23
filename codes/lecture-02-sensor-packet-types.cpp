// Lecture 2 · Choose types for a sensor packet
#include <iostream>

int main() {
    int stationId = 2048;
    int samples = 86400;
    double temperature = 31.625;
    float humidity = 68.4f;
    bool batteryLow = false;
    char quality = 'A';

    std::cout << std::boolalpha  // print bools as true/false
              << stationId << " " << samples << " " << temperature << " "
              << humidity << " " << quality << " " << batteryLow << '\n';
}
