// Lecture 7 · Game evolution · scoring function
#include <iostream>
int scoreAfterClean(int score, bool dirtHere) {
    if (dirtHere) score += 10;
    return score;
}
int main() {
    int score=0;
    std::cout << scoreAfterClean(score,true) << ' ' << score << '\n';
}
