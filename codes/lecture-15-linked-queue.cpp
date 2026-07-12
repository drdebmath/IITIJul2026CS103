// Lecture 15 · Linked queue represented by nodes and free functions
#include <iostream>

struct Node {
    int value;
    Node* next;
};

struct QueueState {
    Node* front = nullptr;
    Node* rear = nullptr;
    int count = 0;
};

bool empty(const QueueState& queue) {
    return queue.front == nullptr;
}

void enqueue(QueueState& queue, int value) {
    Node* node = new Node{value, nullptr};
    if (queue.rear == nullptr) queue.front = queue.rear = node;
    else {
        queue.rear->next = node;
        queue.rear = node;
    }
    ++queue.count;
}

bool dequeue(QueueState& queue, int& removed) {
    if (empty(queue)) return false;
    Node* oldFront = queue.front;
    removed = oldFront->value;
    queue.front = oldFront->next;
    if (queue.front == nullptr) queue.rear = nullptr;
    delete oldFront;
    --queue.count;
    return true;
}

void print(const QueueState& queue) {
    for (Node* node = queue.front; node != nullptr; node = node->next)
        std::cout << node->value << ' ';
    std::cout << '\n';
}

void clear(QueueState& queue) {
    int ignored = 0;
    while (dequeue(queue, ignored)) {}
}

int main() {
    QueueState queue;
    enqueue(queue, 10);
    enqueue(queue, 20);
    enqueue(queue, 30);
    print(queue);

    int value = 0;
    while (dequeue(queue, value)) std::cout << "served=" << value << '\n';
    clear(queue);
}
