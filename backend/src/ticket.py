from datetime import datetime
import os

import psycopg2
from dotenv import load_dotenv
from psycopg2 import DatabaseError

destinations = {
    "Kakadbhitta": {"id": 1, "ew_distance": 0, "we_distance": 110},
    "Biratnagar": {"id": 2, "ew_distance": 110, "we_distance": 118},
    "Lahan": {"id": 3, "ew_distance": 118, "we_distance": 87},
    "Janakpur": {"id": 4, "ew_distance": 87, "we_distance": 135},
    "Pathlaiya": {"id": 5, "ew_distance": 135, "we_distance": 120},
    "Kathmandu": {"id": 6, "ew_distance": 120, "we_distance": 145},
    "Narayangarh": {"id": 7, "ew_distance": 145, "we_distance": 125},
    "Pokhara": {"id": 8, "ew_distance": 125, "we_distance": 162},
    "Butwal": {"id": 9, "ew_distance": 162, "we_distance": 41},
    "Lumbini": {"id": 10, "ew_distance": 41, "we_distance": 111},
    "Lamahi": {"id": 11, "ew_distance": 111, "we_distance": 136},
    "Nepalgunj": {"id": 12, "ew_distance": 136, "we_distance": 107},
    "Surkhet": {"id": 13, "ew_distance": 107, "we_distance": 157},
    "Chisapani": {"id": 14, "ew_distance": 157, "we_distance": 80},
    "Dhading": {"id": 15, "ew_distance": 80, "we_distance": 62},
    "Banbasa": {"id": 16, "ew_distance": 62, "we_distance": 0},
}


def get_pnr_number(date: str, sid: int, did: int) -> str:
    book_date = "".join(date.split("-"))[2:]
    time = datetime.now().strftime("%H%M%S")
    return f"{book_date}-{get_train_name(sid, did)}-{time}"


def get_train_name(sid: int, did: int) -> str:
    return "DORE-WNPL" if sid < did else "DORW-ENPL"


class Ticket:
    # Class constants for ticket limits
    TOTAL_ECONOMY_TICKETS = 200
    TOTAL_BUSINESS_TICKETS = 40
    TOTAL_FIRST_CLASS_TICKETS = 80
    TOTAL_LADIES_TICKETS = 80

    # Constants for ticket pricing
    ECONOMY_BASE_FARE = 20
    ECONOMY_RATE_PER_KM = 0.25
    BUSINESS_BASE_FARE = 500
    BUSINESS_RATE_PER_KM = 5
    FIRST_CLASS_BASE_FARE = 300
    FIRST_CLASS_RATE_PER_KM = 3
    LADIES_BASE_FARE = 20
    LADIES_RATE_PER_KM = 0.20
    FREE_DISTANCE = 100

    def __init__(self, source_station: str, destination_station: str, journey_date: str, class_type: str):
        """Initialize a Train Ticket Reservation instance."""
        load_dotenv()
        self.__conn = psycopg2.connect(os.getenv("DATABASE_URL"))
        self.__cur = self.__conn.cursor()
        self.__source_station = source_station
        self.__destination_station = destination_station
        self.__journey_date = journey_date
        self.__class_type = class_type

    def __available_tickets(self, class_type: str, date: str, total_tickets: int) -> int:
        """Returns the number of available tickets for a given class type and journey date."""
        try:
            sql = '''
                SELECT COUNT(*)
                FROM ticket
                WHERE class_type = %s
                AND DATE(journey_date) = %s
                AND ticket_status IN (%s, %s)
            '''
            self.__cur.execute(sql, (class_type, date, 'Confirmed', 'Waiting'))
            booked_ticket = self.__cur.fetchone()
            booked_ticket_count = booked_ticket[0] if booked_ticket else 0
            return max(total_tickets - booked_ticket_count, 0)

        except DatabaseError as error:
            return -1  # Return a negative value to indicate an error

    def __available_economy_tickets(self) -> int:
        return self.__available_tickets('Economy', self.__journey_date, self.TOTAL_ECONOMY_TICKETS)

    def __available_business_tickets(self) -> int:
        return self.__available_tickets('Business', self.__journey_date, self.TOTAL_BUSINESS_TICKETS)

    def __available_first_class_tickets(self) -> int:
        return self.__available_tickets('First Class', self.__journey_date, self.TOTAL_FIRST_CLASS_TICKETS)

    def __available_ladies_tickets(self) -> int:
        return self.__available_tickets('Ladies', self.__journey_date, self.TOTAL_LADIES_TICKETS)

    def search_available_tickets(self) -> dict:
        match self.__class_type:
            case 'Economy':
                return {
                    "status": True,
                    "tickets": [{"Economy": self.__available_economy_tickets()}],
                    "distance": self.__get_distance(),
                    "ticket_price": self.get_price_per_ticket()
                }
            case 'Business':
                return {
                    "status": True,
                    "tickets": [{"Business": self.__available_business_tickets()}],
                    "distance": self.__get_distance(),
                    "ticket_price": self.get_price_per_ticket()
                }
            case 'First Class':
                return {
                    "status": True,
                    "tickets": [{"First Class": self.__available_first_class_tickets()}],
                    "distance": self.__get_distance(),
                    "ticket_price": self.get_price_per_ticket()
                }
            case 'Ladies':
                return {
                    "status": True,
                    "tickets": [{"Ladies": self.__available_ladies_tickets()}],
                    "distance": self.__get_distance(),
                    "ticket_price": self.get_price_per_ticket()
                }
            case "All":
                return {
                    "status": True,
                    "tickets": [
                        {"Economy": self.__available_economy_tickets()},
                        {"Business": self.__available_business_tickets()},
                        {"First Class": self.__available_first_class_tickets()},
                        {"Ladies": self.__available_ladies_tickets()}
                    ],
                    "distance": self.__get_distance(),
                    "ticket_price": self.get_price_per_ticket()
                }

        return {"status": False, "message": "Unknown ticket type"}

    def __get_distance(self) -> int:
        """Calculate distance between two stations."""
        source_id = destinations[self.__source_station]['id']
        destination_id = destinations[self.__destination_station]['id']

        if source_id < destination_id:
            route_stations = list(destinations.values())[source_id - 1:destination_id]
            total_distance = sum(station['ew_distance'] for station in route_stations)
            return total_distance - destinations[self.__source_station]['ew_distance']
        else:
            route_stations = list(destinations.values())[destination_id - 1:source_id]
            total_distance = sum(station['we_distance'] for station in route_stations)
            return total_distance - destinations[self.__destination_station]['we_distance']

    def get_price_per_ticket(self, all_type: str = None) -> None | float | int | list[dict]:
        """Calculate the ticket price based on distance."""
        distance = self.__get_distance()
        extra_distance = distance - self.FREE_DISTANCE
        match all_type or self.__class_type:
            case "Economy":
                if distance <= self.FREE_DISTANCE:
                    return self.ECONOMY_BASE_FARE

                return round(self.ECONOMY_BASE_FARE + extra_distance * self.ECONOMY_RATE_PER_KM, 2)

            case "Business":
                if distance <= self.FREE_DISTANCE:
                    return self.BUSINESS_BASE_FARE

                return round(self.BUSINESS_BASE_FARE + extra_distance * self.BUSINESS_RATE_PER_KM, 2)
            case "First Class":
                if distance <= self.FREE_DISTANCE:
                    return self.FIRST_CLASS_BASE_FARE

                return round(self.FIRST_CLASS_BASE_FARE + extra_distance * self.FIRST_CLASS_RATE_PER_KM, 2)
            case "Ladies":
                if distance <= self.FREE_DISTANCE:
                    return self.LADIES_BASE_FARE

                return round(self.LADIES_BASE_FARE + extra_distance * self.LADIES_RATE_PER_KM, 2)
            case "All":
                classes = ['Economy', 'Business', 'First Class', 'Ladies']
                prices = []
                for cls in classes:
                    prices.append({cls: self.get_price_per_ticket(cls)})
                return prices

    def __del__(self):
        self.__cur.close()
        self.__conn.close()


