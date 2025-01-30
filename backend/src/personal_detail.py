import psycopg2
from dotenv import load_dotenv
import os

class PersonalDetail:
    def __init__(self):
        load_dotenv()
        self.__conn = psycopg2.connect(os.getenv("DATABASE_URL"))
        self.__cur = self.__conn.cursor()

    def insert_personal_detail(self, personal_detail) -> bool:
        try:
            sql: str = '''
            INSERT INTO personal_detail (user_id, first_name, middle_name, last_name, gender, dob, image_url)
            VALUES (%s, %s, %s,%s, %s, %s,%s)
            '''
            self.__cur.execute(sql, personal_detail)
            self.__conn.commit()
            return True
        except psycopg2.errors as e:
            self.__conn.rollback()
            return e
        finally:
            self.__cur.close()
            self.__conn.close()

    def get_personal_detail(self, user_id: str):
        try:
            # Use parameterized query to prevent SQL injection
            sql: str = """
                        SELECT first_name, last_name, image_url 
                        FROM personal_detail 
                        WHERE user_id = %s;
                    """
            with self.__conn.cursor() as cur:
                cur.execute(sql, (int(user_id),))
                result = cur.fetchone()
                if result:
                    return {
                        "status": True,
                        "first_name": result[0],
                        "last_name": result[1],
                        "image_url": result[2],
                    }
                else:
                    return {"status": False, "message": "No data found for the given user_id."}

        except psycopg2.Error as e:
            # Log the error for debugging (you can use a logging library like `logging`)
            self.__conn.rollback()
            return {"status": False, "message": f"Database error: {e}"}

        finally:
            # Close the connection if it's no longer needed
            if self.__conn:
                self.__conn.close()





# detail = (1, "Nabin", None, "Purbey", "M", "2020/02/20", "uploads/images/profile_back")
# p = PersonalDetail()
# print(p.get_personal_detail("2"))
