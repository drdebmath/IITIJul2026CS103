// Lecture 23 · Multi-agent cleaning on a graph
// Model: rooms are vertices; undirected corridors are unit-cost edges.
// Structure: adjacency lists, vector queues, vector routes, integer targets.
// Invariant: active targets are distinct and every route step follows an edge.

#include <cassert>
#include <iostream>
#include <string>
#include <vector>

bool contains(const std::vector<int>& values, int target) {
    for (int value : values) {
        if (value == target) return true;
    }
    return false;
}

class Graph {
    std::vector<std::string> names_;
    std::vector<std::vector<int>> adjacency_;
    std::vector<int> dirty_;

public:
    explicit Graph(const std::vector<std::string>& names)
        : names_(names), adjacency_(names.size()), dirty_(names.size(), 0) {}

    int size() const { return static_cast<int>(names_.size()); }

    void addEdge(int first, int second) {
        assert(first >= 0 && first < size() && second >= 0 && second < size());
        adjacency_[first].push_back(second);
        adjacency_[second].push_back(first);
    }

    bool hasEdge(int first, int second) const {
        return contains(adjacency_[first], second);
    }

    void makeDirty(int vertex) { dirty_[vertex] = 1; }
    bool isDirty(int vertex) const { return dirty_[vertex] == 1; }
    void clean(int vertex) { dirty_[vertex] = 0; }
    const std::string& name(int vertex) const { return names_[vertex]; }

    int dirtyCount() const {
        int count = 0;
        for (int dirty : dirty_) count += dirty;
        return count;
    }

    std::vector<int> pathToNearestDirt(int start,
                                       const std::vector<int>& reserved) const {
        std::vector<int> parent(names_.size(), -1);
        std::vector<int> frontier;
        std::size_t front = 0;
        frontier.push_back(start);
        parent[start] = start;
        int target = -1;

        while (front < frontier.size() && target == -1) {
            int current = frontier[front];
            ++front;
            if (isDirty(current) && !contains(reserved, current)) {
                target = current;
            } else {
                for (int neighbor : adjacency_[current]) {
                    if (parent[neighbor] == -1) {
                        parent[neighbor] = current;
                        frontier.push_back(neighbor);
                    }
                }
            }
        }

        std::vector<int> path;
        if (target == -1) return path;
        for (int vertex = target; vertex != start; vertex = parent[vertex]) {
            path.push_back(vertex);
        }
        for (std::size_t left = 0, right = path.size(); left < right; ++left) {
            --right;
            if (left < right) {
                int temporary = path[left];
                path[left] = path[right];
                path[right] = temporary;
            }
        }
        return path;
    }
};

class CleanerAgent {
    std::string name_;
    int position_;
    std::vector<int> route_;
    std::size_t front_ = 0;
    int target_ = -1;

public:
    CleanerAgent(const std::string& name, int start) : name_(name), position_(start) {}

    const std::string& name() const { return name_; }
    int position() const { return position_; }
    bool idle() const { return front_ >= route_.size(); }
    bool hasTarget() const { return target_ != -1; }
    int target() const { return target_; }

    void assign(const std::vector<int>& path) {
        route_ = path;
        front_ = 0;
        if (path.empty()) target_ = position_;
        else target_ = path[path.size() - 1];
    }

    void step() {
        if (!idle()) {
            position_ = route_[front_];
            ++front_;
        }
    }

    bool arrived() const { return hasTarget() && idle(); }
    void finishJob() { target_ = -1; }

    bool routeIsValid(const Graph& graph) const {
        int previous = position_;
        for (std::size_t index = front_; index < route_.size(); ++index) {
            if (!graph.hasEdge(previous, route_[index])) return false;
            previous = route_[index];
        }
        return !hasTarget() || previous == target_;
    }
};

bool distinctTargets(const std::vector<CleanerAgent>& agents) {
    for (std::size_t first = 0; first < agents.size(); ++first) {
        if (!agents[first].hasTarget()) continue;
        for (std::size_t second = first + 1; second < agents.size(); ++second) {
            if (agents[second].hasTarget() &&
                agents[first].target() == agents[second].target()) return false;
        }
    }
    return true;
}

void render(const Graph& graph, const std::vector<CleanerAgent>& agents, int round) {
    std::cout << "\nMULTI-AGENT GRAPH CLEANER   round: " << round
              << "   dirty rooms: " << graph.dirtyCount() << '\n';
    for (int vertex = 0; vertex < graph.size(); ++vertex) {
        std::cout << '[' << vertex << "] " << graph.name(vertex) << " : ";
        if (graph.isDirty(vertex)) std::cout << "DIRTY";
        else std::cout << "clean";
        for (const CleanerAgent& agent : agents) {
            if (agent.position() == vertex) std::cout << " <" << agent.name() << '>';
        }
        std::cout << '\n';
    }
}

int main() {
    Graph building({"Dock", "Studio", "Library", "Lab", "Workshop", "Cafe"});
    building.addEdge(0, 1); building.addEdge(0, 2); building.addEdge(0, 3);
    building.addEdge(1, 4); building.addEdge(2, 4); building.addEdge(2, 5);
    building.addEdge(3, 5); building.addEdge(4, 5);
    const int dirtyRooms[]{1, 3, 4, 5};
    for (int room : dirtyRooms) building.makeDirty(room);

    std::vector<CleanerAgent> agents;
    agents.push_back(CleanerAgent("Ada", 0));
    agents.push_back(CleanerAgent("Bjarne", 2));

    int round = 0;
    render(building, agents, round);
    while (building.dirtyCount() > 0) {
        std::vector<int> reserved;
        for (const CleanerAgent& agent : agents) {
            if (agent.hasTarget()) reserved.push_back(agent.target());
        }

        bool progressed = false;
        for (CleanerAgent& agent : agents) {
            if (!agent.idle() || agent.hasTarget()) continue;
            std::vector<int> path = building.pathToNearestDirt(agent.position(), reserved);
            if (!path.empty() ||
                (building.isDirty(agent.position()) && !contains(reserved, agent.position()))) {
                agent.assign(path);
                reserved.push_back(agent.target());
                progressed = true;
            }
        }

        assert(distinctTargets(agents));
        for (const CleanerAgent& agent : agents) assert(agent.routeIsValid(building));
        int dirtyBefore = building.dirtyCount();
        for (CleanerAgent& agent : agents) {
            if (!agent.idle()) {
                agent.step();
                progressed = true;
            }
            if (agent.arrived()) {
                building.clean(agent.position());
                agent.finishJob();
            }
        }
        assert(building.dirtyCount() <= dirtyBefore);

        ++round;
        render(building, agents, round);
        if (!progressed) {
            std::cout << "Remaining dirt is unreachable.\n";
            return 1;
        }
    }
    std::cout << "All rooms clean after " << round << " rounds.\n";
}
