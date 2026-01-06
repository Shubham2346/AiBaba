from pydantic import BaseModel
from typing import Dict

class KundliCreate(BaseModel):
    user_id: str
    date: str
    time: str
    latitude: float
    longitude: float
    timezone: float

class KundliResponse(BaseModel):
    kundli_id: str
    derived: Dict
