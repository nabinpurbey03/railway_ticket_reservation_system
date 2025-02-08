import os

import psycopg2
from dotenv import load_dotenv

from src.users import User


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

    def get_address(self, _id: int):
        try:
            sql: str = '''SELECT province, district, municipality, ward, tole, house_number 
            FROM address WHERE user_id = %s'''
            self.__cur.execute(sql, (_id,))
            result = self.__cur.fetchone()
            if result:
                keys = ["province", "district", "municipality", "ward", "tole", "house_number"]
                return {"status": True, "address": dict(zip(keys, result))}
            else:
                return {"status": False, "data": None}
        except psycopg2.Error as e:
            self.__conn.rollback()
            return {"status": False, "data": e}


    def __del__(self):
        self.__cur.close()
        self.__conn.close()



# addr = Address()
# print(addr.get_address(2))
