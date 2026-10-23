// Lecture 15 · Reading or removing from an empty container
#include <cassert>
#include <iostream>
#include <stack>

int main() {
    std::stack<int> s;
    s.push(7);
    s.pop();
    if (!s.empty()) std::cout << s.top() << '\n'; else std::cout << "empty: no top\n";
    assert(!s.empty() && "pop requires a non-empty stack");
    s.pop();                                         // pre-condition violated
}
