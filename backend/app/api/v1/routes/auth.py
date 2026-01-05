from fastapi import APIRouter, Depends
from app.utils.auth_guard import get_current_user
from app.services.user_service import get_or_create_user

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.get("/me")
async def get_me(user=Depends(get_current_user)):
    db_user = await get_or_create_user(
        uid=user["uid"],
        email=user.get("email"),
        phone=user.get("phone_number"),
    )

    return {
        "uid": db_user["uid"],
        "email": db_user.get("email"),
        "phone": db_user.get("phone"),
    }
