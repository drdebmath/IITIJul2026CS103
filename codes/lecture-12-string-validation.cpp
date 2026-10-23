// Lecture 12 · Set A · String validation and counting
#include <cctype>
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "CS103-A7";
    size_t dash = s.find('-');                         // 1
    if (dash == string::npos) {                        // 2
        cout << "bad\n";
        return 0;
    }
    string left = s.substr(0, dash);                   // 3
    int digits = 0;
    for (size_t i = dash + 1; i < s.size(); ++i) {     // 4
        if (isdigit(static_cast<unsigned char>(s[i])))
            ++digits;                                  // 5
    }
    cout << left << ' ' << digits;                     // 6
}
