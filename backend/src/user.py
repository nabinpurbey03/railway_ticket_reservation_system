import psycopg2
from dotenv import load_dotenv
import os


class User:

    def __init__(self):
        load_dotenv()
        self.__conn = psycopg2.connect(os.getenv("DATABASE_URL"))
        self.__cur = self.__conn.cursor()

    def verify_user(self, email: str, password: str) -> dict[str, str]:
        if not self.__check_for_email(email):
            return {"status": False, "message": "Invalid email"}

        self.__cur.execute('SELECT "email", "password" FROM "user" WHERE "email" = %s', (email,))
        result = self.__cur.fetchone()
        if result[1] == password:
            return {"status": True, "message": "User Authenticated"}
        else:
            return {"status": False, "message": "Wrong Password! User Not Authenticated"}

    def __check_for_email(self, email: str) -> bool:
        self.__cur.execute('SELECT COUNT(*) FROM "user" WHERE "email" = %s', (email,))
        result = self.__cur.fetchone()
        if result[0] > 0:
            return True
        else:
            return False


# u = User()
# print(u.verify_user("jane.smith@example.com", "hashed_password2"))
