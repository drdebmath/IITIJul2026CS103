// Lecture 17 · Array-backed heaps and heap sort

#include <iostream>
using namespace std;

// ANSI color codes for highlighting
#define RED "\033[31m"      // Heapify root comparison
#define GREEN "\033[32m"    // Left child larger in heapify
#define YELLOW "\033[33m"   // Swap operations
#define BLUE "\033[34m"     // Right child larger in heapify
#define MAGENTA "\033[35m"  // Min heap operations
#define CYAN "\033[36m"     // Elements being moved/sorted
#define WHITE "\033[37m"    // Already sorted elements
#define BOLD "\033[1m"      // Bold for current operation
#define RESET "\033[0m"

// Forward declarations
void displayArray(int arr[], int n);
void displayArrayWithHighlights(int arr[], int n, int highlight1 = -1, int highlight2 = -1, int highlight3 = -1);
void displayArrayPhased(int arr[], int n, int heapEnd = -1, int swap1 = -1, int swap2 = -1, int activeHeap = -1, int activeSorted = -1);
void heapify(int arr[], int n, int i);

// Heap Functions

// Swap two elements
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// Heapify function - maintain max heap property
void heapify(int arr[], int n, int i) {
    cout << "Heapifying at index " << i << " (value " << arr[i] << "):" << endl;

    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    cout << "Comparing: Root (" << arr[i] << ") with Left child";
    if(left < n) {
        cout << " (" << arr[left] << ")";
        displayArrayWithHighlights(arr, n, i, left);
    } else {
        cout << " (none - out of bounds)";
        displayArray(arr, n);
    }

    // Find largest among root, left, right child
    if(left < n && arr[left] > arr[largest]) {
        cout << GREEN << arr[left] << " > " << arr[i] << " - Left child is larger!" << RESET << endl;
        largest = left;
    } else if(left < n) {
        cout << arr[i] << " >= " << arr[left] << " - Root is larger or equal" << endl;
    }

    cout << "Comparing: Root (" << arr[largest] << ") with Right child";
    if(right < n) {
        cout << " (" << arr[right] << ")";
        displayArrayWithHighlights(arr, n, largest, right);
    } else {
        cout << " (none - out of bounds)";
        displayArray(arr, n);
    }

    if(right < n && arr[right] > arr[largest]) {
        cout << BLUE << arr[right] << " > " << arr[largest] << " - Right child is larger!" << RESET << endl;
        largest = right;
    } else if(right < n) {
        cout << arr[largest] << " >= " << arr[right] << " - Root is larger or equal" << endl;
    }

    // Swap and continue heapifying if root is not largest
    if(largest != i) {
        cout << YELLOW << "Swapping " << arr[i] << " with " << arr[largest] << RESET << endl;
        swap(&arr[i], &arr[largest]);
        displayArrayWithHighlights(arr, n, i, largest);
        heapify(arr, n, largest);
    } else {
        cout << "No swap needed - heap property maintained" << endl;
    }
}

