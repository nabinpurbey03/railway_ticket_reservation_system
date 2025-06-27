import os

import psycopg2
from dotenv import load_dotenv


class Admin:
    def __init__(self):
        load_dotenv()
        self.__conn = psycopg2.connect(os.getenv("DATABASE_URL"))
        self.__cur = self.__conn.cursor()

    def show_all_tickets(self):
        sql = '''
        SELECT * FROM ticket where journey_date between CURRENT_DATE AND CURRENT_DATE + 8;
        '''
        self.__cur.execute(sql)
        tickets = self.__cur.fetchall()
        print(tickets)



a = Admin()
a.show_all_tickets()