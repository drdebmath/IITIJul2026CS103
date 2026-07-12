#include <iostream>
#include <string>
#include <vector>
#include <memory>
#include <algorithm>
#include <queue>
#include <unordered_map>
#include <limits>
#include <utility>

using namespace std;

// Forward declarations for classes that reference each other
class Flight;
class Passenger;
class Booking;
enum class SeatClass;

// ============================================================================
// CORE CLASSES: Flight, Passenger, Booking System
// ============================================================================

class Flight {
protected:
    string flightNumber;
    string departureCity;
    string arrivalCity;
    string departureTime;
    string arrivalTime;
    int totalSeats;
    int availableSeats;

public:
    Flight(string fn, string dep, string arr, string depTime, string arrTime, int seats)
        : flightNumber(fn), departureCity(dep), arrivalCity(arr),
          departureTime(depTime), arrivalTime(arrTime), totalSeats(seats), availableSeats(seats) {}

    virtual double getBasePrice() const = 0;
    virtual string getFlightType() const = 0;

    bool bookSeat() {
        if (availableSeats > 0) {
            availableSeats--;
            return true;
        }
        return false;
    }

    void displayInfo() const {
        cout << flightNumber << ": " << departureCity << " -> " << arrivalCity
             << " (" << departureTime << " - " << arrivalTime << ")" << endl;
        cout << "Available seats: " << availableSeats << "/" << totalSeats << endl;
    }

    // Getters for search operations
    string getDepartureCity() const { return departureCity; }
    string getArrivalCity() const { return arrivalCity; }
    string getFlightNumber() const { return flightNumber; }
    int getAvailableSeats() const { return availableSeats; }

    virtual ~Flight() = default;
};

class DomesticFlight : public Flight {
public:
    DomesticFlight(string fn, string dep, string arr, string depTime, string arrTime, int seats)
        : Flight(fn, dep, arr, depTime, arrTime, seats) {}

    double getBasePrice() const override { return 5000.0; }
    string getFlightType() const override { return "Domestic"; }
};

class InternationalFlight : public Flight {
public:
    InternationalFlight(string fn, string dep, string arr, string depTime, string arrTime, int seats)
        : Flight(fn, dep, arr, depTime, arrTime, seats) {}

    double getBasePrice() const override { return 25000.0; }
    string getFlightType() const override { return "International"; }
};

enum class SeatClass { Economy, Business, First };

class Passenger {
private:
    string name;
    string passportNumber;
    string contactNumber;
    string email;

public:
    Passenger(string n, string pass, string contact, string mail)
        : name(n), passportNumber(pass), contactNumber(contact), email(mail) {}

    string getName() const { return name; }
    string getPassport() const { return passportNumber; }
    string getContact() const { return contactNumber; }
    string getEmail() const { return email; }

    void displayInfo() const {
        cout << "Name: " << name << endl;
        cout << "Passport: " << passportNumber << endl;
        cout << "Contact: " << contactNumber << endl;
        cout << "Email: " << email << endl;
    }
};

class Booking {
private:
    string bookingId;
    shared_ptr<Flight> flight;
    shared_ptr<Passenger> passenger;
    SeatClass seatClass;
    double totalPrice;
    bool confirmed;

public:
    Booking(string id, shared_ptr<Flight> f, shared_ptr<Passenger> p, SeatClass sc)
        : bookingId(id), flight(f), passenger(p), seatClass(sc), confirmed(false) {
        calculatePrice();
    }

    void calculatePrice() {
        double basePrice = flight->getBasePrice();
        double multiplier = 1.0;
        switch (seatClass) {
            case SeatClass::Economy: multiplier = 1.0; break;
            case SeatClass::Business: multiplier = 2.5; break;
            case SeatClass::First: multiplier = 4.0; break;
        }
        totalPrice = basePrice * multiplier;
    }

    bool confirmBooking() {
        if (flight->bookSeat()) {
            confirmed = true;
            return true;
        }
        return false;
    }

