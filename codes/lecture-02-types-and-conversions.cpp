// Lecture 2 · Types & Representation
#include <cstdint>
#include <iomanip>
#include <iostream>
#include <limits>

int main() {
    const std::uint16_t stationId = 2048;
    const std::uint32_t samples = 86'400;
    const double temperatureC = 31.625;
    const float humidityPercent = 68.4F;
    const bool batteryLow = false;
    const char quality = 'A';

    const int truncatedTemperature = static_cast<int>(temperatureC);
    const auto heatIndex = temperatureC + 0.05 * humidityPercent;

    std::cout << std::boolalpha << std::fixed << std::setprecision(2);
    std::cout << "station=" << stationId << " samples=" << samples << '\n';
    std::cout << "temperature=" << temperatureC
              << " humidity=" << humidityPercent << '\n';
    std::cout << "quality=" << quality << " battery-low=" << batteryLow << '\n';
    std::cout << "explicit int conversion=" << truncatedTemperature << '\n';
    std::cout << "inferred heat-index type uses " << sizeof(heatIndex)
              << " bytes; value=" << heatIndex << '\n';
    std::cout << "largest uint16_t=" << std::numeric_limits<std::uint16_t>::max() << '\n';
}
