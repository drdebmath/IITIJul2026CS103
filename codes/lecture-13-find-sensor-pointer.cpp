// Lecture 13 · Return a pointer when "not found" is an answer
#include <array>
#include <iostream>

struct Reading {
    int sensorId;
    double value;
    bool valid;
};

// returns a pointer to the matching reading, or nullptr when there is none
const Reading* findSensor(const std::array<Reading, 3>& readings, int id) {
    for (const Reading& reading : readings) {
        if (reading.sensorId == id) return &reading;
    }
    return nullptr;
}

int main() {
    std::array<Reading, 3> samples{{
        {1, 30.1, true}, {2, 29.8, true}, {3, 0.0, false}
    }};
    for (int id : {2, 3, 9}) {
        const Reading* found = findSensor(samples, id);
        if (found == nullptr) {
            std::cout << "sensor " << id << ": not found\n";
        } else if (!found->valid) {
            std::cout << "sensor " << id << ": invalid reading\n";
        } else {
            std::cout << "sensor " << id << ": " << found->value << '\n';
        }
    }
}
