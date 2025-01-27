from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import LoginRequest, Register, OTPVerificationRequest, AddUserRequest
from src.emailer import Emailer, otp_store, otp_verification
from src.user import User

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/api")
async def read_root():
    return {"status": True, "message": "API Server hit SUCCESSFULLY!"}


@app.post("/api/login")
async def login(login_request: LoginRequest):
    user = User()
    return user.verify_user(login_request.email)


@app.post("/api/send-otp")
async def send_otp(register: Register):
    e = Emailer(register.email)
    return e.send_email()

@app.post("/api/verify-otp")
async def verify_otp(request: OTPVerificationRequest):
    return otp_verification(int(request.otp))


@app.post("/api/add-user")
async def add_user(request: AddUserRequest):
    user = User()
    return user.insert_user(otp_store['email'], request.password)

@app.get("/api/user/{email}")
async def get_user(email: str):
    user = User()
    return user.get_user_details(email)

