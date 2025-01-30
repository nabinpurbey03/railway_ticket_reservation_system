import os

import psycopg2
from dotenv import load_dotenv


class Address:
    def __init__(self):
        load_dotenv()
        self.__conn = psycopg2.connect(os.getenv("DATABASE_URL"))
        self.__cur = self.__conn.cursor()

    def insert_address(self, data):
        try:
            sql: str = '''
            INSERT INTO address (user_id, province, district, municipality, ward, tole, house_number)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            '''
            self.__cur.execute(sql, data)
            self.__conn.commit()
            return {"success": True, "message": "Address Saved"}
        except Exception as e:
            return {"success": False, "message": str(e)}
        finally:
            self.__cur.close()
            self.__conn.close()