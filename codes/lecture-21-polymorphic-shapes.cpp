// Lecture 21 · A heterogeneous owning container
#include <iostream>
#include <memory>
#include <vector>

class Shape {
public:
    virtual double area() const = 0;
    virtual ~Shape() = default;
};

class Rectangle : public Shape {
    double width_;
    double height_;
public:
    Rectangle(double width, double height) : width_(width), height_(height) {}
    double area() const override { return width_ * height_; }
};

class Circle : public Shape {
    double radius_;
public:
    explicit Circle(double radius) : radius_(radius) {}
    double area() const override {
        const double pi = 3.141592653589793;
        return pi * radius_ * radius_;
    }
};

int main() {
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Rectangle>(3, 4));
    shapes.push_back(std::make_unique<Circle>(2));

    double total = 0;
    for (const auto& shape : shapes) total += shape->area();
    std::cout << "total-area=" << total << '\n';
}
