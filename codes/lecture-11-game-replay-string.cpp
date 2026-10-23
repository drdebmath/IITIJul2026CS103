// Lecture 11 · Game evolution · replay string
#include <iostream>
#include <cctype>
#include <string>
int main() {
    std::string replay="wAsD";
    bool valid=true;
    for (std::size_t i=0; valid && i<replay.size(); ++i) {
        unsigned char ch=static_cast<unsigned char>(replay[i]);
        char move=static_cast<char>(std::tolower(ch));
        valid = move=='w' || move=='a' || move=='s' || move=='d';
    }
    std::cout << std::boolalpha << valid << '\n';  // added: show the result
}
