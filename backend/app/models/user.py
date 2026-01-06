from datetime import datetime
from typing import Optional

class UserModel:
    """
    MongoDB User document.
    Firebase is the source of truth for authentication.
    """

    def __init__(
        self,
        firebase_uid: str,
        email: Optional[str] = None,
        phone: Optional[str] = None,
        name: Optional[str] = None,
    ):
        self.firebase_uid = firebase_uid
        self.email = email
        self.phone = phone
        self.name = name
        self.created_at = datetime.utcnow()
        self.is_active = True

    def to_dict(self) -> dict:
        return {
            "firebase_uid": self.firebase_uid,
            "email": self.email,
            "phone": self.phone,
            "name": self.name,
            "is_active": self.is_active,
            "created_at": self.created_at,
        }
