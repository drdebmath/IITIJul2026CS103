// Lecture 9 · Find an anomalous temperature in a week
#include <cmath>
#include <iostream>

int main() {
    const int n = 7;              // the size, written once
    double t[n] = {31.2, 31.5, 37.8, 31.1, 30.9, 31.4, 31.0};
    double sum = 0;
    for (int i = 0; i < n; ++i) sum += t[i];
    double mean = sum / n;

    int anomaly = 0;
    for (int i = 1; i < n; ++i)
        if (std::abs(t[i] - mean) > std::abs(t[anomaly] - mean)) anomaly = i;

    std::cout << "Anomaly index: " << anomaly;
}
