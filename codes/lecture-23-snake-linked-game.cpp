// Lecture 23 · Terminal Snake using the linked structure taught in Lecture 14
// Model: one command advances one discrete turn on a finite grid.
// Structure: each Segment points to the next body segment.
// Invariant: every successful state has distinct, in-bounds body cells.

#include <cassert>
#include <cctype>
#include <iostream>
#include <string>

struct Cell {
    int row;
    int column;
};

bool sameCell(Cell first, Cell second) {
    return first.row == second.row && first.column == second.column;
}

struct Segment {
    Cell cell;
    Segment* next;
};

class SnakeGame {
    int height_;
    int width_;
    Segment* head_;
    char direction_ = 'd';
    Cell food_{0, 0};
    bool hasFood_ = false;
    int score_ = 0;

    bool inside(Cell cell) const {
        return cell.row >= 0 && cell.row < height_ &&
               cell.column >= 0 && cell.column < width_;
    }

    bool occupies(Cell cell) const {
        for (const Segment* segment = head_; segment != nullptr; segment = segment->next) {
            if (sameCell(segment->cell, cell)) {
                return true;
            }
        }
        return false;
    }

    Cell tailCell() const {
        const Segment* segment = head_;
        while (segment->next != nullptr) {
            segment = segment->next;
        }
        return segment->cell;
    }

    bool opposite(char requested) const {
        return (direction_ == 'w' && requested == 's') ||
               (direction_ == 's' && requested == 'w') ||
               (direction_ == 'a' && requested == 'd') ||
               (direction_ == 'd' && requested == 'a');
    }

    Cell nextHead() const {
        Cell next = head_->cell;
        if (direction_ == 'w') --next.row;
        else if (direction_ == 's') ++next.row;
        else if (direction_ == 'a') --next.column;
        else if (direction_ == 'd') ++next.column;
        return next;
    }

    void removeTail() {
        Segment* beforeTail = head_;
        while (beforeTail->next->next != nullptr) {
            beforeTail = beforeTail->next;
        }
        delete beforeTail->next;
        beforeTail->next = nullptr;
    }

    void placeFood() {
        hasFood_ = false;
        for (int row = 0; row < height_ && !hasFood_; ++row) {
            for (int column = 0; column < width_ && !hasFood_; ++column) {
                Cell candidate{row, column};
                if (!occupies(candidate)) {
                    food_ = candidate;
                    hasFood_ = true;
                }
            }
        }
    }

    bool invariantHolds() const {
        for (const Segment* first = head_; first != nullptr; first = first->next) {
            if (!inside(first->cell)) {
                return false;
            }
            for (const Segment* second = first->next; second != nullptr;
                 second = second->next) {
                if (sameCell(first->cell, second->cell)) {
                    return false;
                }
            }
        }
        return !hasFood_ || (inside(food_) && !occupies(food_));
    }

public:
    SnakeGame(int height, int width) : height_(height), width_(width), head_(nullptr) {
        assert(height > 0 && width >= 3);
        int row = height / 2;
        int column = width / 2;
        head_ = new Segment{{row, column},
            new Segment{{row, column - 1},
                new Segment{{row, column - 2}, nullptr}}};
        placeFood();
        assert(invariantHolds());
    }

    ~SnakeGame() {
        while (head_ != nullptr) {
            Segment* oldHead = head_;
            head_ = head_->next;
            delete oldHead;
        }
    }

    int score() const { return score_; }
    char direction() const { return direction_; }

    // 0 = running, 1 = collision/loss, 2 = board filled/win.
    int advance(char requested) {
        if (!opposite(requested)) {
            direction_ = requested;
        }
        Cell candidate = nextHead();
        if (!inside(candidate)) {
            return 1;
        }

        bool eats = hasFood_ && sameCell(candidate, food_);
        bool entersOldTail = !eats && sameCell(candidate, tailCell());
        if (occupies(candidate) && !entersOldTail) {
            return 1;
        }

        head_ = new Segment{candidate, head_};
        if (eats) {
            ++score_;
            placeFood();
            if (!hasFood_) {
                assert(invariantHolds());
                return 2;
            }
        } else {
            removeTail();
        }
        assert(invariantHolds());
        return 0;
    }

    void render() const {
        std::cout << "\nLINKED SNAKE   score: " << score_ << '\n';
        std::cout << '+' << std::string(static_cast<std::size_t>(width_), '-') << "+\n";
        for (int row = 0; row < height_; ++row) {
            std::cout << '|';
            for (int column = 0; column < width_; ++column) {
                Cell cell{row, column};
                char symbol = ' ';
                if (sameCell(cell, head_->cell)) symbol = '@';
                else if (occupies(cell)) symbol = 'o';
                else if (hasFood_ && sameCell(cell, food_)) symbol = '*';
                std::cout << symbol;
            }
            std::cout << "|\n";
        }
        std::cout << '+' << std::string(static_cast<std::size_t>(width_), '-') << "+\n";
    }
};

char directionFrom(char command) {
    char lower = static_cast<char>(std::tolower(static_cast<unsigned char>(command)));
    if (lower == 'w' || lower == 'a' || lower == 's' || lower == 'd') {
        return lower;
    }
    return '\0';
}

int main() {
    SnakeGame game(12, 24);
    std::cout << "W/A/S/D moves, Enter continues, Q quits.\n";

    int result = 0;
    std::string input;
    while (result == 0) {
        game.render();
        std::cout << "move: ";
        if (!std::getline(std::cin, input)) return 0;
        if (!input.empty() && directionFrom(input[0]) == '\0') {
            char lower = static_cast<char>(std::tolower(static_cast<unsigned char>(input[0])));
            if (lower == 'q') return 0;
        }
        char requested = game.direction();
        if (!input.empty() && directionFrom(input[0]) != '\0') {
            requested = directionFrom(input[0]);
        }
        result = game.advance(requested);
    }

    game.render();
    if (result == 2) std::cout << "You filled the board!\n";
    else std::cout << "Collision: game over.\n";
    std::cout << "Final score: " << game.score() << '\n';
}
