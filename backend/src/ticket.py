from datetime import datetime, timedelta
import os

import psycopg2
from dotenv import load_dotenv
from psycopg2 import DatabaseError
from ticket_data import destinations, seat_numbers


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
        return seat_numbers[booked_seats:booked_seats + total_tickets]




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


    def ticket_details(self, passenger_id: int):
        try:
            sql: str = '''
                SELECT DISTINCT pnr_number, class_type, fare, journey_date
                FROM ticket
                WHERE passenger_id = %s
                    AND journey_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days';
            '''
            self.__cur.execute(sql, (passenger_id,))
            distinct_pnr_numbers = self.__cur.fetchall()
            keys = ['pnr_number', 'class_type', 'fare', 'journey_date', 'number_of_tickets']
            final_data = []
            for i, pnr_number in enumerate(distinct_pnr_numbers):
                sql = '''
                    SELECT COUNT(pnr_number) FROM ticket WHERE pnr_number = %s;
                '''
                self.__cur.execute(sql, (pnr_number[0],))
                seats = self.__cur.fetchone()[0]
                data_list = list(distinct_pnr_numbers[i])
                data_list.append(seats)
                data_dict = dict(zip(keys, data_list))
                final_data.append(data_dict)
            return final_data
        except Exception as e:
            print(e)


    def __del__(self):
        self.__cur.close()
        self.__conn.close()


t = Ticket("Janakpur", "Kathmandu", "2025-03-10", "Economy")
print(t.ticket_details(13))
