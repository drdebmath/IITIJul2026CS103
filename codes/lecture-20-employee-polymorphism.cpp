#include <iostream>
using namespace std;

class Employee {
public:
    virtual void work() {
        cout << "Employee works.\n";
    }
    virtual ~Employee() {}
};

class Manager : public Employee {
public:
    void work() override {
        cout << "Manager schedules meetings and calls it 'work.'\n";
    }
};

class Developer : public Employee {
public:
    void work() override {
        cout << "Developer writes code that works... on their machine.\n";
    }
};

class Intern : public Employee {
public:
    void work() override {
        cout << "Intern googles how to work.\n";
    }
};

void dailyRoutine(Employee* e) {
    e->work();
}

int main() {
    Manager m;
    Developer d;
    Intern i;

    dailyRoutine(&m);
    dailyRoutine(&d);
    dailyRoutine(&i);
}
