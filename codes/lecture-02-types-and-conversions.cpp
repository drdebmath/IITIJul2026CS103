// Lecture 2 · Types & Representation
#include <iostream>

int main() {
    const int stationId = 2048;
    const int samples = 86400;
    const double temperatureC = 31.625;
    const float humidityPercent = 68.4F;
    const bool batteryLow = false;
    const char quality = 'A';

    const int truncatedTemperature = static_cast<int>(temperatureC);
    const auto heatIndex = temperatureC + 0.05 * humidityPercent;

    std::cout << "station=" << stationId << " samples=" << samples << '\n';
    std::cout << "temperature=" << temperatureC
              << " humidity=" << humidityPercent << '\n';
    std::cout << "quality=" << quality << " battery-low=" << batteryLow << '\n';
    std::cout << "explicit int conversion=" << truncatedTemperature << '\n';
    std::cout << "inferred heat-index type uses " << sizeof(heatIndex)
              << " bytes; value=" << heatIndex << '\n';
}
