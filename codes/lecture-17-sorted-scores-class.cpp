// Lecture 17 · A class keeps its invariant: values stay sorted
#include <algorithm>
#include <iostream>
#include <vector>
class SortedScores {
public:
    SortedScores(const std::vector<int>& v) : values(v) { std::sort(values.begin(), values.end()); }
    void add(int x) { values.insert(std::lower_bound(values.begin(), values.end(), x), x); }
    bool contains(int x) const { return std::binary_search(values.begin(), values.end(), x); }
    void print() const { for (int v : values) std::cout << v << ' '; std::cout << '\n'; }
private:
    std::vector<int> values;   // invariant: sorted, established by the constructor
};
int main() { SortedScores s({70, 35, 58, 52}); s.print(); s.add(40); s.print(); std::cout << std::boolalpha << s.contains(40) << '\n'; }