    void displayBooking() const {
        cout << "Booking ID: " << bookingId << endl;
        passenger->displayInfo();
        cout << "Flight: " << flight->getFlightType() << endl;
        flight->displayInfo();
        cout << "Class: ";
        switch (seatClass) {
            case SeatClass::Economy: cout << "Economy"; break;
            case SeatClass::Business: cout << "Business"; break;
            case SeatClass::First: cout << "First"; break;
        }
        cout << endl << "Total Price: $" << totalPrice << endl;
        cout << "Status: " << (confirmed ? "Confirmed" : "Pending") << endl;
    }

    double getTotalPrice() const { return totalPrice; }
    bool isConfirmed() const { return confirmed; }
    shared_ptr<Flight> getFlight() const { return flight; }
    shared_ptr<Passenger> getPassenger() const { return passenger; }
};

// ============================================================================
// FLIGHT BOOKING SYSTEM MANAGER
// ============================================================================

class FlightBookingSystem {
private:
    vector<shared_ptr<Flight>> flights;
    vector<shared_ptr<Booking>> bookings;
    int bookingCounter;

public:
    FlightBookingSystem() : bookingCounter(1000) {}

    void addFlight(shared_ptr<Flight> flight) {
        flights.push_back(flight);
    }

    shared_ptr<Booking> createBooking(shared_ptr<Passenger> passenger, string flightNumber, SeatClass seatClass) {
        for (auto& flight : flights) {
            if (flight->getFlightNumber() == flightNumber) {
                string bookingId = "BK" + to_string(bookingCounter++);
                auto booking = make_shared<Booking>(bookingId, flight, passenger, seatClass);
                bookings.push_back(booking);
                return booking;
            }
        }
        return nullptr;
    }

    // ============================================================================
    // SEARCH ALGORITHMS
    // ============================================================================

    // Linear search for flights by destination
    shared_ptr<Flight> findFlightByDestination(const string& destination) const {
        for (const auto& flight : flights) {
            if (flight->getArrivalCity() == destination) {
                return flight;
            }
        }
        return nullptr;
    }

    // Linear search for flights within price range
    vector<shared_ptr<Flight>> findFlightsByPriceRange(double minPrice, double maxPrice) const {
        vector<shared_ptr<Flight>> results;
        for (const auto& flight : flights) {
            double price = flight->getBasePrice();
            if (price >= minPrice && price <= maxPrice) {
                results.push_back(flight);
            }
        }
        return results;
    }

