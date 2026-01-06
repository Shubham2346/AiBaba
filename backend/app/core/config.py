from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "AiBaba Backend"
    MONGO_URI: str
    MONGO_DB_NAME: str

    class Config:
        env_file = ".env"
        extra = "forbid"
settings = Settings()
