// Lecture 20 · A virtual destructor: delete a derived object through a base pointer
#include <iostream>
#include <memory>

class Shape {
public:
    virtual ~Shape() { std::cout << "~Shape()\n"; }   // virtual destructor
    virtual double area() const = 0;
};

class Square : public Shape {
public:
    explicit Square(double s) : side(s) { std::cout << "Square()\n"; }
    ~Square() override { std::cout << "~Square()\n"; }
    double area() const override { return side * side; }
private:
    double side;
};

int main() {
    std::unique_ptr<Shape> p = std::make_unique<Square>(4.0);
    std::cout << "area " << p->area() << '\n';
    std::cout << "end of main\n";
}   // p releases the object through a Shape*: ~Square(), then ~Shape()
