// Lecture 15 · Cost decides the representation
#include <chrono>
#include <deque>
#include <iostream>
#include <vector>

int main() {
    using clock = std::chrono::steady_clock;
    auto ms = [](clock::time_point a, clock::time_point b) {   // added: timing helper
        return std::chrono::duration_cast<std::chrono::milliseconds>(b - a).count();
    };
    std::vector<int> v(100000, 1);
    std::deque<int> d(100000, 1);
    auto t0 = clock::now();
    while (!v.empty()) v.erase(v.begin());           // dequeue from the front: shifts the rest
    auto t1 = clock::now();
    while (!d.empty()) d.pop_front();                // dequeue from the front
    auto t2 = clock::now();
    std::cout << "vector erase(begin): " << ms(t0, t1) << " ms\n";
    std::cout << "deque pop_front:     " << ms(t1, t2) << " ms\n";
}
