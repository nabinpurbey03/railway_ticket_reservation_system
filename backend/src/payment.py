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
        print(os.getenv("STRIPE_PAYMENT_SECRET_KEY"))
        stripe.api_key = os.getenv("STRIPE_PAYMENT_SECRET_KEY")
        session = stripe.checkout.Session.create(
            success_url="http://localhost:5173/profile",
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
