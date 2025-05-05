from fastapi.staticfiles import StaticFiles

from fastapi import FastAPI, Form, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from models import LoginRequest, Register, OTPVerificationRequest, AddUserRequest, AddressRequest, ChangePassword, \
    TicketSearch, BookTicket, PaymentDetails
from src.address import Address
from src.card import Card
from src.emailer import Emailer, otp_store, otp_verification
from src.payment import Payment
from src.personal_detail import PersonalDetail
from src.ticket import Ticket
from src.users import User
from datetime import datetime

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"]
)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


async def save_uploaded_file(uploaded_file, path: str, name: str) -> str | None:
    if uploaded_file:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")  # Format: YYYYMMDD_HHMMSS
        file_extension = uploaded_file.filename.split('.')[-1]
        file_name = f"{name}_{timestamp}.{file_extension}"
        file_path = f"uploads/images/{path}/{file_name}"

        with open(file_path, "wb") as buffer:
            buffer.write(await uploaded_file.read())

        return "/" + file_path
    return None


@app.get("/api")
async def read_root():
    return {"status": True, "message": "API Server hit SUCCESSFULLY!"}


@app.post("/api/login")
async def login(login_request: LoginRequest):
    user = User()
    return user.verify_user(login_request.email)


@app.post("/api/send-otp")
async def send_otp(register: Register):
    e = Emailer(register.email, register.fp)
    return e.send_email()


@app.post("/api/verify-otp")
async def verify_otp(request: OTPVerificationRequest):
    return otp_verification(int(request.otp))


@app.post("/api/add-user")
async def add_user(request: AddUserRequest):
    user = User()
    if not request.fp:
        return user.insert_user(otp_store['email'], request.password)
    else:
        return user.update_password(otp_store['email'], request.password)


@app.get("/api/user/{email}")
async def get_user(email: str):
    user = User()
    return user.get_user_details(email)


@app.get("/api/get-profile/{user_id}")
async def get_user_profile(user_id: str):
    p = PersonalDetail()
    return p.get_personal_detail(user_id)


# Endpoint to handle form submission
@app.post("/api/add-pd")
async def add_personal_details(
        user_id: str = Form(...),
        firstName: str = Form(...),
        middleName: str = Form(...),
        lastName: str = Form(...),
        dateOfBirth: str = Form(...),
        gender: str = Form(...),
        cardType: str = Form(...),
        cardNumber: str = Form(...),
        issuingDistrict: str = Form(...),
        profileImage: UploadFile = File(None),
        citizenshipFront: UploadFile = File(None),
        citizenshipBack: UploadFile = File(None),
        cardImage: UploadFile = File(None)
):
    full_name: str = f"{firstName}_{lastName}"
    profile_image_path = await save_uploaded_file(profileImage, "profile_image", full_name)
    citizenship_front_path = await save_uploaded_file(citizenshipFront, "citizenship_front", full_name)
    citizenship_back_path = await save_uploaded_file(citizenshipBack, "citizenship_back", full_name)
    card_image_path = await save_uploaded_file(cardImage, "card_image", full_name)

    p_detail = (int(user_id), firstName, middleName, lastName, gender, dateOfBirth, profile_image_path)
    card_detail = (
        int(user_id), cardType, cardNumber, issuingDistrict, citizenship_front_path or card_image_path,
        citizenship_back_path)
    p = PersonalDetail()
    c = Card()
    if p.insert_personal_detail(p_detail) and c.insert_card_details(card_detail):
        return {"status": True, "message": "The personal detail was added successfully!"}
    else:
        return {"status": False, "message": "FAILURE"}


@app.post("/api/add-address")
async def add_address(req: AddressRequest):
    data = (int(req.user_id), req.province, req.district, req.municipality, int(req.ward), req.tole, req.house_number)
    address = Address()
    if address.insert_address(data):
        return {"status": True, "message": "The address was added successfully!", "desc": "The user has been activated"}
    else:
        return {"status": False, "message": "FAILURE"}


@app.post("/api/change-password")
async def change_password(req: ChangePassword):
    user = User()
    return user.update_password(req.email, req.new_password)


@app.get("/api/get-address/{user_id}")
async def get_user_profile(user_id: str):
    addr = Address()
    return addr.get_address(int(user_id))


@app.post("/api/ticket-search")
async def ticket_search(req: TicketSearch):
    ticket = Ticket(req.source_station, req.destination_station, req.journey_date, req.class_type)
    return ticket.search_available_tickets()


@app.post("/api/book-ticket")
async def book_ticket(req: BookTicket):
    ticket = Ticket(req.source_station, req.destination_station, req.journey_date, req.class_type)
    return ticket.book_ticket(dict(req))


@app.get("/api/get-booked-ticket/{user_id}")
async def get_booked_ticket(user_id: str):
    ticket = Ticket("", "", "", "")
    return ticket.ticket_details(int(user_id))


@app.get("/api/cancel-ticket/{pnr_number}")
async def cancel_ticket(pnr_number: str):
    ticket = Ticket("", "", "", "")
    return ticket.cancel_ticket(pnr_number)


@app.get("/api/get-booked-seats/{pnr_number}")
async def get_booked_seats(pnr_number: str):
    ticket = Ticket("", "", "", "")
    return ticket.get_booked_seats(pnr_number)


@app.post("/api/make-payment-with-stripe")
async def payment_details(req: PaymentDetails):
    pay = Payment(req.total_amount, req.pnr_number)
    return pay.make_payment()

@app.get("/api/confirm-payment")
async def confirm_payment():
    return {"status": True, "message": "The payment was successful!"}



'''

FOR ADMINISTRATOR

'''
