// Lecture 9 · Arrays, indices, and traversal
#include <array>
#include <iostream>

double mean(const std::array<double, 5>& values) {
    double sum = 0.0;
    for (double value : values) sum += value;
    return sum / values.size();
}

int main() {
    #include <array>

    std::array<double, 5> voltage{2.1, 2.3, 2.0, 2.4, 2.2};

    voltage[0] = 2.5;            // first element
    double last = voltage[4];    // fifth element

    double sum = 0.0;
    for (std::size_t i = 0; i < voltage.size(); ++i) {
        sum += voltage[i];
    }

    double maximum = voltage[0];
    for (double value : voltage) {
        if (value > maximum) maximum = value;
    }
    std::cout << "sum=" << sum << " maximum=" << maximum << " last=" << last << '\n';   // added
    std::cout << "mean=" << mean(voltage) << '\n';
}
