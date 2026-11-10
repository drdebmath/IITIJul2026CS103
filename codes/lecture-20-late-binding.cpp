// Lecture 20 · Early and late binding: what the compiler knows, what the object knows
#include <iostream>

class Plain {
public:
    int value() const { return x; }
private:
    int x = 0;
};

class Base {
public:
    virtual ~Base() = default;
    void early() const { std::cout << "Base::early\n"; }          // not virtual
    virtual void late() const { std::cout << "Base::late\n"; }    // virtual
    int value() const { return x; }
private:
    int x = 0;
};

class Derived : public Base {
public:
    void early() const { std::cout << "Derived::early\n"; }       // hides Base::early
    void late() const override { std::cout << "Derived::late\n"; }
};

int main() {
    Derived d;
    Base& r = d;      // static type Base&, dynamic type Derived
    r.early();        // early binding: chosen from the type of r
    r.late();         // late binding: chosen from the object
    d.early();
    // Sizes are implementation-specific.
    std::cout << sizeof(Plain) << ' ' << sizeof(Base) << '\n';
}
