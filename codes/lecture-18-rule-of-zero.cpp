// Lecture 18 · Rule of Zero: members that manage themselves need no destructor or copy code
#include <iostream>
#include <string>
#include <vector>
class Gradebook {
public: Gradebook(const std::string& c, int n) : course(c), marks(n, 0) {}
    void set(int i, int m) { marks.at(i) = m; }
    int get(int i) const { return marks.at(i); }
private: std::string course;  std::vector<int> marks;   // vector owns memory
};
int main() {
    Gradebook a("CS103", 3);
    Gradebook b = a;           // copies course and marks
    b.set(0, 99);
    std::cout << a.get(0) << ' ' << b.get(0) << '\n';
    a = b;                     // replaces a's marks with a copy of b's
    std::cout << a.get(0) << '\n';
}
