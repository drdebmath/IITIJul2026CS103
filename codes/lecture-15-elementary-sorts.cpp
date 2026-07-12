// Lecture 15 · Elementary in-place sorting algorithms

#include <iostream>
using namespace std;

// Function to display array
void displayArray(int arr[], int size) {
    for(int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

// Bubble Sort
void bubbleSort(int arr[], int n) {
    cout << "Bubble Sort Steps:" << endl;
    for(int i = 0; i < n-1; i++) {
        cout << "Pass " << (i+1) << ": ";
        for(int j = 0; j < n-i-1; j++) {
            if(arr[j] > arr[j+1]) {
                // Swap
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
        displayArray(arr, n);
    }
}

// Selection Sort
void selectionSort(int arr[], int n) {
    cout << "Selection Sort Steps:" << endl;
    for(int i = 0; i < n-1; i++) {
        int minIndex = i;
        for(int j = i+1; j < n; j++) {
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // Swap
        int temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;

        cout << "After pass " << (i+1) << ": ";
        displayArray(arr, n);
    }
}

// Insertion Sort
void insertionSort(int arr[], int n) {
    cout << "Insertion Sort Steps:" << endl;
    for(int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        while(j >= 0 && arr[j] > key) {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = key;

        cout << "After inserting " << key << ": ";
        displayArray(arr, n);
    }
}

int main() {
    int original[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(original) / sizeof(original[0]);

    cout << "--- Sorting Algorithms Demo ---" << endl;
    cout << "Original array: ";
    displayArray(original, n);
    cout << endl;

    // Bubble Sort
    int arr1[7];
    for(int i = 0; i < 7; i++) arr1[i] = original[i];
    bubbleSort(arr1, n);
    cout << "Final sorted (Bubble): ";
    displayArray(arr1, n);
    cout << endl;

    // Selection Sort
    int arr2[7];
    for(int i = 0; i < 7; i++) arr2[i] = original[i];
    selectionSort(arr2, n);
    cout << "Final sorted (Selection): ";
    displayArray(arr2, n);
    cout << endl;

    // Insertion Sort
    int arr3[7];
    for(int i = 0; i < 7; i++) arr3[i] = original[i];
    insertionSort(arr3, n);
    cout << "Final sorted (Insertion): ";
    displayArray(arr3, n);
    cout << endl;

    // Compare time complexities
    cout << "--- Time Complexity Comparison ---" << endl;
    cout << "Bubble Sort: O(n²) - Always" << endl;
    cout << "Selection Sort: O(n²) - Always" << endl;
    cout << "Insertion Sort: O(n²) worst case, O(n) best case" << endl;
    cout << "All three use nested loops from Module 3!" << endl;

    return 0;
}
