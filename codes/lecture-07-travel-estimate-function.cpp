// Lecture 7 · Travel estimate behind a function interface
#include <iostream>

double estimateTravel(double distanceKm, double speedKmph) {
    return distanceKm / speedKmph;
}

int main() {
    double distance = 420;
    double speed = 70;
    if (distance >= 0 && speed > 0)
        std::cout << "Travel time: " << estimateTravel(distance, speed) << " hours";
}
