// Lecture 11 · Parse and validate structured text
#include <cctype>
#include <iostream>
#include <string>
#include <string_view>

bool validEnrollmentId(std::string_view id) {
    if (id.size() != 9 || id.substr(0, 2) != "BT") return false;
    for (std::size_t i = 2; i < id.size(); ++i) {
        const auto character = static_cast<unsigned char>(id[i]);
        if (!std::isdigit(character)) return false;
    }
    return true;
}

int main() {
    const std::string candidate = "BT2601034";
    std::cout << std::boolalpha << validEnrollmentId(candidate) << '\n';
}
