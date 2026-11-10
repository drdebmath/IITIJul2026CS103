// Lecture 20 · A factory function: one place chooses the derived class
#include <iostream>
#include <memory>
#include <string>

class Shape {
public:
    virtual ~Shape() = default;
    virtual double area() const = 0;
};

class Square : public Shape {
public:
    explicit Square(double s) : side(s) {}
    double area() const override { return side * side; }
private:
    double side;
};

class Circle : public Shape {
public:
    explicit Circle(double r) : radius(r) {}
    double area() const override { return 3.14159 * radius * radius; }
private:
    double radius;
};

// Returns a null pointer for an unknown kind.
std::unique_ptr<Shape> makeShape(char kind, double size) {
    if (kind == 's') return std::make_unique<Square>(size);
    if (kind == 'c') return std::make_unique<Circle>(size);
    return nullptr;
}

int main() {
    for (char kind : std::string("scx")) {
        std::unique_ptr<Shape> p = makeShape(kind, 2.0);
        if (p) std::cout << kind << ": area " << p->area() << '\n';
        else   std::cout << kind << ": unknown kind\n";
    }
}
