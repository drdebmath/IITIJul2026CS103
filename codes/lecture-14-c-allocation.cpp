// Lecture 14 · Exploring C allocation: malloc, calloc, realloc, and free
//
// Compile: g++ -std=c++17 lecture-09-c-allocation.cpp -o allocation-demo
//
#include <iostream>
#include <cstdlib>  // for malloc, calloc, realloc, free
#include <cstring>  // for memset, memcpy

using namespace std;

// ==== Helper Function to Print Array Contents ====
void printArray(int* arr, size_t size, const char* label) {
    cout << label << ": [";
    for (size_t i = 0; i < size; ++i) {
        cout << arr[i];
        if (i < size - 1) cout << ", ";
        else cout << "]" << endl;
    }
}

// ==== Helper Function to Print Array Addresses ====
void printArrayAddresses(int* arr, size_t size, const char* label) {
    cout << label << " addresses:" << endl;
    for (size_t i = 0; i < size; ++i) {
        cout << "  &arr[" << i << "] = " << static_cast<void*>(&arr[i]);
        if (i < size - 1 && i < 3) cout << endl; // Limit output for readability
        else {
            if (i >= 3 && i < size - 1) cout << " ...";
            cout << endl;
            break;
        }
    }
}

// ==== 1. malloc() Example ====
void demonstrate_malloc() {
    cout << "=== 1. malloc() - Allocates Uninitialized Memory ===" << endl;
    cout << endl;

    cout << "Basic syntax: void* malloc(size_t size);" << endl;
    cout << "Allocates SIZE bytes of uninitialized memory." << endl;
    cout << "Returns NULL on failure." << endl;
    cout << "Need to cast to desired pointer type." << endl;
    cout << endl;

    // Allocate memory for 5 integers
    size_t requested_size = 5 * sizeof(int);
    cout << "Requesting: " << requested_size << " bytes (" << 5 << " * " << sizeof(int) << ")" << endl;

    int* arr = (int*) malloc(requested_size);
    if (arr == nullptr) {
        cout << "malloc failed! Exiting..." << endl;
        return;
    }

    cout << "Allocated at address: " << static_cast<void*>(arr) << endl;
    printArrayAddresses(arr, 5, "malloc array");
    cout << endl;

    // Show uninitialized content (contains garbage values)
    cout << "Content before initialization (garbage values):" << endl;
    printArray(arr, 5, "Uninitialized array");
    cout << "Notice: Values are whatever was in memory before!" << endl;
    cout << endl;

    // Initialize the array manually
    for (int i = 0; i < 5; i++) {
        arr[i] = i * 10;
    }
    cout << "After manual initialization:" << endl;
    printArray(arr, 5, "Manually initialized array");
    cout << endl;

    // Free the memory
    cout << "Freeing memory with free(arr);" << endl;
    free(arr);
    cout << "Memory deallocated." << endl;
    cout << endl;
}

// ==== 2. calloc() Example ====
void demonstrate_calloc() {
    cout << "=== 2. calloc() - Allocates Zero-initialized Memory ===" << endl;
    cout << endl;

    cout << "Basic syntax: void* calloc(size_t num_elements, size_t element_size);" << endl;
    cout << "Allocates NUM_ELEMENTS * ELEMENT_SIZE bytes of ZERO-initialized memory." << endl;
    cout << "Automatically initializes all bytes to zero!" << endl;
    cout << "Returns NULL on failure." << endl;
    cout << "Need to cast to desired pointer type." << endl;
    cout << endl;

    // Allocate memory for 5 integers with zero initialization
    size_t num_elements = 5;
    cout << "Requesting: " << num_elements << " elements * " << sizeof(int)
         << " bytes = " << (num_elements * sizeof(int)) << " bytes total" << endl;

    int* arr = (int*) calloc(num_elements, sizeof(int));
    if (arr == nullptr) {
        cout << "calloc failed! Exiting..." << endl;
        return;
    }

    cout << "Allocated at address: " << static_cast<void*>(arr) << endl;
    printArrayAddresses(arr, 5, "calloc array");
    cout << endl;

    // Show initialized content (all zero)
    cout << "Content after calloc (automatically zero-initialized):" << endl;
    printArray(arr, 5, "Zero-initialized array");
    cout << "Notice: All values are 0 by default!" << endl;
    cout << endl;

    // Modify some values
    for (int i = 0; i < 5; i++) {
        arr[i] = (i + 1) * 100;
    }
    cout << "After modification:" << endl;
    printArray(arr, 5, "Modified array");
    cout << endl;

    // Free the memory
    cout << "Freeing memory with free(arr);" << endl;
    free(arr);
    cout << "Memory deallocated." << endl;
    cout << endl;
}

