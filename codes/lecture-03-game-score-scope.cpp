// Lecture 3 · Update game state without leaking temporary names
#include <iostream>

int main() {
    int score = 4;
    {
        int collectedReward = 3;
        score += collectedReward;
    }
    std::cout << score << std::endl;
}
