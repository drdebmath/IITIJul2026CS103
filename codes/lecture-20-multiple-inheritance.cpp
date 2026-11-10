// Lecture 20 · Multiple inheritance and a virtual base class
#include <iostream>

class Device {
public:
    Device() { std::cout << "Device()\n"; }
    int id = 7;
};

class Printer : public virtual Device {       // virtual base class
public:
    void print() const { std::cout << "print on device " << id << '\n'; }
};

class Scanner : public virtual Device {
public:
    void scan() const { std::cout << "scan on device " << id << '\n'; }
};

class Copier : public Printer, public Scanner {};   // multiple inheritance

int main() {
    Copier c;          // Device() runs once: one shared Device part
    c.print();
    c.scan();
    std::cout << c.id << '\n';
    // Without the word virtual: Device() runs twice, and
    // c.id is an error: non-static member 'id' found in multiple base-class subobjects
}
