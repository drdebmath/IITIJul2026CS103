// Lecture 12 · Pre-mid-semester integration without post-mid prerequisites
#include <iostream>
#include <vector>

double totalRain(const std::vector<double>& rain) {
    double total = 0.0;
    for (double value : rain) total += value;
    return total;
}

std::size_t wettestDay(const std::vector<double>& rain) {
    std::size_t best = 0;
    for (std::size_t day = 1; day < rain.size(); ++day)
        if (rain[day] > rain[best]) best = day;
    return best;
}

int main() {
    const std::vector<double> week{0.0, 4.2, 18.0, 2.1, 0.0, 7.5, 1.0};
    std::cout << "total=" << totalRain(week) << " mm\n";
    if (!week.empty()) std::cout << "wettest-index=" << wettestDay(week) << '\n';
}
