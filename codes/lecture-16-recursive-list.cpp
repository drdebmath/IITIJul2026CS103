// Lecture 16 · Recursive linked-list reversal
#include <iostream>
#include <memory>

struct Node {
    int value;
    std::unique_ptr<Node> next;
};

std::unique_ptr<Node> reverse(std::unique_ptr<Node> head) {
    if (!head || !head->next) return head;
    auto rest = reverse(std::move(head->next));
    Node* oldTail = rest.get();
    while (oldTail->next) oldTail = oldTail->next.get();
    oldTail->next = std::move(head);
    return rest;
}

int main() {
    auto head = std::make_unique<Node>(Node{1, nullptr});
    head->next = std::make_unique<Node>(Node{2, nullptr});
    head->next->next = std::make_unique<Node>(Node{3, nullptr});

    head = reverse(std::move(head));
    for (Node* node = head.get(); node != nullptr; node = node->next.get()) {
        std::cout << node->value << ' ';
    }
    std::cout << '\n';
}
