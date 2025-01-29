import os
import psycopg2
from dotenv import load_dotenv


class Card:
    def __init__(self):
        load_dotenv()
        self.__conn = psycopg2.connect(os.getenv("DATABASE_URL"))
        self.__cur = self.__conn.cursor()

    def insert_card_details(self, card_details) -> dict[str, str]:
        try:
            sql: str = '''
                INSERT INTO id_card (user_id, type, number, issuing_district, front_image, back_image)
                VALUES (%s, %s, %s, %s, %s, %s)
            '''
            self.__cur.execute(sql, card_details)
            self.__conn.commit()
            return {"status": True, "message": "success"}
        except Exception as e:
            self.__conn.rollback()  # Rollback if any error occurs
            return {"status": False, "message": str(e)}
        finally:
            self.__cur.close()
            self.__conn.close()

# detail_list = [
#     2, "Citizenship", "120-359-657-458-68", "Siraha", "uploads/images/citizen_front", "uploads/images/citizen_back"
# ]
# c = Card()
# print(c.insert_card_details(detail_list))
