from bson import ObjectId
from app.db.mongodb import get_db
from app.models.kundli import KundliModel

class KundliRepository:
    def __init__(self):
        self._collection = None

    @property
    def collection(self):
        if self._collection is None:
            self._collection = get_db()["kundlis"]
        return self._collection

    async def find_by_signature(self, signature: str):
        return await self.collection.find_one({"signature": signature})

    async def save(self, kundli: KundliModel):
        result = await self.collection.insert_one(kundli.to_dict())
        return str(result.inserted_id)

    async def get_summary(self, kundli_id: str):
        return await self.collection.find_one(
            {"_id": ObjectId(kundli_id)},
            {"derived": 1, "created_at": 1}
        )
