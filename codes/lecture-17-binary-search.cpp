// Lecture 17 · Binary search over a sorted array

#include <cassert>
#include <iostream>

int binarySearch(const int values[], int count, int target) {
    int left = 0;
    int right = count - 1;

    while (left <= right) {
        int middle = left + (right - left) / 2;
        if (values[middle] == target) {
            return middle;
        }
        if (values[middle] < target) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }
    return -1;
}

int binarySearchRecursive(const int values[], int left, int right, int target) {
    if (left > right) {
        return -1;
    }
    int middle = left + (right - left) / 2;
    if (values[middle] == target) {
        return middle;
    }
    if (values[middle] < target) {
        return binarySearchRecursive(values, middle + 1, right, target);
    }
    return binarySearchRecursive(values, left, middle - 1, target);
}

int main() {
    const int values[]{2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    const int count = static_cast<int>(sizeof(values) / sizeof(values[0]));

    assert(binarySearch(values, count, 23) == 5);
    assert(binarySearch(values, count, 24) == -1);
    assert(binarySearchRecursive(values, 0, count - 1, 2) == 0);
    std::cout << "Binary-search tests passed\n";
}
