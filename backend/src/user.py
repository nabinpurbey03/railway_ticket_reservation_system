import psycopg2
from dotenv import load_dotenv
import os


class User:

    def __init__(self):
        load_dotenv()
        self.__conn = psycopg2.connect(os.getenv("DATABASE_URL"))
        self.__cur = self.__conn.cursor()

    def verify_user(self, email: str) -> dict[str, str]:
        try:
            self.__cur.execute('SELECT "password" FROM "user" WHERE "email" = %s', (email,))
            result = self.__cur.fetchone()
            return {"status": True, "password": result[0]}
        except psycopg2.Error as e:
            self.__conn.rollback()
            return {"status": False, "message": str(e)}
        finally:
            self.__cur.close()
            self.__conn.close()

    def check_for_email(self, email: str) -> bool:
        self.__cur.execute('SELECT COUNT(*) FROM "user" WHERE "email" = %s', (email,))
        result = self.__cur.fetchone()
        if result[0] > 0:
            return True
        else:
            return False

    def insert_user(self, email: str, password: str) -> dict[str, str]:
        if self.check_for_email(email):
            return {"status": False, "message": "Email already registered"}

        self.__cur.execute('INSERT INTO "user" ("email", "password") VALUES (%s, %s)', (email, password))
        self.__conn.commit()
        self.__cur.close()
        self.__conn.close()
        return {"status": True, "message": "User Added"}

    def get_user_details(self, email: str) -> dict:
        self.__cur.execute('SELECT "user_id", "role", "is_active" FROM "user" WHERE "email" = %s', (email,))
        result = self.__cur.fetchone()
        self.__cur.close()
        self.__conn.close()
        return {"status": True, "user_id": result[0], "role": result[1], "is_active": result[2]}

    def activate_user(self, user_id: int) -> bool:
        try:
            sql: str = 'UPDATE "user" SET "is_active" = TRUE WHERE "user_id" = %s'
            self.__cur.execute(sql, (user_id,))
            self.__conn.commit()
            return True
        except psycopg2.Error as e:
            self.__conn.rollback()
            return False
        finally:
            self.__cur.close()
            self.__conn.close()

    def update_password(self, email: str, password: str) -> dict[str, str]:
        try:
            sql: str = 'UPDATE "user" SET "password" = %s WHERE "email" = %s'
            self.__cur.execute(sql, (password, email))
            self.__conn.commit()
            return {"status": True, "message": "Password Updated"}
        except psycopg2.Error as e:
            self.__conn.rollback()
            return {"status": False, "message": str(e)}
        finally:
            self.__cur.close()
            self.__conn.close()


# u = User()
# print(u.verify_user("jane.smith@example.com"))