    // Binary search for flights by price (assuming flights sorted by price)
    shared_ptr<Flight> findCheapestFlight(double maxPrice) const {
        // For binary search, we need sorted data - sort flights by price first
        vector<shared_ptr<Flight>> sortedFlights = flights;
        sort(sortedFlights.begin(), sortedFlights.end(),
             [](const shared_ptr<Flight>& a, const shared_ptr<Flight>& b) {
                 return a->getBasePrice() < b->getBasePrice();
             });

        int left = 0, right = sortedFlights.size() - 1;
        shared_ptr<Flight> result = nullptr;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            double price = sortedFlights[mid]->getBasePrice();

            if (price <= maxPrice) {
                result = sortedFlights[mid];
                left = mid + 1; // Look for cheaper options
            } else {
                right = mid - 1;
            }
        }
        return result;
    }

    // ============================================================================
    // SORTING ALGORITHMS
    // ============================================================================

    // Sort flights by price using quick sort
    void sortFlightsByPrice(vector<shared_ptr<Flight>>& flightList) {
        quickSort(flightList, 0, flightList.size() - 1);
    }

    void quickSort(vector<shared_ptr<Flight>>& arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    int partition(vector<shared_ptr<Flight>>& arr, int low, int high) {
        double pivot = arr[high]->getBasePrice();
        int i = low - 1;

        for (int j = low; j < high; j++) {
            if (arr[j]->getBasePrice() <= pivot) {
                i++;
                swap(arr[i], arr[j]);
            }
        }
        swap(arr[i + 1], arr[high]);
        return i + 1;
    }

    // Sort bookings by total price using merge sort
    void sortBookingsByPrice() {
        mergeSort(bookings, 0, bookings.size() - 1);
    }

    void mergeSort(vector<shared_ptr<Booking>>& arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }

    void merge(vector<shared_ptr<Booking>>& arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;

        vector<shared_ptr<Booking>> L(n1), R(n2);
        for (int i = 0; i < n1; i++) L[i] = arr[left + i];
        for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            if (L[i]->getTotalPrice() <= R[j]->getTotalPrice()) {
                arr[k] = L[i]; i++;
            } else {
                arr[k] = R[j]; j++;
            }
            k++;
        }

        while (i < n1) { arr[k] = L[i]; i++; k++; }
        while (j < n2) { arr[k] = R[j]; j++; k++; }
    }

    // ============================================================================
    // DISPLAY METHODS
    // ============================================================================

    void displayAllFlights() const {
        cout << "Available Flights:" << endl;
        for (const auto& flight : flights) {
            flight->displayInfo();
            cout << "Base Price: $" << flight->getBasePrice() << endl << endl;
        }
    }

    void displayAllBookings() const {
        cout << "All Bookings:" << endl;
        for (const auto& booking : bookings) {
            booking->displayBooking();
            cout << "------------------------" << endl;
        }
    }

    double getTotalRevenue() const {
        double total = 0.0;
        for (const auto& booking : bookings) {
            if (booking->isConfirmed()) {
                total += booking->getTotalPrice();
            }
        }
        return total;
    }

    const vector<shared_ptr<Flight>>& getFlights() const { return flights; }
    const vector<shared_ptr<Booking>>& getBookings() const { return bookings; }
};

// ============================================================================
// ADVANCED ALGORITHMS
// ============================================================================

// Dijkstra's Algorithm for route optimization
class RouteOptimizer {
private:
    unordered_map<string, vector<pair<string, double>>> graph; // city -> [(destination, price)]

public:
    void addFlightRoute(const string& from, const string& to, double price) {
        graph[from].push_back({to, price});
        graph[to].push_back({from, price}); // Assuming bidirectional
    }

    double findCheapestRoute(const string& start, const string& end) {
        unordered_map<string, double> distances;
        priority_queue<pair<double, string>, vector<pair<double, string>>, greater<pair<double, string>>> pq;

        for (auto& city : graph) {
            distances[city.first] = numeric_limits<double>::infinity();
        }
        distances[start] = 0;
        pq.push({0, start});

        while (!pq.empty()) {
            auto [cost, current] = pq.top(); pq.pop();

            if (cost > distances[current]) continue;

            for (auto& [neighbor, price] : graph[current]) {
                double newCost = cost + price;
                if (newCost < distances[neighbor]) {
                    distances[neighbor] = newCost;
                    pq.push({newCost, neighbor});
                }
            }
        }

        return distances[end];
    }
};

// Greedy algorithm for seat assignment
class SeatAssigner {
private:
    vector<vector<bool>> seatMap; // true = occupied

public:
    SeatAssigner(int rows, int cols) : seatMap(rows, vector<bool>(cols, false)) {}

    pair<int, int> assignBestSeat() {
        // Priority: aisle seats, then window seats, then middle
        vector<pair<int, int>> preferences;

        const std::size_t cols = seatMap[0].size();
        for (std::size_t row = 0; row < seatMap.size(); ++row) {
            // Aisle seats (assuming 3-3-3 configuration: seats 0,2,3,5 are aisle)
            if (!seatMap[row][0]) preferences.push_back({row, 0}); // Aisle
            if (!seatMap[row][2]) preferences.push_back({row, 2}); // Aisle
            if (!seatMap[row][3]) preferences.push_back({row, 3}); // Aisle
            if (!seatMap[row][5]) preferences.push_back({row, 5}); // Aisle

            // Window seats
            if (!seatMap[row][cols-1]) preferences.push_back({row, cols-1}); // Window
        }

        if (!preferences.empty()) {
            auto seat = preferences[0];
            seatMap[seat.first][seat.second] = true;
            return seat;
        }

        // Fallback: first available seat
        for (std::size_t row = 0; row < seatMap.size(); ++row) {
            for (std::size_t col = 0; col < seatMap[row].size(); ++col) {
                if (!seatMap[row][col]) {
                    seatMap[row][col] = true;
                    return {row, col};
                }
            }
        }

        return {-1, -1}; // No seats available
    }

