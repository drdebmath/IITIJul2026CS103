// Lecture 11 · Size, find, substr, and classification
#include <cctype>
#include <iostream>
#include <string>

int main() {
    std::string name = "IIT Indore";
    std::cout << name.size() << '\n';

    std::string code = "CS103-A7";   // added: sample text
    std::size_t dash = code.find('-');
    if (dash != std::string::npos) {
        std::string prefix = code.substr(0, dash);
    }
    std::string text = "CS103-A7";
    int digits = 0;
    for (std::size_t i = 0; i < text.size(); ++i) {
        unsigned char ch = static_cast<unsigned char>(text[i]);
        if (std::isdigit(ch)) ++digits;
    }
    std::cout << digits << '\n';
}
