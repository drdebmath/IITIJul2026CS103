// Lecture 23 · Recursive transformation of a binary tree
#include <iostream>
#include <memory>
#include <utility>

struct Node {
    int value;
    std::unique_ptr<Node> left;
    std::unique_ptr<Node> right;
};

void invert(Node* root) {
    if (root == nullptr) return;
    std::swap(root->left, root->right);
    invert(root->left.get());
    invert(root->right.get());
}

void preorder(const Node* root) {
    if (root == nullptr) return;
    std::cout << root->value << ' ';
    preorder(root->left.get());
    preorder(root->right.get());
}

int main() {
    auto root = std::make_unique<Node>(Node{4, nullptr, nullptr});
    root->left = std::make_unique<Node>(Node{2, nullptr, nullptr});
    root->right = std::make_unique<Node>(Node{7, nullptr, nullptr});
    invert(root.get());
    preorder(root.get());
    std::cout << '\n';
}
