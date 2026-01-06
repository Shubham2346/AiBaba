from fastapi import APIRouter, HTTPException
from bson import ObjectId

from app.schemas.kundli import KundliCreate, KundliResponse
from app.repositories.kundli_repository import KundliRepository
from app.services.kundli_engine.pyjhora_client import PyJHoraClient
from app.services.kundli_engine.birth_chart import derive_summary
from app.models.kundli import KundliModel
from app.utils.signature import birth_signature

router = APIRouter()
repo = KundliRepository()

@router.post("/kundli/generate", response_model=KundliResponse)
async def generate_kundli(payload: KundliCreate):
    repo = KundliRepository()
    sig = birth_signature(payload.model_dump())

    existing = await repo.find_by_signature(sig)
    if existing:
        return {
            "kundli_id": str(existing["_id"]),
            "derived": existing["derived"],
        }

    raw_chart = await PyJHoraClient.generate(
        payload.date,
        payload.time,
        payload.latitude,
        payload.longitude,
        payload.timezone,
    )

    derived = derive_summary(raw_chart)

    kundli = KundliModel(
        user_id=ObjectId(payload.user_id),
        signature=sig,
        birth_data=payload.model_dump(),
        raw_chart=raw_chart,
        derived=derived,
    )

    kundli_id = await repo.save(kundli)

    return {
        "kundli_id": kundli_id,
        "derived": derived,
    }


@router.get("/kundli/{kundli_id}")
async def get_kundli(kundli_id: str):
    repo = KundliRepository()
    data = await repo.get_summary(kundli_id)
    if not data:
        raise HTTPException(status_code=404, detail="Kundli not found")

    data["_id"] = str(data["_id"])
    return data
