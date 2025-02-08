from datetime import datetime
import os

import psycopg2
from dotenv import load_dotenv
from psycopg2 import DatabaseError


def get_pnr_number(date: str) -> str:
    book_date = "".join(date.split("-"))[2:]
    time = datetime.now().strftime("%H%M%S")
    return f"{book_date}-{get_train_name(date)}-{time}"


def get_train_name(date: str, sid: int, did: int) -> str:
    return "DORE-WNPL" if sid < did else "DORW-ENPL"


class Ticket:
    def __init__(self):
        load_dotenv()
        self.__conn = psycopg2.connect(os.getenv("DATABASE_URL"))
        self.__cur = self.__conn.cursor()
        self.__total_economy_tickets = 200
        self.__total_business_tickets = 40
        self.__total_first_class_tickets = 80
        self.__total_ladies_tickets = 80

    def __available_tickets(self, class_type: str, booking_date, total_tickets: int) -> DatabaseError:
        try:
            sql = '''
                    SELECT COUNT(*)
                    FROM ticket
                    WHERE class_type = %s
                    AND DATE(booking_date) = %s
                    AND (ticket_status = %s OR ticket_status = %s)
                '''
            self.__cur.execute(sql, (class_type, booking_date, 'Confirmed', 'Waiting'))
            booked_ticket = self.__cur.fetchone()[0]
            return total_tickets - booked_ticket
        except psycopg2.DatabaseError as error:
            return error

    def __available_economy_tickets(self, date: str) -> DatabaseError:
        return self.__available_tickets('Economy', date, self.__total_economy_tickets)

    def __available_business_tickets(self, date: str) -> DatabaseError:
        return self.__available_tickets('Business', date, self.__total_business_tickets)

    def __available_first_class_tickets(self, date: str) -> DatabaseError:
        return self.__available_tickets('First Class', date, self.__total_first_class_tickets)

    def __available_ladies_tickets(self, date: str) -> DatabaseError:
        return self.__available_tickets('Ladies', date, self.__total_ladies_tickets)

    def search_available_tickets(self, date: str, class_type: str) -> dict:
        match class_type:
            case 'Economy':
                return {"status": True, "tickets": self.__available_economy_tickets(date)}
            case 'Business':
                return {"status": True, "tickets": self.__available_business_tickets(date)}
            case 'First Class':
                return {"status": True, "tickets": self.__available_first_class_tickets(date)}
            case 'Ladies':
                return {"status": True, "tickets": self.__available_ladies_tickets(date)}
            case "All":
                return {"status": True,
                        "tickets": [{'Economy': self.__available_economy_tickets(date)},
                                    {'Business': self.__available_business_tickets(date)},
                                    {'First Class': self.__available_first_class_tickets(date)},
                                    {'Ladies': self.__available_ladies_tickets(date)}
                                    ]
                        }
    def __del__(self):
        self.__cur.close()
        self.__conn.close()

t= Ticket()
# print(t.available_economy_tickets("2025-02-08"))

# print(t.available_economy_tickets("2025-02-08"))

print(t.search_available_tickets("2025-02-08", "All"))


