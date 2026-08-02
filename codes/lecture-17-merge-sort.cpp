// Lecture 17 · Merge sort with half-open ranges

#include <iostream>
#include <vector>

void merge(std::vector<int>& values, std::size_t left,
           std::size_t middle, std::size_t right) {
    std::vector<int> merged;
    std::size_t first = left;
    std::size_t second = middle;

    while (first < middle && second < right) {
        if (values[first] <= values[second]) {
            merged.push_back(values[first]);
            ++first;
        } else {
            merged.push_back(values[second]);
            ++second;
        }
    }
    while (first < middle) {
        merged.push_back(values[first]);
        ++first;
    }
    while (second < right) {
        merged.push_back(values[second]);
        ++second;
    }
    for (std::size_t i = 0; i < merged.size(); ++i) {
        values[left + i] = merged[i];
    }
}

void mergeSort(std::vector<int>& values, std::size_t left,
               std::size_t right) {
    if (right - left <= 1) {
        return;
    }
    std::size_t middle = left + (right - left) / 2;
    mergeSort(values, left, middle);
    mergeSort(values, middle, right);
    merge(values, left, middle, right);
}

bool isSorted(const std::vector<int>& values) {
    for (std::size_t i = 1; i < values.size(); ++i) {
        if (values[i - 1] > values[i]) {
            return false;
        }
    }
    return true;
}

int main() {
    std::vector<int> values{9, 4, 7, 3, 8, 2, 1, 6, 5};
    mergeSort(values, 0, values.size());

    for (int value : values) {
        std::cout << value << ' ';
    }
    std::cout << "\nsorted: " << isSorted(values) << '\n';
}
