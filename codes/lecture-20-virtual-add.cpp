// Lecture 20 · A virtual function: the object chooses which add() runs
#include <iostream>
#include <memory>

struct Node {
    int value;
    std::unique_ptr<Node> left, right;
};

class BinaryTree {
public:
    virtual ~BinaryTree() = default;
    virtual void add(int v) {            // any binary tree: a new leftmost leaf
        std::unique_ptr<Node>* p = &root;
        while (*p) p = &(*p)->left;
        *p = std::make_unique<Node>(Node{v, nullptr, nullptr});
    }
    int size() const { return count(root.get()); }
protected:
    std::unique_ptr<Node> root;
private:
    int count(const Node* n) const {
        if (n == nullptr) return 0;
        return 1 + count(n->left.get()) + count(n->right.get());
    }
};

class SearchTree : public BinaryTree {   // invariant: smaller left, larger right
public:
    void add(int v) override { addAt(root, v); }
    bool contains(int v) const {
        const Node* n = root.get();
        while (n && n->value != v) n = v < n->value ? n->left.get() : n->right.get();
        return n != nullptr;
    }
private:
    void addAt(std::unique_ptr<Node>& p, int v) {
        if (!p) p = std::make_unique<Node>(Node{v, nullptr, nullptr});
        else if (v < p->value) addAt(p->left, v);
        else addAt(p->right, v);
    }
};

void grow(BinaryTree& t) { t.add(99); }  // which add()? The object decides.

int main() {
    SearchTree t;
    for (int v : {50, 30, 70}) t.add(v);
    grow(t);
    std::cout << "size " << t.size() << ", contains(99) " << t.contains(99) << '\n';
}
