from datetime import datetime, timedelta
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
economy_seats: list = ['A1-01', 'A1-02', 'A1-03', 'A1-04', 'A1-05', 'A1-06', 'A1-07', 'A1-08', 'A1-09', 'A1-10',
                       'A1-11', 'A1-12', 'A1-13', 'A1-14', 'A1-15', 'A1-16', 'A1-17', 'A1-18', 'A1-19', 'A1-20',
                       'A2-01', 'A2-02', 'A2-03', 'A2-04', 'A2-05', 'A2-06', 'A2-07', 'A2-08', 'A2-09', 'A2-10',
                       'A2-11', 'A2-12', 'A2-13', 'A2-14', 'A2-15', 'A2-16', 'A2-17', 'A2-18', 'A2-19', 'A2-20',
                       'B1-01', 'B1-02', 'B1-03', 'B1-04', 'B1-05', 'B1-06', 'B1-07', 'B1-08', 'B1-09', 'B1-10',
                       'B1-11', 'B1-12', 'B1-13', 'B1-14', 'B1-15', 'B1-16', 'B1-17', 'B1-18', 'B1-19', 'B1-20',
                       'B2-01', 'B2-02', 'B2-03', 'B2-04', 'B2-05', 'B2-06', 'B2-07', 'B2-08', 'B2-09', 'B2-10',
                       'B2-11', 'B2-12', 'B2-13', 'B2-14', 'B2-15', 'B2-16', 'B2-17', 'B2-18', 'B2-19', 'B2-20',
                       'C1-01', 'C1-02', 'C1-03', 'C1-04', 'C1-05', 'C1-06', 'C1-07', 'C1-08', 'C1-09', 'C1-10',
                       'C1-11', 'C1-12', 'C1-13', 'C1-14', 'C1-15', 'C1-16', 'C1-17', 'C1-18', 'C1-19', 'C1-20',
                       'C2-01', 'C2-02', 'C2-03', 'C2-04', 'C2-05', 'C2-06', 'C2-07', 'C2-08', 'C2-09', 'C2-10',
                       'C2-11', 'C2-12', 'C2-13', 'C2-14', 'C2-15', 'C2-16', 'C2-17', 'C2-18', 'C2-19', 'C2-20',
                       'D1-01', 'D1-02', 'D1-03', 'D1-04', 'D1-05', 'D1-06', 'D1-07', 'D1-08', 'D1-09', 'D1-10',
                       'D1-11', 'D1-12', 'D1-13', 'D1-14', 'D1-15', 'D1-16', 'D1-17', 'D1-18', 'D1-19', 'D1-20',
                       'D2-01', 'D2-02', 'D2-03', 'D2-04', 'D2-05', 'D2-06', 'D2-07', 'D2-08', 'D2-09', 'D2-10',
                       'D2-11', 'D2-12', 'D2-13', 'D2-14', 'D2-15', 'D2-16', 'D2-17', 'D2-18', 'D2-19', 'D2-20',
                       'E1-01', 'E1-02', 'E1-03', 'E1-04', 'E1-05', 'E1-06', 'E1-07', 'E1-08', 'E1-09', 'E1-10',
                       'E1-11', 'E1-12', 'E1-13', 'E1-14', 'E1-15', 'E1-16', 'E1-17', 'E1-18', 'E1-19', 'E1-20',
                       'E2-01', 'E2-02', 'E2-03', 'E2-04', 'E2-05', 'E2-06', 'E2-07', 'E2-08', 'E2-09', 'E2-10',
                       'E2-11', 'E2-12', 'E2-13', 'E2-14', 'E2-15', 'E2-16', 'E2-17', 'E2-18', 'E2-19', 'E2-20']
