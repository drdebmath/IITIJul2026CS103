// Lecture 16 · Backtracking: every arrangement of "abc"
#include <iostream>
#include <string>
#include <vector>

void permute(const std::string& letters, std::string& current, std::vector<bool>& used) {
    if (current.size() == letters.size()) {           // base case: every letter placed
        std::cout << current << '\n';
        return;
    }
    for (std::size_t i = 0; i < letters.size(); ++i) {
        if (used[i]) continue;
        used[i] = true;                               // choose
        current.push_back(letters[i]);
        permute(letters, current, used);              // explore
        current.pop_back();                           // undo
        used[i] = false;
    }
}

int main() {
    std::string letters = "abc", current;
    std::vector<bool> used(letters.size(), false);
    permute(letters, current, used);
}
