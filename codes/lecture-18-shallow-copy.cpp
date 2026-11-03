// Lecture 18 · Shallow copy: the generated copy copies the pointer, so two owners share one array
#include <iostream>
class IntArray {
public: IntArray(int n) : data(new int[n]{}) {}
    ~IntArray() { std::cout << "delete[] " << data << std::endl; delete[] data; }
    void set(int i, int v) { data[i] = v; }
    int get(int i) const { return data[i]; }
private: int* data;   // invariant: this object alone owns the array
};
int main() {
    IntArray a(3);  IntArray b = a;   // shallow copy: b.data == a.data
    b.set(0, 99);  std::cout << a.get(0) << '\n';   // a changed too
}   // b's destructor, then a's: the same array twice
