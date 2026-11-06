// Lecture 19 · Base first, then data members, then the derived constructor body
#include <iostream>
#include <string>

class Tag {                              // from Lecture 18
public:
    Tag(std::string n) : name(n) { std::cout << "construct " << name << '\n'; }
    ~Tag() { std::cout << "destroy " << name << '\n'; }
private:
    std::string name;
};

class BinaryTree {
public:
    BinaryTree() { std::cout << "BinaryTree()\n"; }
    ~BinaryTree() { std::cout << "~BinaryTree()\n"; }
};

class SearchTree : public BinaryTree {
public:
    SearchTree() : label("label") { std::cout << "SearchTree()\n"; }
    ~SearchTree() { std::cout << "~SearchTree()\n"; }
private:
    Tag label;                           // a data member of the derived class
};

int main() {
    SearchTree t;
    std::cout << "end of main\n";
}
