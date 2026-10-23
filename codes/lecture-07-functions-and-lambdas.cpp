// Lecture 7 · Value parameters, named steps, and lambdas
#include <iostream>

int doubled(int value) {
    value *= 2;
    return value;
}

double subtotal(double price, int count) { return price * count; }
double tax(double amount, double rate) { return amount * rate; }
double total(double amount, double rate) { return amount + tax(amount, rate); }

int main() {
    auto isPositive = [](int value) { return value > 0; };
    int x = 5;
    std::cout << doubled(x) << ' ' << x << '\n';              // added: the copy changes, x does not
    std::cout << total(subtotal(2.5, 4), 0.1) << '\n';        // added: 10 plus 10% tax
    std::cout << std::boolalpha << isPositive(3) << ' ' << isPositive(-3) << '\n';
}
