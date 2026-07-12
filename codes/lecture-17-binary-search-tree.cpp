// Lecture 17 · Binary search tree using nodes and functions

#include <algorithm>
#include <cstdlib>
#include <iostream>
using namespace std;

// Tree Node Structure
struct TreeNode {
    int data;
    TreeNode* left;
    TreeNode* right;
};

// Helper functions for BST operations

// Create new node
TreeNode* createNode(int val) {
    return new TreeNode{val, nullptr, nullptr};
}

// Insert node into BST
TreeNode* insert(TreeNode* root, int val) {
    if(root == nullptr) {
        return createNode(val);
    }

    if(val < root->data) {
        root->left = insert(root->left, val);
    } else {
        root->right = insert(root->right, val);
    }

    return root;
}

// Search for a value in BST
TreeNode* search(TreeNode* root, int val) {
    if(root == nullptr || root->data == val) {
        return root;
    }

    if(val < root->data) {
        return search(root->left, val);
    } else {
        return search(root->right, val);
    }
}

// Find minimum value node
TreeNode* findMin(TreeNode* node) {
    TreeNode* current = node;
    while(current && current->left != nullptr) {
        current = current->left;
    }
    return current;
}

// Delete node from BST
TreeNode* deleteNode(TreeNode* root, int val) {
    if(root == nullptr) {
        return root;
    }

    // Find node to delete
    if(val < root->data) {
        root->left = deleteNode(root->left, val);
    } else if(val > root->data) {
        root->right = deleteNode(root->right, val);
    } else {
        // Node found - handle deletion

        // Case 1: Node has no children
        if(root->left == nullptr && root->right == nullptr) {
            delete root;
            return nullptr;
        }

        // Case 2: Node has one child
        if(root->left == nullptr) {
            TreeNode* temp = root->right;
            delete root;
            return temp;
        } else if(root->right == nullptr) {
            TreeNode* temp = root->left;
            delete root;
            return temp;
        }

        // Case 3: Node has two children
        TreeNode* temp = findMin(root->right); // Find inorder successor
        root->data = temp->data; // Copy data
        root->right = deleteNode(root->right, temp->data); // Delete successor
    }

    return root;
}

// Utility functions

// Calculate height of BST
int height(TreeNode* node) {
    if(node == nullptr) {
        return 0;
    }
    int leftHeight = height(node->left);
    int rightHeight = height(node->right);
    return 1 + max(leftHeight, rightHeight);
}

// Count total nodes in BST
int countNodes(TreeNode* node) {
    if(node == nullptr) {
        return 0;
    }
    return 1 + countNodes(node->left) + countNodes(node->right);
}

// Check if BST is balanced
bool isBalanced(TreeNode* node) {
    if(node == nullptr) {
        return true;
    }
    int leftHeight = height(node->left);
    int rightHeight = height(node->right);
    return abs(leftHeight - rightHeight) <= 1 && isBalanced(node->left) && isBalanced(node->right);
}

// Traversals

// Inorder traversal (Left, Root, Right)
void inorderTraversal(TreeNode* root) {
    if(root != nullptr) {
        inorderTraversal(root->left);
        cout << root->data << " ";
        inorderTraversal(root->right);
    }
}

// Preorder traversal (Root, Left, Right)
void preorderTraversal(TreeNode* root) {
    if(root != nullptr) {
        cout << root->data << " ";
        preorderTraversal(root->left);
        preorderTraversal(root->right);
    }
}

// Postorder traversal (Left, Right, Root)
void postorderTraversal(TreeNode* root) {
    if(root != nullptr) {
        postorderTraversal(root->left);
        postorderTraversal(root->right);
        cout << root->data << " ";
    }
}

// Level order traversal (breadth first)
void levelOrderTraversal(TreeNode* root) {
    if(root == nullptr) {
        return;
    }

    // Using dynamic array as queue for level order traversal
    TreeNode** queue = new TreeNode*[100]; // Simple queue implementation
    int front = 0, rear = 0;

    queue[rear++] = root;

    while(front < rear) {
        TreeNode* current = queue[front++];
        cout << current->data << " ";

        if(current->left != nullptr) {
            queue[rear++] = current->left;
        }
        if(current->right != nullptr) {
            queue[rear++] = current->right;
        }
    }

    delete[] queue;
}

// Memory cleanup - delete entire tree
void deleteTree(TreeNode* root) {
    if(root == nullptr) {
        return;
    }
    deleteTree(root->left);
    deleteTree(root->right);
    delete root;
}

int main() {
    cout << "--- Lecture 11: Binary Search Tree Implementation ---" << endl;

    TreeNode* root = nullptr;

    // Insert nodes to build BST
    cout << "Building Binary Search Tree..." << endl;
    int values[] = {50, 30, 70, 20, 40, 60, 80, 25, 35, 65};
    int n = sizeof(values) / sizeof(values[0]);

    for(int i = 0; i < n; i++) {
        root = insert(root, values[i]);
        cout << "Inserted " << values[i] << endl;
    }

    cout << "\n--- Traversals ---" << endl;
    cout << "Inorder (sorted order): ";
    inorderTraversal(root);
    cout << endl;

    cout << "Preorder: ";
    preorderTraversal(root);
    cout << endl;

    cout << "Postorder: ";
    postorderTraversal(root);
    cout << endl;

    cout << "Level order: ";
    levelOrderTraversal(root);
    cout << endl;

    cout << "\n--- Search Operations ---" << endl;
    int searchValues[] = {35, 100, 50, 25};
    for(int val : searchValues) {
        TreeNode* result = search(root, val);
        if(result != nullptr) {
            cout << "Found " << val << " in BST" << endl;
        } else {
            cout << val << " not found in BST" << endl;
        }
    }

    cout << "\n--- Tree Properties ---" << endl;
    cout << "Height: " << height(root) << endl;
    cout << "Total nodes: " << countNodes(root) << endl;
    cout << "Is balanced: " << (isBalanced(root) ? "Yes" : "No") << endl;

    cout << "\n--- Deletion Operations ---" << endl;

    // Delete leaf node
    cout << "Deleting leaf node 25..." << endl;
    root = deleteNode(root, 25);
    cout << "Inorder after deletion: ";
    inorderTraversal(root);
    cout << endl;

    // Delete node with one child
    cout << "Deleting node with one child 30..." << endl;
    root = deleteNode(root, 30);
    cout << "Inorder after deletion: ";
    inorderTraversal(root);
    cout << endl;

    // Delete node with two children
    cout << "Deleting node with two children 50 (root)..." << endl;
    root = deleteNode(root, 50);
    cout << "Inorder after deletion: ";
    inorderTraversal(root);
    cout << endl;

    cout << "Final tree properties:" << endl;
    cout << "Height: " << height(root) << endl;
    cout << "Total nodes: " << countNodes(root) << endl;

    // Cleanup
    deleteTree(root);
    cout << "\nMemory freed successfully!" << endl;

    return 0;
}
