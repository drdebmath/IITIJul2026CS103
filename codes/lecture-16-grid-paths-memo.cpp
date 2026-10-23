// Lecture 16 · Memoization: grid routes with call counts
#include <iostream>
#include <vector>

long long calls = 0;

long long paths(int r, int c) {
    ++calls;
    if (r == 0 || c == 0) return 1;                   // base case: one straight route
    return paths(r - 1, c) + paths(r, c - 1);         // arrive from above or from the left
}

long long pathsMemo(int r, int c, std::vector<std::vector<long long>>& memo) {
    ++calls;
    if (r == 0 || c == 0) return 1;
    if (memo[r][c] != -1) return memo[r][c];          // already solved
    return memo[r][c] = pathsMemo(r - 1, c, memo) + pathsMemo(r, c - 1, memo);
}

int main() {
    const int n = 12;
    std::cout << "naive: " << paths(n, n) << " routes, " << calls << " calls\n";
    calls = 0;
    std::vector<std::vector<long long>> memo(n + 1, std::vector<long long>(n + 1, -1));
    std::cout << "memo:  " << pathsMemo(n, n, memo) << " routes, " << calls << " calls\n";
}
