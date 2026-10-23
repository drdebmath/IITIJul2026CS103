// Lecture 16 · Reverse a linked list recursively
#include <iostream>

struct Node {
    int value;
    Node* next;
};

Node* reverse(Node* head) {
    if (head == nullptr || head->next == nullptr) return head;   // 0 or 1 node
    Node* newHead = reverse(head->next);      // reverse the rest
    head->next->next = head;                  // the old second node now points back
    head->next = nullptr;                     // head becomes the last node
    return newHead;
}

void print(const Node* p) {
    for (; p != nullptr; p = p->next) std::cout << p->value << ' ';
    std::cout << '\n';
}

int main() {
    Node* head = new Node{1, new Node{2, new Node{3, new Node{4, nullptr}}}};
    print(head);
    head = reverse(head);
    print(head);
    while (head != nullptr) { Node* rest = head->next; delete head; head = rest; }
}
