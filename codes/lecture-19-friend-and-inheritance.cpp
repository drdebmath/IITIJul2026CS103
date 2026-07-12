// Lecture 19 · Narrow friend access and inheritance foundations
#include <iostream>
#include <string>
#include <utility>

class Meter {
    double offset_ = 0;
    friend void calibrate(Meter&, double);
protected:
    double corrected(double raw) const { return raw + offset_; }
};

void calibrate(Meter& meter, double offset) {
    meter.offset_ = offset;
}

class EnergyMeter : public Meter {
    std::string circuit_;
public:
    explicit EnergyMeter(std::string circuit) : circuit_(std::move(circuit)) {}
    double kilowattHours(double raw) const { return corrected(raw); }
    const std::string& circuit() const { return circuit_; }
};

int main() {
    EnergyMeter meter("lab-1");
    calibrate(meter, -0.15);
    std::cout << meter.circuit() << '=' << meter.kilowattHours(42.0) << " kWh\n";
}
