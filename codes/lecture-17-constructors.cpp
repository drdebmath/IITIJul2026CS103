// Lecture 17 · Overloaded constructors each establish the invariant
#include <algorithm>
#include <iostream>
#include <vector>
class SortedScores {
public:
    SortedScores() { std::cout << "default constructor\n"; }
    SortedScores(const std::vector<int>& v) : values(v) {
        std::sort(values.begin(), values.end()); std::cout << "vector constructor\n";
    }
    SortedScores(int count, int score) : values(count, score) { std::cout << "count constructor\n"; }
    int size() const { return static_cast<int>(values.size()); }
private: std::vector<int> values;   // invariant: sorted
};
int main() {
    SortedScores a; SortedScores b({70, 35, 58}); SortedScores c(3, 50);
    std::cout << a.size() << ' ' << b.size() << ' ' << c.size() << '\n';
}
