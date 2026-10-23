// Lecture 15 · Bracket matching with std::stack
#include <iostream>
#include <stack>
#include <string>

bool balanced(const std::string& text) {
    std::stack<char> open;
    for (char c : text) {
        if (c == '(' || c == '[' || c == '{') {
            open.push(c);
        } else if (c == ')' || c == ']' || c == '}') {
            if (open.empty()) return false;          // nothing to close
            char o = open.top();
            open.pop();
            bool ok = (o == '(' && c == ')') || (o == '[' && c == ']') || (o == '{' && c == '}');
            if (!ok) return false;                   // wrong kind of closer
        }
    }
    return open.empty();                             // anything left is unclosed
}

int main() {
    for (std::string s : {"a[i] = (b + c) * {d}", "(]", "((x)", "x)"})
        std::cout << s << " -> " << (balanced(s) ? "balanced" : "not balanced") << '\n';
}
