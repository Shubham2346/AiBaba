from datetime import datetime
from app.db.mongodb import user_collection

async def get_or_create_user(uid: str, email: str | None, phone: str | None):
    user = await user_collection.find_one({"uid": uid})

    if user:
        return user

    new_user = {
        "uid": uid,
        "email": email,
        "phone": phone,
        "created_at": datetime.utcnow(),
    }

    await user_collection.insert_one(new_user)
    return new_user
