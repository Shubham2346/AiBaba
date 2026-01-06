from fastapi import APIRouter
from app.api.v1.routes import auth, kundli, health

api_router = APIRouter()

api_router.include_router(
    auth.router,
    prefix="/auth",
    tags=["Auth"],
)

api_router.include_router(
    kundli.router,
    tags=["Kundli"],
)

api_router.include_router(
    health.router,
    tags=["Health"],
)
