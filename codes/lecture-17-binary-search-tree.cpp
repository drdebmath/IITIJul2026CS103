// Lecture 17 · A binary search tree with unique keys

#include <cassert>
#include <iostream>

struct Node {
    int key;
    Node* left;
    Node* right;
};

Node* insert(Node* root, int key) {
    if (root == nullptr) {
        return new Node{key, nullptr, nullptr};
    }
    if (key < root->key) {
        root->left = insert(root->left, key);
    } else if (key > root->key) {
        root->right = insert(root->right, key);
    }
    return root;
}

bool contains(const Node* root, int key) {
    if (root == nullptr) {
        return false;
    }
    if (key == root->key) {
        return true;
    }
    if (key < root->key) {
        return contains(root->left, key);
    }
    return contains(root->right, key);
}

void printInOrder(const Node* root) {
    if (root == nullptr) {
        return;
    }
    printInOrder(root->left);
    std::cout << root->key << ' ';
    printInOrder(root->right);
}

void deleteTree(Node* root) {
    if (root == nullptr) {
        return;
    }
    deleteTree(root->left);
    deleteTree(root->right);
    delete root;
}

int main() {
    Node* root = nullptr;
    const int keys[]{50, 30, 70, 20, 40, 60, 80, 30};
    for (int key : keys) {
        root = insert(root, key);
    }

    assert(contains(root, 60));
    assert(!contains(root, 35));
    printInOrder(root);
    std::cout << '\n';
    deleteTree(root);
}