# t = Ticket("Janakpur", "Kathmandu", "2025-02-13", "All")

# print(t.search_available_tickets())

# print(t.get_price_per_ticket())








# def get_distance(source: str, destination: str) -> int:
#     """Calculate distance between two stations."""
#     if source not in destinations or destination not in destinations:
#         raise ValueError("Invalid station name.")
#
#     source_id = destinations[source]['id']
#     destination_id = destinations[destination]['id']
#
#     if source_id < destination_id:
#         route_stations = list(destinations.values())[source_id - 1:destination_id]
#         total_distance = sum(station['ew_distance'] for station in route_stations)
#         return total_distance - destinations[source]['ew_distance']
#     else:
#         route_stations = list(destinations.values())[destination_id - 1:source_id]
#         total_distance = sum(station['we_distance'] for station in route_stations)
#         return total_distance - destinations[destination]['we_distance']
#
#
#
#
# # Constants for ticket pricing
# ECONOMY_BASE_FARE = 20
# ECONOMY_RATE_PER_KM = 0.25
# BUSINESS_BASE_FARE = 500
# BUSINESS_RATE_PER_KM = 5
# FIRST_CLASS_BASE_FARE = 300
# FIRST_CLASS_RATE_PER_KM = 3
# LADIES_BASE_FARE = 20
# LADIES_RATE_PER_KM = 0.20
# FREE_DISTANCE = 100
#
#
# def get_price_per_ticket(distance: int, class_type: str) -> float:
#     """Calculate the ticket price based on distance."""
#     extra_distance = distance - FREE_DISTANCE
#     match class_type:
#         case "Economy":
#             if distance <= FREE_DISTANCE:
#                 return ECONOMY_BASE_FARE
#
#             return round(ECONOMY_BASE_FARE + extra_distance * ECONOMY_RATE_PER_KM, 2)
#
#         case "Business":
#             if distance <= FREE_DISTANCE:
#                 return BUSINESS_BASE_FARE
#
#             return round(BUSINESS_BASE_FARE + extra_distance * BUSINESS_RATE_PER_KM, 2)
#         case "First Class":
#             if distance <= FREE_DISTANCE:
#                 return FIRST_CLASS_BASE_FARE
#
#             return round(FIRST_CLASS_BASE_FARE + extra_distance * FIRST_CLASS_RATE_PER_KM, 2)
#         case "Ladies":
#             if distance <= FREE_DISTANCE:
#                 return LADIES_BASE_FARE
#
#             return round(LADIES_BASE_FARE + extra_distance * LADIES_RATE_PER_KM, 2)
#
#
# # Example Usage
# distance = get_distance("Kathmandu", "Janakpur")
# print("Distance:", distance)
# #
# ticket_price = get_price_per_ticket(get_distance("Kathmandu", "Janakpur"), "First Class")
# print("Ticket Price:", ticket_price)

