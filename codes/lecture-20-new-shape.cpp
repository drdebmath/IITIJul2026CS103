// Lecture 20 · A new derived class; report() and total() do not change
#include <iostream>
#include <string>

class Shape {
public:
    virtual ~Shape() = default;
    virtual double area() const = 0;
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

void report(const Shape& s) {                  // unchanged
    std::cout << s.name() << " area " << s.area() << '\n';
}

class Triangle : public Shape {                // new: written after report()
public:
    Triangle(double b, double h) : base(b), height(h) {}
    double area() const override { return 0.5 * base * height; }
    std::string name() const override { return "triangle"; }
private:
    double base, height;
};

int main() {
    Square sq(4.0);
    Triangle tr(3.0, 4.0);
    report(sq);
    report(tr);                                // report() was never edited
}
