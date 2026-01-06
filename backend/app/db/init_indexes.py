from app.db.mongodb import get_db

async def init_indexes():
    db = get_db()

    # Users
    await db.users.create_index(
        "firebase_uid",
        unique=True,
        name="idx_users_firebase_uid",
    )

    # Kundlis: deduplication by signature
    await db.kundlis.create_index(
        "signature",
        unique=True,
        partialFilterExpression={"signature": {"$exists": True}},
        name="idx_kundlis_signature",
    )

    await db.kundlis.create_index(
        "user_id",
        name="idx_kundlis_user_id",
    )
