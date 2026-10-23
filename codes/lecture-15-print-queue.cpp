// Lecture 15 · A print queue with std::queue
#include <iostream>
#include <queue>
#include <string>

int main() {
    std::queue<std::string> jobs;
    jobs.push("report.pdf");
    jobs.push("notes.txt");
    jobs.push("lab3.cpp");
    std::cout << "waiting: " << jobs.size() << ", next: " << jobs.front() << '\n';
    while (!jobs.empty()) {
        std::cout << "printing " << jobs.front() << '\n';
        jobs.pop();                                  // remove the job just served
    }
    std::cout << "waiting: " << jobs.size() << '\n';
}
