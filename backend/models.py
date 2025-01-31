from typing import Optional

from pydantic import BaseModel


class LoginRequest(BaseModel):
    email: str


class Register(BaseModel):
    email: str
    fp: bool

class OTPVerificationRequest(BaseModel):
    otp: str

class AddUserRequest(BaseModel):
    password: str
    fp: bool

class AddressRequest(BaseModel):
    user_id: str
    province: str
    district: str
    municipality: str
    ward: str
    tole: str
    house_number: str

