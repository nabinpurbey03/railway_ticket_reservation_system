import os

import psycopg2
from dotenv import load_dotenv

from src.user import User


class Address:
    def __init__(self):
        load_dotenv()
        self.__conn = psycopg2.connect(os.getenv("DATABASE_URL"))
        self.__cur = self.__conn.cursor()

    def insert_address(self, data)-> bool:
        try:
            sql: str = '''
            INSERT INTO address (user_id, province, district, municipality, ward, tole, house_number)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            '''
            self.__cur.execute(sql, data)
            self.__conn.commit()
            user = User()
            user.activate_user(data[0])
            return True
        except psycopg2.errors as e:
            self.__conn.rollback()
            return e
        finally:
            self.__cur.close()
            self.__conn.close()