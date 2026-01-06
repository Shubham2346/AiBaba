from app.db.mongodb import get_db
from app.models.user import UserModel
from datetime import datetime

async def get_or_create_user(
    firebase_uid: str,
    email: str | None = None,
    phone: str | None = None,
    name: str | None = None,
):
    """
    Fetch user by Firebase UID.
    If not exists → create.
    If exists → update missing fields.
    """

    db = get_db()
    users = db["users"]

    update_data = {
        "email": email,
        "phone": phone,
        "name": name,
        "updated_at": datetime.utcnow(),
    }


    update_data = {k: v for k, v in update_data.items() if v is not None}

    result = await users.find_one_and_update(
        {"firebase_uid": firebase_uid},
        {
            "$setOnInsert": UserModel(
                firebase_uid=firebase_uid,
                email=email,
                phone=phone,
                name=name,
            ).to_dict(),
            "$set": update_data,
        },
        upsert=True,
        return_document=True,
    )

    return result
