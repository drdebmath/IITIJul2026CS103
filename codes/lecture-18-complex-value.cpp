#include <iostream>
using namespace std;

class Complex {
private:
    double real, imag;

public:
    Complex(double r = 0, double i = 0) : real(r), imag(i) {}

    Complex operator+(const Complex& other) const {
        Complex temp;
        temp.real = real + other.real;
        temp.imag = imag + other.imag;
        return temp;
    }

    Complex& operator++() {  // prefix ++
        real += 1;
        imag += 1;
        return *this;
    }

    void display() const {
        cout << real << " + " << imag << "i" << endl;
    }
};

int main() {
    Complex a(1, 2), b(3, 4);
    Complex c = a + b;
    ++a;

    c.display();  // 4 + 6i
    a.display();  // 2 + 3i
    return 0;
}
