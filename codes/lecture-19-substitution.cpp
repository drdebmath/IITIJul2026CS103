// Lecture 19 · An operation in the base class that a SearchTree cannot honor
#include <iostream>
#include <memory>

struct Node {
    int value;
    std::unique_ptr<Node> left, right;
};

class BinaryTree {
public:
    int size() const { return count(root.get()); }
    void addLeftmost(int v) {            // any binary tree may grow a leftmost leaf
        std::unique_ptr<Node>* p = &root;
        while (*p) p = &(*p)->left;
        *p = std::make_unique<Node>(Node{v, nullptr, nullptr});
    }
protected:
    std::unique_ptr<Node> root;
private:
    int count(const Node* n) const {                 // nodes in the subtree at n
        if (n == nullptr) return 0;                  // base case: empty subtree
        return 1 + count(n->left.get()) + count(n->right.get());
    }
};

class SearchTree : public BinaryTree {   // invariant: smaller left, larger right
public:
    void insert(int v) { insertAt(root, v); }
    bool contains(int v) const {
        const Node* n = root.get();
        while (n && n->value != v) n = v < n->value ? n->left.get() : n->right.get();
        return n != nullptr;
    }
private:
    void insertAt(std::unique_ptr<Node>& p, int v) {
        if (!p) p = std::make_unique<Node>(Node{v, nullptr, nullptr});
        else if (v < p->value) insertAt(p->left, v);
        else insertAt(p->right, v);
    }
};

void grow(BinaryTree& t) { t.addLeftmost(99); }

int main() {
    SearchTree t;
    for (int v : {50, 30, 70}) t.insert(v);
    grow(t);                             // compiles: a SearchTree is a BinaryTree
    std::cout << "size " << t.size() << ", contains(99) " << t.contains(99) << '\n';
}
