// Lecture 14 · Dynamic memory, ownership, and linked-list examples
//
// Compile: g++ -std=c++17 lecture-09-dynamic-memory-and-lists.cpp -o memory-demo
// This ensures proper support for unique_ptr and other modern C++ features
//
#include <iostream>
#include <new> // for std::bad_alloc
#include <memory> // for smart pointers
#include <cstdlib> // for malloc, free
#include <vector> // for storing pointers in memory leak example

using namespace std;

// ==== Linked List Node Structure ====
struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

// ==== 1. Basic Pointers Recap ====
void pointersRecap() {
    cout << "--- Pointers Recap ---" << endl;

    // Memory size information
    cout << "Size of int: " << sizeof(int) << " bytes" << endl;
    cout << "Size of int*: " << sizeof(int*) << " bytes (pointer size)" << endl;
    cout << "Size of Node: " << sizeof(Node) << " bytes" << endl;
    cout << endl;

    int x = 42;
    int* p = &x;  // p points to x

    cout << "&x (address of x): " << &x << endl;
    cout << "p (address stored): " << p << endl;
    cout << "p == &x: " << (p == &x ? "true" : "false") << endl;
    cout << endl;

    cout << "x = " << x << endl;
    cout << "*p = " << *p << endl;
    cout << endl;

    *p = 100;     // x is now 100
    cout << "After *p = 100;" << endl;
    cout << "x = " << x << " (modified through pointer)" << endl;
    cout << "*p = " << *p << endl;
    cout << endl;
}

// ==== 2. C Style Allocation with malloc/free ====
void cStyleAllocation() {
    cout << "--- C Style Allocation (malloc/free) ---" << endl;

    cout << "Requested: 10 * " << sizeof(int) << " = " << (10 * sizeof(int)) << " bytes" << endl;
    int* arr = (int*) malloc(10 * sizeof(int));  // Allocate 10 ints
    if (arr == nullptr) {
        cout << "Allocation failed!" << endl;
        return;
    }

    cout << "Allocated at: " << static_cast<void*>(arr) << endl;
    cout << "First element address: " << static_cast<void*>(&arr[0]) << endl;
    cout << "Second element address: " << static_cast<void*>(&arr[1]) << endl;
    cout << "Address difference (should be sizeof(int)): " <<
         (reinterpret_cast<char*>(&arr[1]) - reinterpret_cast<char*>(&arr[0])) << " bytes" << endl;
    cout << endl;

    // Use arr...
    for (int i = 0; i < 10; i++) {
        arr[i] = i * 10;
        cout << "arr[" << i << "] = " << arr[i] << " (address: " << static_cast<void*>(&arr[i]) << ")" << endl;
    }

    free(arr);  // Deallocate
    cout << "\nAfter free(), the memory at " << static_cast<void*>(arr) << " is deallocated" << endl;
    arr = nullptr;  // Avoid dangling pointer
    cout << "arr set to nullptr to prevent dangling pointer access" << endl;
    cout << endl;
}

// ==== 3. C++ Style Allocation with new/delete ====
void cppStyleAllocation() {
    cout << "--- C++ Style Allocation (new/delete) ---" << endl;

    cout << "Allocating 10 integers (" << (10 * sizeof(int)) << " bytes)" << endl;
    int* arr = new int[10];  // Allocate array
    cout << "Allocated array starting at: " << static_cast<void*>(arr) << endl;
    cout << endl;

    for (int i = 0; i < 10; i++) {
        arr[i] = i * 20;
        cout << "arr[" << i << "] = " << arr[i]
             << " (address: " << static_cast<void*>(&arr[i]) << ")" << endl;
    }
    cout << endl;

    cout << "Deleting array at " << static_cast<void*>(arr) << endl;
    delete[] arr;  // Deallocate array
    arr = nullptr;
    cout << "arr = " << static_cast<void*>(arr) << endl;
    cout << "Array deleted, arr set to nullptr" << endl;
    cout << endl;
}

// ==== 4. Handling Allocation Failure ====
void handleAllocationFailure() {
    cout << "--- Handling Allocation Failure ---" << endl;
    try {
        // Try to allocate a large array (might fail)
        const size_t largeSize = 1000000000L; // 1 billion ints
        int* huge_array = new int[largeSize];
        cout << "Allocation succeeded (unusual!)" << endl;
        delete[] huge_array;
    } catch (const std::bad_alloc& e) {
        cout << "Allocation failed: " << e.what() << endl;
        cout << "Handle the error gracefully" << endl;
    }
    cout << endl;
}