// Build max heap from array
void buildMaxHeap(int arr[], int n) {
    // Start from bottom-rightmost internal node
    for(int i = n/2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
}

// Heap sort algorithm
void heapSort(int arr[], int n) {
    // Build max heap
    buildMaxHeap(arr, n);

    cout << "After building max heap: ";
    displayArray(arr, n);

    // Extract elements from heap one by one
    for(int i = n-1; i > 0; i--) {
        // Move root (largest) to end
        swap(&arr[0], &arr[i]);

        cout << "After moving root to position " << i << ": ";
        displayArray(arr, n);

        // Heapify reduced heap
        heapify(arr, i, 0);

        cout << "After heapifying: ";
        displayArray(arr, n);
        cout << endl;
    }
}

// Enhanced Heap Sort with Phased Visualization
void heapSortWithPhasedHighlights(int arr[], int n) {
    cout << "\n=== PHASE 1: Building Max Heap ===" << endl;
    cout << "Original unsorted array: ";
    displayArrayPhased(arr, n, n-1, -1, -1, -1, -1);

    // Build max heap with minimal output
    for(int i = n/2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    cout << BOLD << GREEN << "✓ Phase 1 Complete:" << RESET << endl;
    displayArrayPhased(arr, n, n-1, -1, -1, -1, -1);
    cout << "     ↑ Heap portion    ↑ Sorted portion (initially empty)" << endl << endl;

    cout << "=== PHASE 2: Heap Extraction & Sort ===" << endl;

    // Extract elements from heap one by one
    for(int i = n-1; i > 0; i--) {
        cout << BOLD << "Iteration " << (n-i) << ":" << RESET << endl;

        // Show current state with heap boundary
        cout << "Before extraction: ";
        displayArrayPhased(arr, n, i, -1, -1, -1, -1);

        // Move root (largest) to end - show swap
        cout << BOLD << YELLOW << "→ Extracting root to sorted position..." << RESET << endl;
        displayArrayPhased(arr, n, i, 0, i, 0, i);  // Highlight swap positions
        swap(&arr[0], &arr[i]);

        cout << "After swap: ";
        displayArrayPhased(arr, n, i-1, -1, -1, -1, i);  // Show new position in sorted

        // Heapify reduced heap - show comparisons quietly
        cout << BOLD << BLUE << "→ Restoring heap property..." << RESET << endl;
        heapify(arr, i, 0);

        cout << GREEN << "After heapify: " << RESET;
        displayArrayPhased(arr, n, i-1, -1, -1, -1, i);
        cout << "     ↑ Reduced heap   ↑ Sorted portion" << endl << endl;
    }

    cout << BOLD << GREEN << "🎉 FINAL SORTED ARRAY:" << RESET << endl;
    displayArrayPhased(arr, n, -1, -1, -1, -1, -1);  // All sorted, highlighted in white
    cout << endl;
}

// Heapify for min heap (if needed)
void heapifyMin(int arr[], int n, int i) {
    int smallest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if(left < n && arr[left] < arr[smallest])
        smallest = left;
    if(right < n && arr[right] < arr[smallest])
        smallest = right;

    if(smallest != i) {
        swap(&arr[i], &arr[smallest]);
        heapifyMin(arr, n, smallest);
    }
}

// Build min heap
void buildMinHeap(int arr[], int n) {
    for(int i = n/2 - 1; i >= 0; i--) {
        heapifyMin(arr, n, i);
    }
}

// Heap sort using min heap
void heapSortMin(int arr[], int n) {
    buildMinHeap(arr, n);
    cout << "Min heap built: ";
    displayArray(arr, n);

    for(int i = n-1; i > 0; i--) {
        swap(&arr[0], &arr[i]); // Move min to end
        heapifyMin(arr, i, 0);    // Heapify reduced heap
    }
}

// Heap operations for dynamic use

// Insert element into max heap
void insertMaxHeap(int arr[], int* n, int value) {
    // Resize array conceptually (assuming enough space)
    arr[*n] = value;
    *n = *n + 1;

    // Bubble up the inserted element
    int i = *n - 1;
    while(i > 0 && arr[i] > arr[(i-1)/2]) {
        swap(&arr[i], &arr[(i-1)/2]);
        i = (i-1)/2;
    }
}

// Extract maximum element from max heap
int extractMax(int arr[], int* n) {
    if(*n == 0) {
        cout << "Heap is empty!" << endl;
        return -1;
    }

    int max = arr[0];
    arr[0] = arr[*n - 1];
    *n = *n - 1;
    heapify(arr, *n, 0);

    return max;
}

// Get maximum element without removing
int getMax(int arr[], int n) {
    if(n == 0) {
        cout << "Heap is empty!" << endl;
        return -1;
    }
    return arr[0];
}

// Heap utility functions

// Display heap as array
void displayArray(int arr[], int n) {
    for(int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

// Display array with highlighted elements (for simple comparisons)
void displayArrayWithHighlights(int arr[], int n, int highlight1, int highlight2, int highlight3) {
    for(int i = 0; i < n; i++) {
        if(i == highlight1) {
            cout << RED << arr[i] << RESET << " ";
        } else if(i == highlight2) {
            cout << GREEN << arr[i] << RESET << " ";
        } else if(i == highlight3) {
            cout << BLUE << arr[i] << RESET << " ";
        } else {
            cout << arr[i] << " ";
        }
    }
    cout << endl;
}

// Enhanced display for heapsort phases
void displayArrayPhased(int arr[], int n, int heapEnd, int swap1, int swap2, int activeHeap, int activeSorted) {
    cout << "[ ";
    for(int i = 0; i < n; i++) {
        string prefix = "";

        // Swap highlights during extraction (highest priority)
        if(i == swap1 || i == swap2) {
            prefix = string(YELLOW) + string(BOLD);
        }
        // Heap portion (being sorted/compared)
        else if(i <= heapEnd) {
            prefix = CYAN;
            if(i == activeHeap) prefix = string(BOLD) + string(RED);  // Current heap operation
        }
        // Already sorted portion
        else if(i > heapEnd) {
            prefix = WHITE;
            if(i == activeSorted) prefix = string(BOLD) + string(WHITE);  // Latest sorted element
        }

        cout << prefix << arr[i] << RESET;

        if(i < n-1) cout << " ";
        else cout << " ";
    }
    cout << "]" << endl;
}

// Heap utilities for phased display
string getColorForIndex(int index, int heapEnd, int activePos, bool isSwap) {
    if(isSwap) return string(YELLOW) + string(BOLD);
    if(index <= heapEnd) {
        if(index == activePos) return string(BOLD) + string(RED);
        return CYAN;
    } else {
        if(index == activePos) return string(BOLD) + string(WHITE);
        return WHITE;
    }
}

// Display heap as tree structure
void displayHeapTree(int arr[], int n, int index = 0, int level = 0) {
    if(index >= n) return;

    // Print right subtree
    displayHeapTree(arr, n, 2*index + 2, level + 1);

    // Print current node with indentation
    for(int i = 0; i < level; i++) cout << "    ";
    cout << arr[index] << endl;

    // Print left subtree
    displayHeapTree(arr, n, 2*index + 1, level + 1);
}

// Check if array represents a valid heap
bool isHeap(int arr[], int n) {
    for(int i = 0; i <= (n-2)/2; i++) {
        if(arr[i] < arr[2*i + 1]) return false;
        if(2*i + 2 < n && arr[i] < arr[2*i + 2]) return false;
    }
    return true;
}

int main() {
    cout << "--- Lecture 11: Heap Data Structure and Heap Sort ---" << endl;

    // Test array for sorting
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);

    cout << "\n--- Enhanced Heap Sort with Phase Visualization ---" << endl;
    cout << "Original array: ";
    displayArray(arr, n);
    cout << endl;

    heapSortWithPhasedHighlights(arr, n);

    // Also demonstrate the regular version for comparison
    cout << "\n--- Traditional Heap Sort (Quiet) ---" << endl;
    int arr_traditional[] = {12, 11, 13, 5, 6, 7};
    heapSort(arr_traditional, sizeof(arr_traditional)/sizeof(arr_traditional[0]));
    cout << endl;

    // Test min heap sort
    cout << "--- Min Heap Sort Demonstration ---" << endl;
    int arr2[] = {64, 34, 25, 12, 22, 11, 90};
    int n2 = sizeof(arr2) / sizeof(arr2[0]);

    cout << "Original array: ";
    displayArray(arr2, n2);

    heapSortMin(arr2, n2);

    cout << "Sorted (min heap): ";
    displayArray(arr2, n2);
    cout << endl;

    // Dynamic heap operations
    cout << "--- Dynamic Heap Operations ---" << endl;
    int heapArr[20]; // Fixed size array for demonstration
    int heapSize = 0;

    // Insert elements
    cout << "Inserting elements into max heap:" << endl;
    int elements[] = {3, 2, 15, 5, 4, 45};
    int numElements = sizeof(elements) / sizeof(elements[0]);

    for(int i = 0; i < numElements; i++) {
        insertMaxHeap(heapArr, &heapSize, elements[i]);
        cout << "After inserting " << elements[i] << ": ";
        displayArray(heapArr, heapSize);
    }

    cout << "\nExtracting maximum elements:" << endl;
    while(heapSize > 0) {
        int max = extractMax(heapArr, &heapSize);
        cout << "Extracted max: " << max << endl;
        cout << "Remaining heap: ";
        displayArray(heapArr, heapSize);
    }

    // Verify heap property
    cout << "\n--- Heap Property Verification ---" << endl;
    int validHeap[] = {45, 15, 5, 4, 3, 2};
    int validHeapSize = sizeof(validHeap) / sizeof(validHeap[0]);

    cout << "Array: ";
    displayArray(validHeap, validHeapSize);
    cout << "Is valid max heap: " << (isHeap(validHeap, validHeapSize) ? "Yes" : "No") << endl;

    // Display heap as tree
    cout << "\nHeap visualized as tree:" << endl;
    displayHeapTree(validHeap, validHeapSize);

    cout << "\n--- Performance Analysis ---" << endl;
    cout << "Build heap: O(n) time" << endl;
    cout << "Heap sort: O(n log n) time complexity" << endl;
    cout << "Space complexity: O(1) auxiliary space (in-place)" << endl;
    cout << "Heap is not stable sort" << endl;

    return 0;
}
