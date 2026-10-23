// Lecture 16 · Print a list forward and backward recursively
#include <iostream>

struct Node {
    int value;
    Node* next;
};

void printForward(const Node* p) {
    if (p == nullptr) return;                 // base case: empty list
    std::cout << p->value << ' ';             // print before the call
    printForward(p->next);
}

void printBackward(const Node* p) {
    if (p == nullptr) return;                 // base case: empty list
    printBackward(p->next);                   // recursive case: the rest
    std::cout << p->value << ' ';             // print after the call
}

int main() {
    Node* head = new Node{1, new Node{2, new Node{3, nullptr}}};
    printForward(head);  std::cout << '\n';
    printBackward(head); std::cout << '\n';
    while (head != nullptr) {
        Node* rest = head->next;
        delete head;
        head = rest;
    }
}
