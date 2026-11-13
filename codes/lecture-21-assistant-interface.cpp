// Lecture 21 · A model behind an abstract class: classify() checks every reply,
// and a FakeAssistant makes the program testable without a network
#include <iostream>
#include <memory>
#include <string>
#include <vector>

class Assistant {                             // abstract class (Lecture 20)
public:
    virtual std::string reply(const std::string& prompt) = 0;
    virtual std::string name() const = 0;
    virtual ~Assistant() = default;
};

class FakeAssistant : public Assistant {      // for tests: no network, fixed reply
public:
    FakeAssistant(std::string n, std::string r) : label(n), canned(r) {}
    std::string reply(const std::string&) override { return canned; }
    std::string name() const override { return label; }
private:
    std::string label, canned;
};

// post-condition: returns "positive", "negative", or "unknown"; nothing else
std::string classify(Assistant& ai, const std::string& feedback) {
    std::string r = ai.reply("Answer positive or negative: " + feedback);
    if (r == "positive" || r == "negative") return r;
    return "unknown";                         // never pass on an unchecked reply
}

int main() {
    std::vector<std::unique_ptr<Assistant>> models;
    models.push_back(std::make_unique<FakeAssistant>("fake-good", "positive"));
    models.push_back(std::make_unique<FakeAssistant>("fake-chatty",
                         "Sure! I think it is positive."));
    for (const auto& m : models)
        std::cout << m->name() << ": "
                  << classify(*m, "The labs were useful.") << '\n';
}