// ==== 3. realloc() Example ====
void demonstrate_realloc() {
    cout << "=== 3. realloc() - Changes Size of Previously Allocated Memory ===" << endl;
    cout << endl;

    cout << "Basic syntax: void* realloc(void* ptr, size_t new_size);" << endl;
    cout << "Changes the size of the memory block pointed to by PTR to NEW_SIZE bytes." << endl;
    cout << "May move the memory block to a new location if needed!" << endl;
    cout << "Returns NULL on failure (original memory is NOT freed automatically)." << endl;
    cout << "Returns new pointer (which may be the same if size is reduced)." << endl;
    cout << endl;

    // Start with malloc allocation
    cout << "Step 1: Allocate initial memory with malloc(5 * sizeof(int))" << endl;
    int* arr = (int*) malloc(5 * sizeof(int));
    if (arr == nullptr) {
        cout << "malloc failed! Exiting..." << endl;
        return;
    }

    cout << "Initial allocation at: " << static_cast<void*>(arr) << endl;
    for (int i = 0; i < 5; i++) {
        arr[i] = (i + 1) * 10;
    }
    printArray(arr, 5, "Initial array");
    cout << endl;

    // Use realloc to INCREASE size
    cout << "Step 2: Increase size with realloc(10 * sizeof(int))" << endl;
    cout << "Contents may be copied to new location!" << endl;
    int* resized_arr = (int*) realloc(arr, 10 * sizeof(int));
    if (resized_arr == nullptr) {
        cout << "realloc failed! Original array is still intact." << endl;
        free(arr);
        return;
    }

    arr = resized_arr; // Update our pointer
    cout << "After realloc: new address = " << static_cast<void*>(arr) << endl;

    // Initialize new elements
    for (int i = 5; i < 10; i++) {
        arr[i] = (i + 1) * 10;
    }
    printArray(arr, 10, "Expanded array");
    cout << "Notice: Original elements preserved, new elements are uninitialized!" << endl;
    cout << endl;

    // Use realloc to DECREASE size
    cout << "Step 3: Decrease size with realloc(3 * sizeof(int))" << endl;
    resized_arr = (int*) realloc(arr, 3 * sizeof(int));
    if (resized_arr == nullptr) {
        cout << "realloc failed! Original array is still intact." << endl;
        free(arr);
        return;
    }

    arr = resized_arr;
    cout << "After shrinking: new address = " << static_cast<void*>(arr) << endl;
    printArray(arr, 3, "Shrunk array");
    cout << "Notice: First 3 elements preserved (10, 20, 30)" << endl;
    cout << endl;

    // Free the final allocation
    cout << "Freeing final allocation with free(arr);" << endl;
    free(arr);
    cout << "Memory deallocated." << endl;
    cout << endl;
}

// ==== 4. When to Use Each Function ====
void usage_comparison() {
    cout << "=== 4. When to Use Each Function ===" << endl;
    cout << endl;

    cout << "MALLOC: Use when..." << endl;
    cout << "  - You need memory but don't care about initial values" << endl;
    cout << "  - Speed is critical (no initialization overhead)" << endl;
    cout << "  - You'll immediately initialize the memory yourself" << endl;
    cout << "  - Example: Loading file data where you'll overwrite immediately" << endl;
    cout << endl;

    cout << "CALLOC: Use when..." << endl;
    cout << "  - You need zero-initialized memory" << endl;
    cout << "  - Safety is important (prevents undefined behavior)" << endl;
    cout << "  - You're implementing data structures that rely on zero values" << endl;
    cout << "  - Example: Arrays/structures where 0 is meaningful" << endl;
    cout << endl;

    cout << "REALLOC: Use when..." << endl;
    cout << "  - You need to change the size of existing dynamic memory" << endl;
    cout << "  - Implementing dynamic arrays or buffers" << endl;
    cout << "  - The new size requirement is unpredictable at allocation time" << endl;
    cout << "  - Example: Reading variable-length input or building strings" << endl;
    cout << endl;

    cout << "IMPORTANT NOTES:" << endl;
    cout << "  - Always check for NULL after malloc/calloc/realloc!" << endl;
    cout << "  - realloc can move memory, always use the returned pointer!" << endl;
    cout << "  - If realloc fails, original pointer remains valid" << endl;
    cout << "  - Manual malloc deallocation can be error-prone" << endl;
    cout << "  - Consider C++ alternatives: new/delete or smart pointers" << endl;
    cout << endl;
}

// ==== Demonstration with memory tracing ====
void memory_tracing_demo() {
    cout << "=== 5. Memory Tracing Demonstration ===" << endl;
    cout << endl;

    cout << "Tracking memory operations step by step:" << endl;
    cout << endl;

    int* original = (int*) malloc(3 * sizeof(int));
    cout << "1. malloc(3) -> " << static_cast<void*>(original) << endl;

    for (int i = 0; i < 3; i++) {
        original[i] = (i + 1) * 100;
        cout << "   Setting [" << i << "] = " << original[i] << endl;
    }
    printArray(original, 3, "Original array");

    int* expanded = (int*) realloc(original, 6 * sizeof(int));
    cout << "2. realloc to 6 -> " << static_cast<void*>(expanded) << endl;

    if (expanded != nullptr) {
        cout << "   Note: " << (expanded == original ? "Memory stayed in place" : "Memory was moved!") << endl;

        // Initialize new elements
        for (int i = 3; i < 6; i++) {
            expanded[i] = (i + 1) * 100;
        }
        printArray(expanded, 6, "Expanded array");

        int* shrunk = (int*) realloc(expanded, 2 * sizeof(int));
        cout << "3. realloc to 2 -> " << static_cast<void*>(shrunk) << endl;

        if (shrunk != nullptr) {
            cout << "   Note: " << (shrunk == expanded ? "Memory stayed in place" : "Memory was moved!") << endl;
            printArray(shrunk, 2, "Final shrinked array");

            free(shrunk);
            cout << "4. Final free() completed" << endl;
        }
    }
    cout << endl;
}

int main() {
    cout << "= Lecture 9.1: C Memory Allocation Functions =" << endl;
    cout << "Comparing malloc, calloc, and realloc" << endl;
    cout << endl;

    cout << "Memory size on this system: int = " << sizeof(int) << " bytes" << endl;
    cout << "Memory allocation block size may be larger due to alignment" << endl;
    cout << endl;

    demonstrate_malloc();

    demonstrate_calloc();

    demonstrate_realloc();

    usage_comparison();

    memory_tracing_demo();

    cout << "= End of Memory Allocation Functions Demo =" << endl;
    return 0;
}
