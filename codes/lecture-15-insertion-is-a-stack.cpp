// Lecture 15 · Insertion at the head is a stack
#include <iostream>

struct Node {
    int value;
    Node* next;
};

int main() {
    Node* head = nullptr;
    for (int reading : {31, 29, 33, 30}) head = new Node{reading, head};   // insert at the head
    // list: 30 33 29 31  -- the last reading inserted is the first in the list
    for (const Node* n = head; n != nullptr; n = n->next) std::cout << n->value << ' ';  // added: print the list
    std::cout << '\n';
    while (head != nullptr) {  // added: release the list
        Node* rest = head->next;
        delete head;
        head = rest;
    }
}
