// Lecture 10 · std::vector push_back and at
#include <iostream>
#include <vector>

int main() {
    std::vector<int> readings;
    readings.push_back(17);
    readings.push_back(21);

    for (std::size_t i = 0; i < readings.size(); ++i) {
        std::cout << readings.at(i) << '\n';
    }
}
