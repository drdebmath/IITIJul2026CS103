// Lecture 17 · Array-backed max heap and heap sort
// Uses only arrays, functions, loops, recursion, and comparisons introduced
// by this point in the course.
#include <iostream>

void swapValues(int& left, int& right) {
    int temporary = left;
    left = right;
    right = temporary;
}

void siftDown(int values[], int size, int root) {
    while (true) {
        int largest = root;
        int left = 2 * root + 1;
        int right = 2 * root + 2;

        if (left < size && values[left] > values[largest]) largest = left;
        if (right < size && values[right] > values[largest]) largest = right;
        if (largest == root) return;

        swapValues(values[root], values[largest]);
        root = largest;
    }
}

void buildMaxHeap(int values[], int size) {
    for (int root = size / 2 - 1; root >= 0; --root)
        siftDown(values, size, root);
}

void heapSort(int values[], int size) {
    buildMaxHeap(values, size);
    for (int end = size - 1; end > 0; --end) {
        swapValues(values[0], values[end]);
        siftDown(values, end, 0);
    }
}

bool isMaxHeap(const int values[], int size) {
    for (int child = 1; child < size; ++child) {
        int parent = (child - 1) / 2;
        if (values[parent] < values[child]) return false;
    }
    return true;
}

bool insertMaxHeap(int values[], int& size, int capacity, int value) {
    if (size >= capacity) return false;
    int child = size;
    values[size++] = value;
    while (child > 0) {
        int parent = (child - 1) / 2;
        if (values[parent] >= values[child]) break;
        swapValues(values[parent], values[child]);
        child = parent;
    }
    return true;
}

void print(const int values[], int size) {
    for (int index = 0; index < size; ++index)
        std::cout << values[index] << ' ';
    std::cout << '\n';
}

int main() {
    int heap[10]{12, 11, 13, 5, 6, 7};
    int size = 6;

    buildMaxHeap(heap, size);
    std::cout << "max-heap=" << isMaxHeap(heap, size) << '\n';
    print(heap, size);

    insertMaxHeap(heap, size, 10, 20);
    std::cout << "after insert: ";
    print(heap, size);

    heapSort(heap, size);
    std::cout << "ascending: ";
    print(heap, size);
}
