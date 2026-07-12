// Lecture 15 · Circular-array queue applied to student records
#include <array>
#include <iostream>
#include <string>

struct Student {
    std::string name;
    int rollNumber;
    double marks;
};

constexpr int capacity = 5;

struct QueueState {
    std::array<Student, capacity> values{};
    int front = 0;
    int count = 0;
};

bool enqueue(QueueState& queue, const Student& student) {
    if (queue.count == capacity) return false;
    const int rear = (queue.front + queue.count) % capacity;
    queue.values[rear] = student;
    ++queue.count;
    return true;
}

bool dequeue(QueueState& queue, Student& removed) {
    if (queue.count == 0) return false;
    removed = queue.values[queue.front];
    queue.front = (queue.front + 1) % capacity;
    --queue.count;
    return true;
}

int main() {
    QueueState helpDesk;
    enqueue(helpDesk, {"Asha", 101, 88.5});
    enqueue(helpDesk, {"Bilal", 102, 91.0});
    enqueue(helpDesk, {"Chen", 103, 76.5});

    Student student;
    while (dequeue(helpDesk, student))
        std::cout << student.rollNumber << ' ' << student.name << '\n';
}