ladies_seats: list = ['A1-01', 'A1-02', 'A1-03', 'A1-04', 'A1-05', 'A1-06', 'A1-07', 'A1-08', 'A1-09', 'A1-10', 'A1-11',
                      'A1-12', 'A1-13', 'A1-14', 'A1-15', 'A1-16', 'A1-17', 'A1-18', 'A1-19', 'A1-20', 'A2-01', 'A2-02',
                      'A2-03', 'A2-04', 'A2-05', 'A2-06', 'A2-07', 'A2-08', 'A2-09', 'A2-10', 'A2-11', 'A2-12', 'A2-13',
                      'A2-14', 'A2-15', 'A2-16', 'A2-17', 'A2-18', 'A2-19', 'A2-20', 'B1-01', 'B1-02', 'B1-03', 'B1-04',
                      'B1-05', 'B1-06', 'B1-07', 'B1-08', 'B1-09', 'B1-10', 'B1-11', 'B1-12', 'B1-13', 'B1-14', 'B1-15',
                      'B1-16', 'B1-17', 'B1-18', 'B1-19', 'B1-20', 'B2-01', 'B2-02', 'B2-03', 'B2-04', 'B2-05', 'B2-06',
                      'B2-07', 'B2-08', 'B2-09', 'B2-10', 'B2-11', 'B2-12', 'B2-13', 'B2-14', 'B2-15', 'B2-16', 'B2-17',
                      'B2-18', 'B2-19', 'B2-20']
