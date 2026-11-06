// Lecture 19 · A SearchTree is a BinaryTree: base and derived classes
#include <iostream>
#include <memory>

struct Node {
    int value;
    std::unique_ptr<Node> left, right;   // each node owns its two subtrees
};

class BinaryTree {                       // base class
public:
    int size() const { return count(root.get()); }
protected:
    std::unique_ptr<Node> root;          // derived classes may use root
private:
    int count(const Node* n) const {                 // nodes in the subtree at n
        if (n == nullptr) return 0;                  // base case: empty subtree
        return 1 + count(n->left.get()) + count(n->right.get());
    }
};

class SearchTree : public BinaryTree {   // derived class
public:
    void insert(int v) { insertAt(root, v); }
    bool contains(int v) const {
        const Node* n = root.get();
        while (n && n->value != v) n = v < n->value ? n->left.get() : n->right.get();
        return n != nullptr;
    }
private:
    // invariant: smaller values to the left, larger to the right
    void insertAt(std::unique_ptr<Node>& p, int v) {
        if (!p) p = std::make_unique<Node>(Node{v, nullptr, nullptr});
        else if (v < p->value) insertAt(p->left, v);
        else insertAt(p->right, v);
    }
};

void report(const BinaryTree& t) { std::cout << "size " << t.size() << '\n'; }

int main() {
    SearchTree t;
    for (int v : {50, 30, 70, 20}) t.insert(v);   // declared in SearchTree
    std::cout << t.size() << ' ' << t.contains(20) << '\n';   // size() is inherited
    report(t);                                    // a SearchTree is a BinaryTree
}
