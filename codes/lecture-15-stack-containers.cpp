// Lecture 15 · One interface, three implementations
#include <iostream>
#include <list>
#include <stack>
#include <vector>

int main() {
    std::stack<int> a;                               // default container: std::deque<int>
    std::stack<int, std::vector<int>> b;             // same interface, vector inside
    std::stack<int, std::list<int>> c;               // same interface, list inside
    for (int x : {1, 2, 3}) { a.push(x); b.push(x); c.push(x); }
    std::cout << a.top() << ' ' << b.top() << ' ' << c.top() << '\n';
    a.pop(); b.pop(); c.pop();
    std::cout << a.top() << ' ' << b.top() << ' ' << c.top() << ' ' << a.size() << '\n';
}
