// Lecture 14 · Build and summarize a linked list
#include <iostream>

struct Node {
    int value;
    Node* next;
};

Node* pushFront(Node* head, int value) {
    return new Node{value, head};           // the new node points at the old head
}

int sum(const Node* head) {
    int total = 0;
    for (const Node* current = head; current != nullptr; current = current->next) {
        total += current->value;            // every node before current has been added
    }
    return total;
}

void release(Node* head) {
    while (head != nullptr) {
        Node* rest = head->next;            // save the link before the node dies
        delete head;
        head = rest;
    }
}

int main() {
    Node* head = nullptr;
    for (int reading : {31, 29, 33, 30}) {
        head = pushFront(head, reading);
    }
    for (const Node* n = head; n != nullptr; n = n->next) std::cout << n->value << ' ';
    std::cout << '\n';
    std::cout << "sum " << sum(head) << '\n';
    release(head);
    head = nullptr;
    std::cout << "empty sum " << sum(head) << '\n';
}
