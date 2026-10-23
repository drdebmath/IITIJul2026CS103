// Lecture 1 · Travel-time estimator
#include <iostream>

int main() {
    double distanceKm, speedKmph;
    std::cin >> distanceKm >> speedKmph;

    double travelHours = distanceKm / speedKmph;
    std::cout << "Estimated hours: " << travelHours << "\n";
    return 0;
}
