from functools import lru_cache
from typing import Set

from dotenv import find_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config: SettingsConfigDict = {
        "env_file": find_dotenv(),
        "env_file_encoding": "utf-8",
    }

    # App
    # ----------------------------------------
    cors_allowed_origins: Set[str] = ["http://localhost:5173"]

    # Auth
    # ----------------------------------------
    auth0_domain: str
    auth0_api_audience: str
    auth0_issuer: str
    auth0_algorithms: str

    # DB
    # ----------------------------------------
    sql_alchemy_database_url: str


@lru_cache()
def get_settings():
    return Settings()
