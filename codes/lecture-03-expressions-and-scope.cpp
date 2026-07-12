// Lecture 3 · Expressions, namespaces, and scope
#include <iostream>

int globalVar = 100; // Global scope
// ==== 3. Namespaces Example ====
namespace MyMath {
    int add(int a, int b) {
        return a + b;
    }
}

int main() {
    // ==== 1. Basic Program Structure (Variant 1) ====
    std::cout << "--- Hello World (std::cout) ---" << std::endl;
    std::cout << "Hello, World!" << std::endl;

    // ==== 2. Basic Program Structure (Variant 2) ====
    std::cout << "--- Hello World (using namespace std) ---" << std::endl;
    using namespace std;
    cout << "Hello, World!" << endl;

    cout << "--- Namespace Example ---" << endl;
    int result = MyMath::add(5, 3);
    cout << "MyMath::add(5,3) = " << result << endl;

    // ==== 4. Operators Example ====
    cout << "--- Operators Example ---" << endl;
    int x = 5 + 3 * 2;      // precedence: multiplication first
    int y = (5 + 3) * 2;    // parentheses override precedence
    cout << "Without parentheses: " << x << endl;
    cout << "With parentheses: " << y << endl;

    // ==== 5. Scope Example ====
    cout << "--- Scope Example ---" << endl;
    {
        int localVar = 10; // Local to this block
        cout << "Local: " << localVar << endl;
        cout << "Global: " << globalVar << endl;
    }
    cout << "Global from main: " << globalVar << endl;

    return 0;
}
