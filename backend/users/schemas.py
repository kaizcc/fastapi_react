from pydantic import BaseModel, EmailStr, conint
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: EmailStr
    nickname: str
    avatar: Optional[str] = None

class UserCreate(UserBase):
    password: str
    role: Optional[int] = 0  # 0 for user, 1 for admin

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    nickname: Optional[str] = None
    password: Optional[str] = None
    role: Optional[int] = None
    avatar: Optional[str] = None

class UserLogin(BaseModel):
    username: str
    password: str

class User(UserBase):
    id: int
    role: int  # Ensure role is integer
    created_time: datetime
    updated_time: datetime
    others: dict

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    role: conint(ge=0, le=1)  # Constrain role to 0 or 1 