// Lecture 19 · private, protected, public, and a friend function
#include <iostream>
#include <memory>

struct Node {
    int value;
    std::unique_ptr<Node> left, right;
};

class BinaryTree {
public:
    int size() const { return count(root.get()); }
    friend void printRoot(const BinaryTree& t);   // a non-member granted access
protected:
    std::unique_ptr<Node> root;
private:
    int count(const Node* n) const {                 // nodes in the subtree at n
        if (n == nullptr) return 0;                  // base case: empty subtree
        return 1 + count(n->left.get()) + count(n->right.get());
    }
};

class SearchTree : public BinaryTree {
public:
    void insert(int v) {
        if (!root) root = std::make_unique<Node>(Node{v, nullptr, nullptr});   // OK: protected
        // count(root.get());   // error: 'count' is a private member of 'BinaryTree'
    }
};

void printRoot(const BinaryTree& t) { std::cout << "root " << t.root->value << '\n'; }

int main() {
    SearchTree t;
    t.insert(50);
    std::cout << t.size() << '\n';   // OK: public
    // t.root = nullptr;             // error: 'root' is a protected member of 'BinaryTree'
    printRoot(t);                    // OK: a friend may use root
}
