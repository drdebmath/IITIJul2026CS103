// Lecture 23 · Grid Cleaner with breadth-first shortest paths
// Model: traversable cells are vertices and legal unit moves are edges.
// Structure: vector<string> grid, vector-plus-front-index queue, parent matrix.
// Invariant: discovered cells have one shortest-path predecessor.

#include <cassert>
#include <iostream>
#include <string>
#include <vector>

struct Cell {
    int row;
    int column;
};

bool sameCell(Cell first, Cell second) {
    return first.row == second.row && first.column == second.column;
}

class CleaningWorld {
    std::vector<std::string> grid_;
    Cell robot_{0, 0};
    int moves_ = 0;
    int cleaned_ = 0;

    bool inside(Cell cell) const {
        return cell.row >= 0 && cell.row < static_cast<int>(grid_.size()) &&
               cell.column >= 0 && cell.column < static_cast<int>(grid_[0].size());
    }

    char at(Cell cell) const { return grid_[cell.row][cell.column]; }
    char& at(Cell cell) { return grid_[cell.row][cell.column]; }

    std::vector<Cell> neighbors(Cell cell) const {
        const Cell directions[4]{{-1,0},{0,1},{1,0},{0,-1}};
        std::vector<Cell> result;
        for (Cell direction : directions) {
            Cell candidate{cell.row + direction.row, cell.column + direction.column};
            if (inside(candidate) && at(candidate) != '#') {
                result.push_back(candidate);
            }
        }
        return result;
    }

public:
    explicit CleaningWorld(const std::vector<std::string>& map) : grid_(map) {
        assert(!grid_.empty() && !grid_[0].empty());
        int robotMarkers = 0;
        for (int row = 0; row < static_cast<int>(grid_.size()); ++row) {
            assert(grid_[row].size() == grid_[0].size());
            for (int column = 0; column < static_cast<int>(grid_[row].size()); ++column) {
                if (grid_[row][column] == 'R') {
                    robot_ = Cell{row, column};
                    grid_[row][column] = '.';
                    ++robotMarkers;
                }
            }
        }
        assert(robotMarkers == 1);
    }

    int dirtyCount() const {
        int count = 0;
        for (const std::string& row : grid_) {
            for (char symbol : row) {
                if (symbol == '*') ++count;
            }
        }
        return count;
    }

    int moves() const { return moves_; }
    int cleaned() const { return cleaned_; }

    std::vector<Cell> shortestPathToDirt() const {
        const int height = static_cast<int>(grid_.size());
        const int width = static_cast<int>(grid_[0].size());
        const Cell unseen{-1, -1};
        std::vector<std::vector<Cell>> parent(
            static_cast<std::size_t>(height),
            std::vector<Cell>(static_cast<std::size_t>(width), unseen));

        std::vector<Cell> frontier;
        std::size_t front = 0;
        frontier.push_back(robot_);
        parent[robot_.row][robot_.column] = robot_;

        bool found = false;
        Cell goal{-1, -1};
        while (front < frontier.size() && !found) {
            Cell current = frontier[front];
            ++front;
            for (Cell neighbor : neighbors(current)) {
                if (!sameCell(parent[neighbor.row][neighbor.column], unseen)) continue;
                parent[neighbor.row][neighbor.column] = current;
                if (at(neighbor) == '*') {
                    goal = neighbor;
                    found = true;
                    break;
                }
                frontier.push_back(neighbor);
            }
        }

        std::vector<Cell> path;
        if (!found) return path;
        for (Cell cell = goal; !sameCell(cell, robot_);
             cell = parent[cell.row][cell.column]) {
            path.push_back(cell);
        }
        for (std::size_t left = 0, right = path.size() - 1; left < right;
             ++left, --right) {
            Cell temporary = path[left];
            path[left] = path[right];
            path[right] = temporary;
        }
        return path;
    }

    void moveTo(Cell destination) {
        int rowDifference = destination.row - robot_.row;
        if (rowDifference < 0) rowDifference = -rowDifference;
        int columnDifference = destination.column - robot_.column;
        if (columnDifference < 0) columnDifference = -columnDifference;
        assert(rowDifference + columnDifference == 1 && at(destination) != '#');
        robot_ = destination;
        ++moves_;
        if (at(robot_) == '*') {
            at(robot_) = '.';
            ++cleaned_;
        }
    }

    void render(const std::vector<Cell>& path) const {
        std::cout << "\nGRID CLEANER   moves: " << moves_ << "   cleaned: " << cleaned_
                  << "   remaining: " << dirtyCount() << '\n';
        for (int row = 0; row < static_cast<int>(grid_.size()); ++row) {
            for (int column = 0; column < static_cast<int>(grid_[row].size()); ++column) {
                Cell cell{row, column};
                char symbol = at(cell);
                bool planned = false;
                for (Cell step : path) {
                    if (sameCell(cell, step)) planned = true;
                }
                if (sameCell(cell, robot_)) symbol = 'R';
                else if (planned && symbol != '*') symbol = '+';
                std::cout << symbol;
            }
            std::cout << '\n';
        }
    }
};

int main() {
    CleaningWorld world({
        "#################",
        "#R....#....*....#",
        "#.##..#..###....#",
        "#.*...#.........#",
        "#.###.#####.###.#",
        "#.....*.........#",
        "###.#########...#",
        "#.......#.......#",
        "#..*....#...*...#",
        "#################"
    });

    std::vector<Cell> noPath;
    world.render(noPath);
    while (world.dirtyCount() > 0) {
        int dirtyBefore = world.dirtyCount();
        std::vector<Cell> path = world.shortestPathToDirt();
        if (path.empty()) {
            std::cout << "Remaining dirt is unreachable.\n";
            return 1;
        }
        world.render(path);
        for (Cell step : path) {
            world.moveTo(step);
        }
        assert(world.dirtyCount() == dirtyBefore - 1);
        world.render(noPath);
    }
    std::cout << "Mission complete: " << world.cleaned() << " cells in "
              << world.moves() << " moves.\n";
}
