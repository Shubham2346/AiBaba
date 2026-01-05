from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    uid: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None

class UserInDB(UserCreate):
    id: str
    created_at: datetime
