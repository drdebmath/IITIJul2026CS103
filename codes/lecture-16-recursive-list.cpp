// Lecture 16 · Recursive linked-list reversal
#include <iostream>

struct Node {
    int value;
    Node* next;
};

Node* reverse(Node* head) {
    if (head == nullptr || head->next == nullptr) return head;
    Node* newHead = reverse(head->next);
    head->next->next = head;
    head->next = nullptr;
    return newHead;
}

int main() {
    Node* head = new Node{1, nullptr};
    head->next = new Node{2, nullptr};
    head->next->next = new Node{3, nullptr};

    head = reverse(head);
    for (Node* node = head; node != nullptr; node = node->next) {
        std::cout << node->value << ' ';
    }
    std::cout << '\n';

    while (head != nullptr) {
        Node* next = head->next;
        delete head;
        head = next;
    }
}