business_seats: list = ['A1-01', 'A1-02', 'A1-03', 'A1-04', 'A1-05', 'A1-06', 'A1-07', 'A1-08', 'A1-09', 'A1-10',
                        'A1-11', 'A1-12', 'A1-13', 'A1-14', 'A1-15', 'A1-16', 'A1-17', 'A1-18', 'A1-19', 'A1-20',
                        'A2-01', 'A2-02', 'A2-03', 'A2-04', 'A2-05', 'A2-06', 'A2-07', 'A2-08', 'A2-09', 'A2-10',
                        'A2-11', 'A2-12', 'A2-13', 'A2-14', 'A2-15', 'A2-16', 'A2-17', 'A2-18', 'A2-19', 'A2-20']


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

    def __check_station_validity(self):
        if self.__source_station not in destinations or self.__destination_station not in destinations:
            return False
        return True

    def __is_within_next_week(self) -> bool:
        try:
            # Convert ISO string to datetime object
            input_date = datetime.fromisoformat(self.__journey_date.rstrip("Z")).date()

            # Get today's date
            today = datetime.today().date()

            # Define the valid range
            start_date = today + timedelta(days=1)  # Tomorrow
            end_date = today + timedelta(days=7)  # Next 6 days from tomorrow

            return start_date <= input_date <= end_date
        except ValueError:
            return False

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
        if not self.__is_within_next_week():
            return {"status": False}

        if not self.__check_station_validity():
            return {"status": False}

        match self.__class_type:
            case 'Economy':
                return {
                    "status": True,
                    "ticket": {"Economy": self.__available_economy_tickets()},
                    "distance": self.__get_distance(),
                    "ticket_price": self.__get_price_per_ticket(),
                    "train_name": self.__get_train_name(),
                    "total_ticket": self.TOTAL_ECONOMY_TICKETS,
                }
            case 'Ladies':
                return {
                    "status": True,
                    "ticket": {"Ladies": self.__available_ladies_tickets()},
                    "distance": self.__get_distance(),
                    "ticket_price": self.__get_price_per_ticket(),
                    "train_name": self.__get_train_name(),
                    "total_ticket": self.TOTAL_LADIES_TICKETS,
                }
            case 'First Class':
                return {
                    "status": True,
                    "ticket": {"First Class": self.__available_first_class_tickets()},
                    "distance": self.__get_distance(),
                    "ticket_price": self.__get_price_per_ticket(),
                    "train_name": self.__get_train_name(),
                    "total_ticket": self.TOTAL_FIRST_CLASS_TICKETS,
                }
            case 'Business':
                return {
                    "status": True,
                    "ticket": {"Business": self.__available_business_tickets()},
                    "distance": self.__get_distance(),
                    "ticket_price": self.__get_price_per_ticket(),
                    "train_name": self.__get_train_name(),
                    "total_ticket": self.TOTAL_BUSINESS_TICKETS,
                }
            case "All":
                return {
                    "status": True,
                    "tickets": [
                        {"Economy": self.__available_economy_tickets()},
                        {"Ladies": self.__available_ladies_tickets()},
                        {"First Class": self.__available_first_class_tickets()},
                        {"Business": self.__available_business_tickets()}
                    ],
                    "distance": self.__get_distance(),
                    "ticket_prices": self.__get_price_per_ticket(),
                    "train_name": self.__get_train_name(),
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

    def __get_price_per_ticket(self, all_type: str = None) -> None | float | int | list[dict]:
        """Calculate the ticket price based on distance."""
        distance = self.__get_distance()
        extra_distance = distance - self.FREE_DISTANCE
        match all_type or self.__class_type:
            case "Economy":
                if distance <= self.FREE_DISTANCE:
                    return self.ECONOMY_BASE_FARE

                return round(self.ECONOMY_BASE_FARE + extra_distance * self.ECONOMY_RATE_PER_KM, 2)
            case "Ladies":
                if distance <= self.FREE_DISTANCE:
                    return self.LADIES_BASE_FARE

                return round(self.LADIES_BASE_FARE + extra_distance * self.LADIES_RATE_PER_KM, 2)
            case "First Class":
                if distance <= self.FREE_DISTANCE:
                    return self.FIRST_CLASS_BASE_FARE

                return round(self.FIRST_CLASS_BASE_FARE + extra_distance * self.FIRST_CLASS_RATE_PER_KM, 2)
            case "Business":
                if distance <= self.FREE_DISTANCE:
                    return self.BUSINESS_BASE_FARE

                return round(self.BUSINESS_BASE_FARE + extra_distance * self.BUSINESS_RATE_PER_KM, 2)

            case "All":
                classes = ['Economy', 'Ladies', 'First Class', 'Business']
                prices = []
                for cls in classes:
                    prices.append({cls: self.__get_price_per_ticket(cls)})
                return prices

    def __get_train_name(self) -> str:
        source_id = destinations[self.__source_station]['id']
        destination_id = destinations[self.__destination_station]['id']
        return "DORE-WNPL" if source_id < destination_id else "DORW-ENPL"

    def __get_pnr_number(self) -> str:
        book_date = "".join(self.__journey_date.split("-"))[2:]
        current_time = datetime.now().strftime("%H%M%S")
        return f"{book_date}-{self.__get_train_name()}-{current_time}"

    def __get_seats(self, total_tickets: int) -> list:
        sql: str = '''
            SELECT count(seat_number) FROM ticket
            WHERE  class_type = %s and journey_date = %s
        '''
        self.__cur.execute(sql, (self.__class_type, self.__journey_date))
        booked_seats = self.__cur.fetchone()[0]
        return economy_seats[booked_seats:booked_seats + total_tickets]




    def book_ticket(self, data: dict) -> dict[str, str]:
        pnr_number: str = self.__get_pnr_number()
        seats = self.__get_seats(data["total_tickets"])
        for seat in seats:
            try:
                sql: str = '''
                            INSERT INTO ticket
                            (passenger_id, pnr_number, train_id, source_station, destination_station, departure_time, arrival_time, seat_number, ticket_status, class_type, fare, journey_date)
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        '''
                self.__cur.execute(sql, (
                    data['passenger_id'],
                    pnr_number,
                    data['train_id'],
                    self.__source_station,
                    self.__destination_station,
                    f"{self.__journey_date} {data['departure_time']}",
                    f"{self.__journey_date} {data['arrival_time']}",
                    seat,
                    "Waiting",
                    self.__class_type,
                    data['fare'] / len(seats),
                    self.__journey_date,
                ))
                self.__conn.commit()
            except Exception as e:
                self.__conn.rollback()
                return {"status": False, "message": str(e)}
        return {"status": True, "message": "Ticket booking successful", "pnr": pnr_number}


    def ticket_details(self, pnr: str):
        try:
            sql: str = '''
                SELECT fare, class_type, ticket_status  FROM ticket WHERE pnr_number = %s
            '''
            self.__cur.execute(sql, (pnr,))
            tickets = self.__cur.fetchone()
            print(tickets)
        except Exception as e:
            print(e)


    def __del__(self):
        self.__cur.close()
        self.__conn.close()


t = Ticket("Janakpur", "Kathmandu", "2025-03-10", "Economy")
# t.ticket_details('250310-DORW-ENPL-164433')