    void displaySeatMap() const {
        cout << "Seat Map (O = occupied, . = available):" << endl;
        for (std::size_t row = 0; row < seatMap.size(); ++row) {
            for (std::size_t col = 0; col < seatMap[row].size(); ++col) {
                cout << (seatMap[row][col] ? "O" : ".") << " ";
            }
            cout << endl;
        }
    }
};

// ============================================================================
// DESIGN PATTERNS
// ============================================================================

// Factory Pattern for creating different types of flights
class FlightFactory {
public:
    static shared_ptr<Flight> createFlight(string type, string fn, string dep, string arr, string depTime, string arrTime, int seats) {
        if (type == "Domestic") {
            return make_shared<DomesticFlight>(fn, dep, arr, depTime, arrTime, seats);
        } else if (type == "International") {
            return make_shared<InternationalFlight>(fn, dep, arr, depTime, arrTime, seats);
        }
        return nullptr;
    }
};

// Strategy Pattern for different pricing strategies
class PricingStrategy {
public:
    virtual double calculatePrice(double basePrice, SeatClass seatClass) = 0;
    virtual ~PricingStrategy() = default;
};

class StandardPricing : public PricingStrategy {
public:
    double calculatePrice(double basePrice, SeatClass seatClass) override {
        double multiplier = 1.0;
        switch (seatClass) {
            case SeatClass::Economy: multiplier = 1.0; break;
            case SeatClass::Business: multiplier = 2.5; break;
            case SeatClass::First: multiplier = 4.0; break;
        }
        return basePrice * multiplier;
    }
};

class DiscountPricing : public PricingStrategy {
public:
    double calculatePrice(double basePrice, SeatClass seatClass) override {
        double multiplier = 0.8; // 20% discount
        switch (seatClass) {
            case SeatClass::Economy: multiplier = 0.8; break;
            case SeatClass::Business: multiplier = 2.0; break; // 2.0 * 0.8 = 1.6x base
            case SeatClass::First: multiplier = 3.2; break;    // 4.0 * 0.8 = 3.2x base
        }
        return basePrice * multiplier;
    }
};

// ============================================================================
// MAIN FUNCTION - DEMONSTRATION
// ============================================================================

