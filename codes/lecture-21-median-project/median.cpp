#include "median.h"
#include <algorithm>

double median(std::vector<double> v) {      // draft
    std::sort(v.begin(), v.end());
    return v[v.size() / 2];
}
