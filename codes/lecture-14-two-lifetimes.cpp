// Lecture 14 · A local object and a free-store object
#include <iostream>

int* makeOnHeap() {
    int* p = new int{42};        // dynamic: lives until delete
    return p;
}

int main() {
    int local = 7;               // automatic: destroyed at the closing brace
    int* heap = makeOnHeap();    // the function ended, the object did not
    std::cout << local << ' ' << *heap << '\n';
    delete heap;                 // the owner releases it
    heap = nullptr;
}
