// Lecture 3 · Static storage duration and external linkage
#include <iostream>
using namespace std;

// ==== 6. static inside function ====
void counter() {
    static int count = 0; // persists between calls
    count++;
    cout << "Called " << count << " times." << endl;
}

// ==== 7. extern example ====
extern int sharedData; // Declaration of variable defined in examples2_data.cpp

void useSharedData() {
    cout << "Shared Data value: " << sharedData << endl;
}

int main() {
    cout << "--- Static Variable Example ---" << endl;
    counter();
    counter();

    cout << "--- Extern Variable Example ---" << endl;
    useSharedData();

    return 0;
}
