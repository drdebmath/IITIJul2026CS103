// Lecture 17 · Binary search, iterative and recursive

#include <iostream>
using namespace std;

// Binary Search Functions

// Iterative binary search
int binarySearchIterative(int arr[], int size, int target) {
    int left = 0;
    int right = size - 1;

    while(left <= right) {
        int mid = left + (right - left) / 2;

        if(arr[mid] == target) {
            return mid; // Found at index mid
        } else if(arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    return -1; // Not found
}

// Recursive binary search
int binarySearchRecursive(int arr[], int left, int right, int target) {
    if(right >= left) {
        int mid = left + (right - left) / 2;

        if(arr[mid] == target) {
            return mid; // Found at index mid
        }

        if(arr[mid] > target) {
            return binarySearchRecursive(arr, left, mid - 1, target);
        }

        return binarySearchRecursive(arr, mid + 1, right, target);
    }

    return -1; // Not found
}

// Function to find first occurrence in array with duplicates
int findFirstOccurrence(int arr[], int size, int target) {
    int left = 0;
    int right = size - 1;
    int result = -1;

    while(left <= right) {
        int mid = left + (right - left) / 2;

        if(arr[mid] == target) {
            result = mid;
            right = mid - 1; // Look for earlier occurrences
        } else if(arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return result;
}

// Function to find last occurrence in array with duplicates
int findLastOccurrence(int arr[], int size, int target) {
    int left = 0;
    int right = size - 1;
    int result = -1;

    while(left <= right) {
        int mid = left + (right - left) / 2;

        if(arr[mid] == target) {
            result = mid;
            left = mid + 1; // Look for later occurrences
        } else if(arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return result;
}

// Helper function to display array
void displayArray(int arr[], int size) {
    for(int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    cout << "--- Lecture 11: Advanced Search Algorithms ---" << endl;

    // Sorted array for binary search (array must be sorted for binary search)
    int sortedArr[] = {2, 5, 8, 12, 16, 23, 23, 38, 56, 72, 91};
    int arrSize = sizeof(sortedArr) / sizeof(sortedArr[0]);

    cout << "Sorted array: ";
    displayArray(sortedArr, arrSize);

    // Test iterative binary search
    cout << "\n--- Iterative Binary Search ---" << endl;
    int target1 = 23;
    int result1 = binarySearchIterative(sortedArr, arrSize, target1);
    if(result1 != -1) {
        cout << "Iterative search: " << target1 << " found at index " << result1 << endl;
    } else {
        cout << "Iterative search: " << target1 << " not found" << endl;
    }

    // Test recursive binary search
    cout << "\n--- Recursive Binary Search ---" << endl;
    int result2 = binarySearchRecursive(sortedArr, 0, arrSize - 1, target1);
    if(result2 != -1) {
        cout << "Recursive search: " << target1 << " found at index " << result2 << endl;
    } else {
        cout << "Recursive search: " << target1 << " not found" << endl;
    }

    // Test with element not in array
    cout << "\n--- Element Not Found ---" << endl;
    int target2 = 100;
    int result3 = binarySearchIterative(sortedArr, arrSize, target2);
    if(result3 != -1) {
        cout << "Search: " << target2 << " found at index " << result3 << endl;
    } else {
        cout << "Search: " << target2 << " not found" << endl;
    }

    // Test first and last occurrence with duplicates
    cout << "\n--- Handling Duplicates ---" << endl;
    int target3 = 23; // appears twice in the array
    int first = findFirstOccurrence(sortedArr, arrSize, target3);
    int last = findLastOccurrence(sortedArr, arrSize, target3);

    if(first != -1) {
        cout << "First occurrence of " << target3 << " at index " << first << endl;
        cout << "Last occurrence of " << target3 << " at index " << last << endl;
        cout << "Total occurrences: " << (last - first + 1) << endl;
    }

    // Performance comparison with linear search (from lecture 10)
    cout << "\n--- Performance Comparison ---" << endl;
    cout << "Array size: " << arrSize << " elements" << endl;
    cout << "Binary search: O(log n) = O(" << (int)(log2(arrSize) + 1) << ")" << endl;
    cout << "Linear search: O(n) = O(" << arrSize << ")" << endl;
    cout << "Efficiency ratio: " << arrSize << " / " << (int)(log2(arrSize) + 1)
         << " = " << (arrSize / (int)(log2(arrSize) + 1)) << "x faster" << endl;

    return 0;
}
