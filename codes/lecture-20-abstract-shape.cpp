// Lecture 20 · An abstract class: pure virtual functions form an interface
#include <iostream>
#include <string>

class Shape {                                  // abstract class
public:
    virtual ~Shape() = default;
    virtual double area() const = 0;           // pure virtual function
    virtual std::string name() const = 0;
};

class Square : public Shape {
public:
    explicit Square(double s) : side(s) {}
    double area() const override { return side * side; }
    std::string name() const override { return "square"; }
private:
    double side;
};

class Circle : public Shape {
public:
    explicit Circle(double r) : radius(r) {}
    double area() const override { return 3.14159 * radius * radius; }
    std::string name() const override { return "circle"; }
private:
    double radius;
};

void report(const Shape& s) {                  // written once, for every shape
    std::cout << s.name() << " area " << s.area() << '\n';
}

int main() {
    Square sq(4.0);
    Circle c(1.0);
    report(sq);
    report(c);
    // Shape s;   // error: variable type 'Shape' is an abstract class
}
