from fastapi import FastAPI
from contextlib import asynccontextmanager

from app.db.mongodb import connect_to_mongo, close_mongo_connection
from app.db.init_indexes import init_indexes
from app.api.v1.router import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await connect_to_mongo()
    await init_indexes()
    yield
    # Shutdown
    await close_mongo_connection()


app = FastAPI(
    title="AiBaba Backend",
    lifespan=lifespan,
)

app.include_router(api_router, prefix="/api/v1")


@app.get("/")
def root():
    return {"status": "AiBaba Backend running"}
    