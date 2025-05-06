import os

import psycopg2
import stripe
from dotenv import load_dotenv

load_dotenv()


class Payment:

    def __init__(self, total_amount: float, pnr_number: str):
        self.__total_amount = total_amount
        self.__pnr_number = pnr_number
        self.__conn = psycopg2.connect(os.getenv("DATABASE_URL"))
        self.__cur = self.__conn.cursor()

    def make_payment(self):
        stripe.api_key = os.getenv("STRIPE_PAYMENT_SECRET_KEY")
        session = stripe.checkout.Session.create(
            success_url="http://localhost:5173/process-payment",
            line_items=[
                {
                    "price_data": {
                        "currency": "NPR",
                        "unit_amount": int(self.__total_amount * 100),
                        "product_data": {
                            "name": "Product 1",
                        }
                    },
                    "quantity": 1,
                }
            ],
            mode="payment",
            cancel_url="http://localhost:5173/profile",
        )
        return {"status": True, "payment_id": session.id, "payment_url": session.url}

    def confirm_payment(self, user_id: int, transaction_id: str):
        insert_sql = '''
                     INSERT INTO payment (user_id, pnr_number, amount, payment_status, transaction_id)
                     VALUES (%s, %s, %s, %s, %s)
                     '''

        update_sql = '''
                     UPDATE ticket
                     SET ticket_status = 'Confirmed'
                     WHERE pnr_number = %s
                     '''

        try:
            # Execute both operations inside a single transaction block
            self.__cur.execute(insert_sql,
                               (user_id, self.__pnr_number, self.__total_amount, "completed", transaction_id))
            self.__cur.execute(update_sql, (self.__pnr_number,))
            self.__conn.commit()
            return {"status": True, "message": "Payment confirmed successfully."}

        except Exception as e:
            self.__conn.rollback()
            return {"status": False, "message": f"An error occurred: {str(e)}"}

    def __del__(self):
        self.__cur.close()
        self.__conn.close()


# pay = Payment(100, "250513-DORE-WNPL-173059")
# print(pay.confirm_payment(13, "txn_123456789"))
