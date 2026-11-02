// Lecture 18 · Copy constructor and copy assignment give each object its own array
#include <algorithm>
#include <iostream>
class IntArray {
public:
    IntArray(int n) : size(n), data(new int[n]{}) {}
    IntArray(const IntArray& other) : size(other.size), data(new int[other.size]) {
        std::copy(other.data, other.data + size, data);       // copy constructor
    }
    IntArray& operator=(const IntArray& other) {
        if (this == &other) return *this;             // a = a: nothing to do
        int* fresh = new int[other.size];
        std::copy(other.data, other.data + other.size, fresh);
        delete[] data;  data = fresh;  size = other.size;   // release old array
        return *this;
    }
    ~IntArray() { delete[] data; }
    void set(int i, int v) { data[i] = v; }
    int get(int i) const { return data[i]; }
private:
    int size;
    int* data;   // invariant: points to this object's own array of size ints
};
int main() {
    IntArray a(3);
    IntArray b = a;            // copy construction: b is new
    IntArray c(5);
    c = a;                     // copy assignment: c already exists
    b.set(0, 99);
    std::cout << a.get(0) << ' ' << b.get(0) << ' ' << c.get(0) << '\n';
}
