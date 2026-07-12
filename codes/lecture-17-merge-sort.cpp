// Lecture 17 · Merge sort using arrays

#include <algorithm>
#include <iostream>
using namespace std;

// Merge Sort Implementation

void displayArray(const int arr[], int n);

// Merge two sorted subarrays
void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    // Create temporary arrays
    int* leftArr = new int[n1];
    int* rightArr = new int[n2];

    // Copy data to temporary arrays
    for(int i = 0; i < n1; i++) {
        leftArr[i] = arr[left + i];
    }
    for(int j = 0; j < n2; j++) {
        rightArr[j] = arr[mid + 1 + j];
    }

    cout << "  Left array: ";
    displayArray(leftArr, n1);
    cout << "  Right array: ";
    displayArray(rightArr, n2);

    // Merge the temporary arrays back into arr[left..right]
    int i = 0; // Initial index of left subarray
    int j = 0; // Initial index of right subarray
    int k = left; // Initial index of merged subarray

    while(i < n1 && j < n2) {
        if(leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }

    // Copy remaining elements of leftArr[] if any
    while(i < n1) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }

    // Copy remaining elements of rightArr[] if any
    while(j < n2) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }

    // Free allocated memory
    delete[] leftArr;
    delete[] rightArr;

    cout << "  Merged array: ";
    displayArray(arr + left, right - left + 1);
}

// Main merge sort function
void mergeSort(int arr[], int left, int right) {
    if(left < right) {
        int mid = left + (right - left) / 2;

        cout << "Splitting array[" << left << ".." << right << "] at mid=" << mid << endl;
        cout << "Left half: ";
        displayArray(arr + left, mid - left + 1);
        cout << "Right half: ";
        displayArray(arr + mid + 1, right - mid);
        cout << endl;

        // Recursively sort left half
        cout << "Sorting left half [" << left << ".." << mid << "]:" << endl;
        mergeSort(arr, left, mid);

        // Recursively sort right half
        cout << "Sorting right half [" << mid + 1 << ".." << right << "]:" << endl;
        mergeSort(arr, mid + 1, right);

        // Merge the sorted halves
        cout << "Merging [" << left << ".." << mid << "] and [" << mid + 1 << ".." << right << "]:" << endl;
        merge(arr, left, mid, right);

        cout << "After merge: ";
        displayArray(arr + left, right - left + 1);
        cout << endl;
    } else {
        cout << "Base case: array[" << left << "] = " << arr[left] << " (already sorted)" << endl;
    }
}

// Non-recursive merge sort (Bottom-up approach)
void mergeSortIterative(int arr[], int n) {
    cout << "\n--- Iterative (Bottom-up) Merge Sort ---" << endl;

    for(int curr_size = 1; curr_size <= n-1; curr_size = 2*curr_size) {
        cout << "\nCurrent group size: " << curr_size << endl;

        for(int left_start = 0; left_start < n-1; left_start += 2*curr_size) {
            int mid = min(left_start + curr_size - 1, n-1);
            int right_end = min(left_start + 2*curr_size - 1, n-1);

            cout << "Merging [" << left_start << ".." << mid << "] and ["
                 << mid + 1 << ".." << right_end << "]" << endl;

            merge(arr, left_start, mid, right_end);
        }
    }
}

// Utility functions

