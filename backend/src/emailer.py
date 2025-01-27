import smtplib
from dotenv import load_dotenv
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random as rnd

from src.user import User

otp_store = {'email': "", 'otp': 0}


def otp_verification(otp: int):
    if otp_store['otp'] == otp:
        return {"status": True, "message": "OTP verified"}
    else:
        return {"status": False, "message": "OTP verification failed"}


class Emailer:
    def __init__(self, recipient_email: str):
        self.recipient_email: str = recipient_email
        self.smtp_server = "smtp.gmail.com"
        self.smtp_port = 587

        # Load environment variables
        load_dotenv()
        self.sender_email = os.getenv("EMAIL_ADDRESS")
        self.sender_password = os.getenv("EMAIL_PASSWORD")

    def send_email(self):
        user = User()
        if user.check_for_email(self.recipient_email):
            return {"status": False, "message": "User already registered"}

        """Send an email with OTP verification."""
        if not self.sender_email or not self.sender_password:
            return {"status": False, "message": "Email credentials not found in environment variables"}

        otp = rnd.randint(100000, 999999)
        otp_store['otp'] = otp
        otp_store['email'] = str(self.recipient_email)
        html_body = html_email_body(otp)
        print(otp_store['otp'])
        print(otp_store['email'])

        # Create the email message
        message = MIMEMultipart("alternative")
        message["From"] = self.sender_email
        message["To"] = self.recipient_email
        message["Subject"] = "Railway Ticket Reservation OTP Verification"
        message.attach(MIMEText(html_body, "html"))

        # Send the email
        try:
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.sender_email, self.sender_password)
                server.sendmail(self.sender_email, str(self.recipient_email), message.as_string())
            return {"status": True, "message": "OTP has been sent to your email."}
        except smtplib.SMTPAuthenticationError:
            return {"status": False, "message": "Email Authentication Error"}
        except Exception as e:
            return {"status": False, "message": f"An error occurred: {e}"}


def html_email_body(otp: int) -> str:
    """
    Generates an HTML email template with the provided OTP.

    Args:
        otp (str): The one-time password to include in the email.

    Returns:
        str: The HTML content of the email.
    """
    return f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email with OTP</title>
        <style>
            body {{
                font-family: Arial, sans-serif;
                background-color: #f4f4f9;
                margin: 0;
                padding: 0;
            }}
            .email-container {{
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }}
            .header {{
                background-color: #0078d7;
                color: white;
                text-align: center;
                padding: 20px;
            }}
            .header h1 {{
                margin: 0;
                font-size: 24px;
            }}
            .content {{
                padding: 20px;
                color: #333333;
            }}
            .content p {{
                line-height: 1.6;
            }}
            .otp {{
                font-size: 24px;
                color: #0078d7;
                font-weight: bold;
                text-align: center;
                margin: 20px 0;
                letter-spacing: 10px;
            }}
            .footer {{
                background-color: #f4f4f9;
                text-align: center;
                padding: 10px;
                color: #888888;
                font-size: 14px;
            }}
            .footer a {{
                color: #0078d7;
                text-decoration: none;
            }}
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Railway Ticket Reservation System</h1>
            </div>
            <div class="content">
                <p>Dear <b>User</b>,</p>
                <p>We received a request to verify your email address for the Railway Ticket Reservation System. Please use the following OTP to complete the process:</p>
                <div class="otp">{otp}</div>
                <p>If you did not request this, please ignore this email or contact support if you have any concerns.</p>
                <p>Thank you for using the Railway Ticket Reservation System!</p>
            </div>
            <div class="footer">
                <p>&copy; 2025 Railway Ticket Reservation System. All rights reserved.</p>
                <p><a href="https://nabinpurbey03.github.io/nabinpurbey.com.np/">Contact Support</a> | <a href="https://github.com/nabinpurbey03/railway_ticket_reservation_system/blob/main/LICENSE">Privacy Policy</a></p>
            </div>
        </div>
    </body>
    </html>
    """
