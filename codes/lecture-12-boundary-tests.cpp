// Lecture 12 · Repair a contract and test its boundaries
#include <cassert>
#include <vector>

bool average(const std::vector<int>& values, double& result) {
    if (values.empty()) return false;
    long long sum = 0;
    for (const int value : values) sum += value;
    result = static_cast<double>(sum) / static_cast<double>(values.size());
    return true;
}

int main() {
    double result = 0.0;
    assert(average({7}, result) && result == 7.0);
    assert(average({1, 2}, result) && result == 1.5);
    assert(average({-5, 5}, result) && result == 0.0);
    assert(!average({}, result));
}
