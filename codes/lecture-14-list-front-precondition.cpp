// Lecture 14 · A list function has a pre-condition
#include <cassert>
#include <iostream>

struct Node {
    int value;
    Node* next;
};

// pre-condition: head != nullptr
int front(const Node* head) {
    assert(head != nullptr);
    return head->value;
}

int main() {
    Node a{5, nullptr};
    std::cout << front(&a) << std::endl;
    Node* empty = nullptr;
    std::cout << front(empty) << std::endl;   // violates the pre-condition
}
