import psycopg2
from dotenv import load_dotenv
import os

class PersonalDetail:
    def __init__(self):
        load_dotenv()
        self.__conn = psycopg2.connect(os.getenv("DATABASE_URL"))
        self.__cur = self.__conn.cursor()

    def insert_personal_detail(self, personal_detail) -> dict[str, str]:
        try:
            sql: str = '''
            INSERT INTO personal_detail (user_id, first_name, middle_name, last_name, gender, dob, image_url)
            VALUES (%s, %s, %s,%s, %s, %s,%s)
            '''
            self.__cur.execute(sql, personal_detail)
            self.__conn.commit()
            return {"status": True, "message": "success"}
        except Exception as e:
            self.__conn.rollback()
            return {"status": False, "message": str(e)}
        finally:
            self.__cur.close()
            self.__conn.close()


# detail = (1, "Nabin", None, "Purbey", "M", "2020/02/20", "uploads/images/profile_back")
# p = PersonalDetail()
# print(p.insert_personal_detail(detail))
