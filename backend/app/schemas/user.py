from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    firebase_uid: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    name: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    firebase_uid: str
    email: Optional[EmailStr]
    phone: Optional[str]
    name: Optional[str]
    created_at: datetime
