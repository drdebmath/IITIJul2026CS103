// Lecture 14 · unique_ptr: exclusive ownership
#include <iostream>
#include <memory>
#include <utility>

int main() {
    auto first = std::make_unique<int>(42);
    std::cout << *first << '\n';
    std::unique_ptr<int> second = std::move(first);   // ownership moves
    std::cout << (first == nullptr) << ' ' << *second << '\n';
}   // second releases the int here
