// Lecture 11 · Validate an institute email address
#include <cctype>
#include <iostream>
#include <string>

bool validEmail(const std::string& address) {
    std::size_t sep = address.find('@');
    if (sep == std::string::npos || address.substr(sep) != "@iiti.ac.in") return false;

    std::size_t roll = 0;
    while (roll < sep && std::islower(static_cast<unsigned char>(address[roll]))) ++roll;
    if (roll == 0 || sep - roll != 9) return false;

    for (std::size_t i = roll; i < sep; ++i)
        if (!std::isdigit(static_cast<unsigned char>(address[i]))) return false;
    return true;
}

int main() {
    std::cout << std::boolalpha << validEmail("che260008041@iiti.ac.in");
}
