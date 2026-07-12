#include <iostream>
#include <string>
#include <vector>

int main() {
    // Define the ASCII art of a cat using a vector of strings
    std::vector<std::string> cat_ascii_art = {
        "  /\\_/\\",
        " ( o.o )",
        "  > ^ < "
    };

    // Iterate through the vector and print each line
    for (const std::string& line : cat_ascii_art) {
        std::cout << line << std::endl;
    }

    return 0;
}