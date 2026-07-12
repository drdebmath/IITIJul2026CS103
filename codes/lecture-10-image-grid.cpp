#include <iostream>
using namespace std;

int main() {
    const int H = 5, W = 5;
    int image[H][W]{};

    for (int i = 0; i < H; i++) image[i][i] = 255;

    for (int r = 0; r < H; r++) {
        for (int c = 0; c < W; c++)
            cout << (image[r][c] ? "*" : ".");
        cout << endl;
    }
    return 0;
}
