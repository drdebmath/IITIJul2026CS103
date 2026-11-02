// Lecture 18 · A destructor runs when an object's lifetime ends
#include <iostream>
#include <string>
class Tag {
public:
    Tag(std::string n) : name(n) { std::cout << "construct " << name << '\n'; }
    ~Tag() { std::cout << "destroy " << name << '\n'; }
private: std::string name;
};
int main() {
    Tag a("a");
    { Tag b("b"); Tag c("c"); std::cout << "end of block\n"; }
    std::cout << "end of main\n";
}
