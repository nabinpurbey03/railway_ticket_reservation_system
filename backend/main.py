from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from src.user import User

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api")
async def read_root():
    return {"status": True, "message": "API Server hit SUCCESSFULLY!"}


class LoginRequest(BaseModel):
    email: str
    password: str


@app.post("/api/login")
async def login(login_request: LoginRequest):
    user = User()
    return user.verify_user(login_request.email, login_request.password)