// ==== 5. Memory Leak Example (BAD PRACTICE) ====
void memoryLeakExample() {
    cout << "--- Memory Leak Example (DO NOT DO THIS) ---" << endl;
    cout << "Each iteration allocates new memory but forgets to deallocate it!" << endl;

    // Store pointers to show what we're losing track of
    vector<int*> leakedPointers;

    for (int i = 0; i < 3; i++) {
        int* p = new int(100 + i);
        leakedPointers.push_back(p);
        cout << "Iteration " << i << ": Allocated " << sizeof(int)
             << " byte(s) at address " << static_cast<void*>(p)
             << " for value " << *p << endl;
        // Forgot to delete p; - MEMORY LEAK!
    }

    cout << endl << "LEAKED ADDRESSES (lost to the program):" << endl;
    for (size_t i = 0; i < leakedPointers.size(); ++i) {
        cout << "  " << static_cast<void*>(leakedPointers[i])
             << " (contains: " << *leakedPointers[i] << ")" << endl;
    }

    cout << "\nThis memory is still allocated in the heap!" << endl;
    cout << "The program has lost all references to these addresses." << endl;
    cout << "Memory leaks occurred! These blocks can't be reused until program ends." << endl;

    // Note: We CAN'T delete them here because we're demonstrating the leak
    // In a real program, we'd have no way to clean these up!
    cout << endl;
}

// ==== 6. Dangling Pointer Example (BAD PRACTICE) ====
void danglingPointerExample() {
    cout << "--- Dangling Pointer Example (DO NOT DO THIS) ---" << endl;
    int* p = new int(42);
    cout << "Allocated int at address: " << static_cast<void*>(p) << endl;
    cout << "p points to: " << *p << endl;
    cout << "Value at address " << static_cast<void*>(p) << " is: " << *p << endl;
    cout << endl;

    cout << "Deleting p - this deallocates the memory at " << static_cast<void*>(p) << endl;
    delete p;
    cout << "Memory deallocated! But p still holds the old address: " << static_cast<void*>(p) << endl;
    cout << "This is called a DANGLING POINTER" << endl;
    cout << endl;

    // This would be UNDEFINED BEHAVIOR:
    // cout << "*p = " << *p << endl;  // Might crash or show garbage values
    // *p = 100;  // Definitely wrong - writing to deallocated memory

    cout << "Good practice: Set p to nullptr after deletion to avoid access" << endl;
    p = nullptr;
    cout << "p now points to: " << static_cast<void*>(p) << endl;
    cout << endl;
}

// ==== 7. Modern C++ Smart Pointers ====
void smartPointersExample() {
    cout << "--- Smart Pointers Example ---" << endl;
    // Unique pointer automatically manages memory
    unique_ptr<int[]> arr = make_unique<int[]>(10);

    for (int i = 0; i < 10; i++) {
        arr[i] = i * 30;
        cout << "arr[" << i << "] = " << arr[i] << endl;
    }

    cout << "Memory automatically freed when unique_ptr goes out of scope" << endl;
    cout << endl;
}

// ==== 8. Linked List Operations ====
void linkedListExample() {
    cout << "--- Linked List Example ---" << endl;
    Node* head = nullptr;  // Empty list initially

    // Insert nodes at front
    cout << "Inserting nodes: 10, 20, 30" << endl;
    head = new Node(10);
    head->next = new Node(20);
    head->next->next = new Node(30);

    // Traverse and print
    Node* current = head;
    cout << "List contents: ";
    while (current != nullptr) {
        cout << current->data << " -> ";
        current = current->next;
    }
    cout << "nullptr" << endl;

    // Clean up memory
    while (head != nullptr) {
        Node* temp = head;
        head = head->next;
        delete temp;
    }
    cout << "Linked list memory deallocated" << endl;
    cout << endl;
}

// ==== 9. Linked List Insert Function ====
void insertFront(Node*& head, int val) {
    Node* new_node = new Node(val);
    new_node->next = head;
    head = new_node;
}

void insertFrontExample() {
    cout << "--- Insert Front Function ---" << endl;
    Node* head = nullptr;

    insertFront(head, 30);
    insertFront(head, 20);
    insertFront(head, 10);

    cout << "List after insertions: ";
    Node* current = head;
    while (current != nullptr) {
        cout << current->data << " -> ";
        current = current->next;
    }
    cout << "nullptr" << endl;

    // Clean up
    while (head != nullptr) {
        Node* temp = head;
        head = head->next;
        delete temp;
    }
    cout << endl;
}

int main() {
    cout << "= Lecture 9: Pointers, Dynamic Memory & Linked Lists =" << endl;
    cout << "Demonstrating various concepts from the lecture" << endl;
    cout << endl;

    pointersRecap();

    cStyleAllocation();

    cppStyleAllocation();

    handleAllocationFailure();

    memoryLeakExample();

    danglingPointerExample();

    smartPointersExample();

    linkedListExample();

    insertFrontExample();

    cout << "= End of Lecture 9 Examples =" << endl;
    return 0;
}
