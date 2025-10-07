from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # Database
    database_url: str
    postgres_user: str
    postgres_password: str
    postgres_db: str
    
    # JWT
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # CORS
    allowed_origins: str = "http://localhost:3000,http://localhost:5173,http://100.113.79.96:3000"
    
    # Environment
    environment: str = "development"
    
    # Guild Wars 2 API
    gw2_api_base_url: str = "https://api.guildwars2.com/v2"
    gw2_api_timeout: int = 30
    
    class Config:
        env_file = ".env"
        case_sensitive = False
    
    @property
    def allowed_origins_list(self) -> List[str]:
        """Converte a string de allowed_origins em uma lista"""
        return [origin.strip() for origin in self.allowed_origins.split(",")]

# Load settings from environment
settings = Settings()