// Display array
void displayArray(const int arr[], int n) {
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

// Count inversions using merge sort (divide and conquer)
long long countInversions(int arr[], int temp[], int left, int right) {
    long long inv_count = 0;

    if(right > left) {
        int mid = left + (right - left) / 2;

        inv_count += countInversions(arr, temp, left, mid);
        inv_count += countInversions(arr, temp, mid + 1, right);

        // Merge arrays and count inversions
        int i = left, j = mid + 1, k = left;

        while((i <= mid) && (j <= right)) {
            if(arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
                inv_count += (mid - i + 1); // Count inversions
            }
        }

        while(i <= mid) {
            temp[k++] = arr[i++];
        }
        while(j <= right) {
            temp[k++] = arr[j++];
        }

        // Copy back to original array
        for(i = left; i <= right; i++) {
            arr[i] = temp[i];
        }
    }

    return inv_count;
}

// Quick merge for external sorting simulation
void externalMerge(int file1[], int file2[], int result[], int n1, int n2) {
    cout << "\n--- External Merge Simulation ---" << endl;
    cout << "File 1: ";
    displayArray(file1, n1);
    cout << "File 2: ";
    displayArray(file2, n2);

    int i = 0, j = 0, k = 0;

    while(i < n1 && j < n2) {
        if(file1[i] <= file2[j]) {
            result[k++] = file1[i++];
        } else {
            result[k++] = file2[j++];
        }
    }

    while(i < n1) {
        result[k++] = file1[i++];
    }
    while(j < n2) {
        result[k++] = file2[j++];
    }

    cout << "Merged result: ";
    displayArray(result, n1 + n2);
}

int main() {
    cout << "--- Lecture 11: Merge Sort Implementation ---" << endl;

    // Test array 1
    int arr1[] = {12, 11, 13, 5, 6, 7};
    int n1 = sizeof(arr1) / sizeof(arr1[0]);

    cout << "\n--- Recursive Merge Sort Demonstration ---" << endl;
    cout << "Original array: ";
    displayArray(arr1, n1);
    cout << endl;

    mergeSort(arr1, 0, n1 - 1);

    cout << "\nFinal sorted array: ";
    displayArray(arr1, n1);
    cout << endl;

    // Test array 2 with detailed steps
    cout << "=====================================" << endl;
    int arr2[] = {38, 27, 43, 3, 9, 82, 10};
    int n2 = sizeof(arr2) / sizeof(arr2[0]);

    cout << "Second example - with detailed tracing:" << endl;
    cout << "Original array: ";
    displayArray(arr2, n2);
    cout << endl;

    mergeSort(arr2, 0, n2 - 1);

    cout << "\nFinal result: ";
    displayArray(arr2, n2);
    cout << endl;

    // Iterative merge sort
    int arr3[] = {64, 34, 25, 12, 22, 11, 90, 5};
    int n3 = sizeof(arr3) / sizeof(arr3[0]);

    cout << "=====================================" << endl;
    cout << "Before iterative merge sort: ";
    displayArray(arr3, n3);

    mergeSortIterative(arr3, n3);

    cout << "\nAfter iterative merge sort: ";
    displayArray(arr3, n3);
    cout << endl;

    // Count inversions
    cout << "=====================================" << endl;
    cout << "--- Counting Inversions ---" << endl;

    int arr4[] = {8, 4, 2, 1};
    int n4 = sizeof(arr4) / sizeof(arr4[0]);
    int* temp = new int[n4];

    cout << "Array for inversion count: ";
    displayArray(arr4, n4);

    long long inversions = countInversions(arr4, temp, 0, n4 - 1);

    cout << "Sorted array: ";
    displayArray(arr4, n4);
    cout << "Number of inversions: " << inversions << endl;

    delete[] temp;

    // External merge simulation
    cout << "=====================================" << endl;
    int file1[] = {1, 3, 5, 7};
    int file2[] = {2, 4, 6, 8};
    int result[8];

    externalMerge(file1, file2, result, 4, 4);

    // Performance analysis
    cout << "\n=====================================" << endl;
    cout << "--- Performance Analysis ---" << endl;
    cout << "Time Complexity: O(n log n) for all cases" << endl;
    cout << "Space Complexity: O(n) auxiliary space" << endl;
    cout << "Stable Sort: Yes" << endl;
    cout << "In-place: No (but can be made partially in-place)" << endl;
    cout << "Parallelizable: Yes" << endl;
    cout << "Uses divide and conquer strategy" << endl << endl;

    // Comparison with other sorts
    cout << "--- Comparison with Other Sorting Algorithms ---" << endl;
    cout << "vs Bubble Sort:  Much faster (O(n log n) vs O(n²))" << endl;
    cout << "vs Quick Sort:   Slower theoretically, but guaranteed O(n log n)" << endl;
    cout << "vs Insertion Sort: Stable and faster on large arrays" << endl;
    cout << "vs Heap Sort:    Stable (heap sort is not stable)" << endl;

    return 0;
}
