// Lecture 3 · Program-long storage duration and external linkage
#include <iostream>

extern int sharedData;
int completedRuns = 0;

int main() {
    int thisRun = 1;
    completedRuns += thisRun;
    std::cout << "program-long state: " << completedRuns << '\n';
    std::cout << "extern definition: " << sharedData << '\n';
}
