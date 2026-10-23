// Lecture 14 · A linked list of nodes
#include <iostream>

struct Node {
    int value;
    Node* next;              // address of the next node, or nullptr
};

int main() {
    Node* second = new Node{20, nullptr};   // the last node: next is nullptr
    Node* head = new Node{10, second};      // head holds the first node's address
    std::cout << head->value << ' ' << head->next->value << '\n';
    std::cout << (head->next->next == nullptr) << '\n';
    delete head;
    delete second;
}
