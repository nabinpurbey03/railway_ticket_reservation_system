from pydantic import BaseModel


class LoginRequest(BaseModel):
    email: str


class Register(BaseModel):
    email: str

class OTPVerificationRequest(BaseModel):
    otp: str

class AddUserRequest(BaseModel):
    password: str
