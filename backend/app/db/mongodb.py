from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")

client = AsyncIOMotorClient(MONGO_URL)
db = client["aibaba"]

user_collection = db["users"]
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

client: AsyncIOMotorClient | None = None

def get_db():
    return client[settings.MONGO_DB_NAME]

async def connect_to_mongo():
    global client
    client = AsyncIOMotorClient(
        settings.MONGO_URI,
        maxPoolSize=20,
        minPoolSize=5
    )

async def close_mongo_connection():
    if client:
        client.close()
