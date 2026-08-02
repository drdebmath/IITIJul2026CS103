// Lecture 22 · An applied object system with index-based associations

#include <algorithm>
#include <cassert>
#include <iostream>
#include <memory>
#include <string>
#include <vector>

struct Flight {
    std::string code;
    std::string from;
    std::string to;
    int availableSeats;
    double price;
};

struct Passenger {
    std::string rollNumber;
    std::string name;
};

struct Booking {
    std::size_t flightIndex;
    std::size_t passengerIndex;
};

class FlightOrder {
public:
    virtual bool before(const Flight& first, const Flight& second) const = 0;
    virtual ~FlightOrder() = default;
};

class CheapestFirst : public FlightOrder {
public:
    bool before(const Flight& first, const Flight& second) const override {
        if (first.price != second.price) {
            return first.price < second.price;
        }
        return first.code < second.code;
    }
};

std::unique_ptr<FlightOrder> makeCheapestFirstPolicy() {
    return std::make_unique<CheapestFirst>();
}

class BookingSystem {
    std::vector<Flight> flights_;
    std::vector<Passenger> passengers_;
    std::vector<Booking> bookings_;

public:
    bool addFlight(const Flight& flight) {
        if (flight.code.empty() || flight.from.empty() || flight.to.empty() ||
            flight.availableSeats < 0 || flight.price < 0.0) {
            return false;
        }
        flights_.push_back(flight);
        return true;
    }

    std::size_t addPassenger(const Passenger& passenger) {
        passengers_.push_back(passenger);
        return passengers_.size() - 1;
    }

    bool book(std::size_t flightIndex, std::size_t passengerIndex) {
        if (flightIndex >= flights_.size() || passengerIndex >= passengers_.size()) {
            return false;
        }
        if (flights_[flightIndex].availableSeats == 0) {
            return false;
        }
        bookings_.push_back(Booking{flightIndex, passengerIndex});
        --flights_[flightIndex].availableSeats;
        return true;
    }

    std::vector<Flight> route(const std::string& from, const std::string& to) const {
        std::vector<Flight> matches;
        for (const Flight& flight : flights_) {
            if (flight.from == from && flight.to == to) {
                matches.push_back(flight);
            }
        }
        return matches;
    }

    void sortFlights(const FlightOrder& policy) {
        std::sort(flights_.begin(), flights_.end(),
            [&policy](const Flight& first, const Flight& second) {
                return policy.before(first, second);
            });
    }

    const std::vector<Flight>& flights() const { return flights_; }
    const std::vector<Booking>& bookings() const { return bookings_; }
};

int main() {
    BookingSystem system;
    assert(!system.addFlight(Flight{"BAD", "IDR", "DEL", -1, 1000.0}));
    assert(system.addFlight(Flight{"CS103B", "IDR", "DEL", 1, 3200.0}));
    assert(system.addFlight(Flight{"CS103A", "IDR", "DEL", 2, 2500.0}));

    std::size_t passenger = system.addPassenger(Passenger{"BT001", "Asha"});
    assert(system.book(0, passenger));
    assert(!system.book(0, passenger));

    std::vector<Flight> matches = system.route("IDR", "DEL");
    assert(matches.size() == 2);

    std::unique_ptr<FlightOrder> policy = makeCheapestFirstPolicy();
    system.sortFlights(*policy);
    assert(system.flights()[0].price == 2500.0);
    assert(system.bookings().size() == 1);
    std::cout << system.flights()[0].code << " is cheapest\n";
}
