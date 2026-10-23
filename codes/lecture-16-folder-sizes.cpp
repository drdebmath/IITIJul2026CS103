// Lecture 16 · Recursion over nested structure: folder sizes
#include <iostream>
#include <string>
#include <vector>

struct Folder {
    std::string name;
    int kb;                                   // size of the files directly inside
    std::vector<Folder> sub;                  // subfolders
};

int total(const Folder& f) {
    int sum = f.kb;
    for (const Folder& s : f.sub) sum += total(s);   // no subfolders: no call
    return sum;
}

void show(const Folder& f, int depth) {
    std::cout << std::string(2 * depth, ' ') << f.name << "/  " << total(f) << " KB\n";
    for (const Folder& s : f.sub) show(s, depth + 1);
}

int main() {
    Folder root{"cs103", 4, {
        Folder{"labs", 20, {Folder{"lab1", 12, {}}, Folder{"lab2", 30, {}}}},
        Folder{"notes", 8, {Folder{"slides", 95, {}}}}
    }};
    show(root, 0);
}
