// Lecture 19 · A Library has a SearchTree; it is not a SearchTree
#include <iostream>
#include <memory>
#include <string>

struct Node {
    int value;
    std::unique_ptr<Node> left, right;
};

class SearchTree {
public:
    void insert(int v) { insertAt(root, v); }
    bool contains(int v) const {
        const Node* n = root.get();
        while (n && n->value != v) n = v < n->value ? n->left.get() : n->right.get();
        return n != nullptr;
    }
private:
    std::unique_ptr<Node> root;
    void insertAt(std::unique_ptr<Node>& p, int v) {
        if (!p) p = std::make_unique<Node>(Node{v, nullptr, nullptr});
        else if (v < p->value) insertAt(p->left, v);
        else insertAt(p->right, v);
    }
};

class Library {                          // composition: has-a
public:
    explicit Library(const std::string& n) : name(n) {}
    void addBook(int id) { ids.insert(id); }
    bool hasBook(int id) const { return ids.contains(id); }
private:
    std::string name;
    SearchTree ids;                      // a data member, not a base class
};

class BadLibrary : public SearchTree {}; // inheritance: is-a (wrong here)

int main() {
    Library lib("Central");
    lib.addBook(1205);  lib.addBook(1101);
    std::cout << lib.hasBook(1101) << ' ' << lib.hasBook(9999) << '\n';
    // lib.insert(42);    // error: no member named 'insert' in 'Library'

    BadLibrary bad;
    bad.insert(42);       // compiles: every SearchTree operation is inherited
    std::cout << bad.contains(42) << '\n';
}
