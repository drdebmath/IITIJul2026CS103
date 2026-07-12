// Lecture 15 · Array-backed stack with a plain state record and free functions
#include <array>
#include <iostream>

constexpr int capacity = 8;

struct StackState {
    std::array<int, capacity> values{};
    int top = -1;
};

bool empty(const StackState& stack) {
    return stack.top < 0;
}

bool push(StackState& stack, int value) {
    if (stack.top + 1 >= capacity) return false;
    stack.values[++stack.top] = value;
    return true;
}

bool pop(StackState& stack, int& removed) {
    if (empty(stack)) return false;
    removed = stack.values[stack.top--];
    return true;
}

bool peek(const StackState& stack, int& value) {
    if (empty(stack)) return false;
    value = stack.values[stack.top];
    return true;
}

void print(const StackState& stack) {
    for (int index = stack.top; index >= 0; --index)
        std::cout << stack.values[index] << ' ';
    std::cout << '\n';
}

int main() {
    StackState stack;
    push(stack, 10);
    push(stack, 20);
    push(stack, 30);
    print(stack);

    int value = 0;
    if (peek(stack, value)) std::cout << "top=" << value << '\n';
    while (pop(stack, value)) std::cout << "popped=" << value << '\n';
}
