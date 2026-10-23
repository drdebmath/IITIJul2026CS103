// Lecture 5 · Game evolution · command loop
#include <iostream>
int main() {
    char command;
    do { std::cin >> command; } while (command!='w' && command!='a' &&
                                      command!='s' && command!='d' && command!='q');
    int turns = 0;
    while (command != 'q' && turns < 20) {
        ++turns; std::cin >> command;
    }
}
