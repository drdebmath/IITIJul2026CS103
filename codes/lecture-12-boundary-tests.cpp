// Lecture 12 · Repair a contract and test its boundaries
#include <cassert>
#include <stdexcept>
#include <vector>

double average(const std::vector<int>& values) {
    if (values.empty()) throw std::invalid_argument("average requires data");
    long long sum = 0;
    for (const int value : values) sum += value;
    return static_cast<double>(sum) / static_cast<double>(values.size());
}

int main() {
    assert(average({7}) == 7.0);
    assert(average({1, 2}) == 1.5);       // exposes accidental integer division
    assert(average({-5, 5}) == 0.0);

    bool rejectedEmptyInput = false;
    try {
        static_cast<void>(average({}));
    } catch (const std::invalid_argument&) {
        rejectedEmptyInput = true;
    }
    assert(rejectedEmptyInput);
}
