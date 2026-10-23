// Lecture 12 · Set B · Vector totals and a string length
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<int> marks;
    marks.push_back(72);                              // 1
    marks.push_back(65);                              // 2
    int total = 0;
    for (size_t i = 0; i < marks.size(); ++i) {       // 3
        total += marks[i];                            // 4
    }
    string label = "Total";
    cout << label.size() << ' ' << total << '\n';     // 5
    return 0;                                         // 6
}