int main() {
    cout << "=== FLIGHT BOOKING SYSTEM DEMONSTRATION ===" << endl << endl;

    FlightBookingSystem system;

    // Add flights using Factory Pattern
    auto domesticFlight = FlightFactory::createFlight("Domestic", "AI101", "Delhi", "Mumbai", "10:00", "11:30", 150);
    auto internationalFlight = FlightFactory::createFlight("International", "AI301", "Delhi", "New York", "22:00", "06:00", 300);

    system.addFlight(domesticFlight);
    system.addFlight(internationalFlight);

    // Create passengers
    auto passenger1 = make_shared<Passenger>("John Doe", "P123456", "+91-9876543210", "john@example.com");
    auto passenger2 = make_shared<Passenger>("Jane Smith", "P789012", "+1-555-0123", "jane@example.com");

    // Create bookings
    auto booking1 = system.createBooking(passenger1, "AI101", SeatClass::Economy);
    auto booking2 = system.createBooking(passenger2, "AI301", SeatClass::Business);

    // Confirm bookings
    if (booking1) booking1->confirmBooking();
    if (booking2) booking2->confirmBooking();

    // Display information
    system.displayAllFlights();
    system.displayAllBookings();

    cout << "Total Revenue: $" << system.getTotalRevenue() << endl << endl;

    // ============================================================================
    // DEMONSTRATE SEARCH ALGORITHMS
    // ============================================================================

    cout << "=== SEARCH ALGORITHMS DEMONSTRATION ===" << endl;

    // Linear search for flights to Mumbai
    auto mumbaiFlight = system.findFlightByDestination("Mumbai");
    if (mumbaiFlight) {
        cout << "Found flight to Mumbai: " << mumbaiFlight->getFlightNumber() << endl;
    }

    // Linear search for flights in price range
    auto affordableFlights = system.findFlightsByPriceRange(4000, 6000);
    cout << "Flights in price range $4000-$6000: " << affordableFlights.size() << endl;

    // Binary search for cheapest flight under budget
    auto cheapFlight = system.findCheapestFlight(10000);
    if (cheapFlight) {
        cout << "Cheapest flight under $10000: " << cheapFlight->getFlightNumber()
             << " ($" << cheapFlight->getBasePrice() << ")" << endl;
    }

    cout << endl;

    // ============================================================================
    // DEMONSTRATE SORTING ALGORITHMS
    // ============================================================================

    cout << "=== SORTING ALGORITHMS DEMONSTRATION ===" << endl;

    // Sort flights by price
    vector<shared_ptr<Flight>> flightList = system.getFlights();
    system.sortFlightsByPrice(flightList);
    cout << "Flights sorted by price:" << endl;
    for (const auto& flight : flightList) {
        cout << flight->getFlightNumber() << ": $" << flight->getBasePrice() << endl;
    }

    // Sort bookings by price
    system.sortBookingsByPrice();
    cout << "\nBookings sorted by total price:" << endl;
    for (const auto& booking : system.getBookings()) {
        cout << booking->getPassenger()->getName() << ": $" << booking->getTotalPrice() << endl;
    }

    cout << endl;

    // ============================================================================
    // DEMONSTRATE ADVANCED ALGORITHMS
    // ============================================================================

    cout << "=== ADVANCED ALGORITHMS DEMONSTRATION ===" << endl;

    // Dijkstra's algorithm for route optimization
    RouteOptimizer optimizer;
    optimizer.addFlightRoute("Delhi", "Mumbai", 5000);
    optimizer.addFlightRoute("Mumbai", "Bangalore", 3000);
    optimizer.addFlightRoute("Delhi", "Bangalore", 8000);

    double cheapestRoute = optimizer.findCheapestRoute("Delhi", "Bangalore");
    cout << "Cheapest route Delhi -> Bangalore: $" << cheapestRoute << endl;

    // Greedy seat assignment
    SeatAssigner seatAssigner(10, 6); // 10 rows, 6 seats per row
    cout << "\nInitial seat map:" << endl;
    seatAssigner.displaySeatMap();

    // Assign some seats
    for (int i = 0; i < 5; i++) {
        auto seat = seatAssigner.assignBestSeat();
        if (seat.first != -1) {
            cout << "Assigned seat: Row " << seat.first + 1 << ", Seat " << seat.second + 1 << endl;
        }
    }

    cout << "\nFinal seat map:" << endl;
    seatAssigner.displaySeatMap();

    cout << endl;

    // ============================================================================
    // DEMONSTRATE DESIGN PATTERNS
    // ============================================================================

    cout << "=== DESIGN PATTERNS DEMONSTRATION ===" << endl;

    // Strategy pattern for pricing
    StandardPricing standardPricing;
    DiscountPricing discountPricing;

    double basePrice = 5000;
    cout << "Base price: $" << basePrice << endl;
    cout << "Standard Business class: $" << standardPricing.calculatePrice(basePrice, SeatClass::Business) << endl;
    cout << "Discount Business class: $" << discountPricing.calculatePrice(basePrice, SeatClass::Business) << endl;

    cout << endl << "=== DEMONSTRATION COMPLETE ===" << endl;

    return 0;
}
