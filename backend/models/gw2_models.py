from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

Base = declarative_base()

# SQLAlchemy Models
class GW2Account(Base):
    __tablename__ = "gw2_accounts"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    api_key = Column(String(255), nullable=False, unique=True)
    account_name = Column(String(255), nullable=True)
    world_id = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    is_active = Column(Boolean, default=True)

class GW2Character(Base):
    __tablename__ = "gw2_characters"
    
    id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer, nullable=False, index=True)
    character_name = Column(String(255), nullable=False)
    level = Column(Integer, nullable=True)
    profession = Column(String(50), nullable=True)
    race = Column(String(50), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class GW2Achievement(Base):
    __tablename__ = "gw2_achievements"
    
    id = Column(Integer, primary_key=True, index=True)
    achievement_id = Column(Integer, nullable=False, unique=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    requirement = Column(Text, nullable=True)
    locked_text = Column(Text, nullable=True)
    type = Column(String(100), nullable=True)
    flags = Column(JSON, nullable=True)
    tiers = Column(JSON, nullable=True)
    prerequisites = Column(JSON, nullable=True)
    rewards = Column(JSON, nullable=True)
    bits = Column(JSON, nullable=True)
    point_cap = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

# Pydantic Models
class GW2AccountCreate(BaseModel):
    api_key: str
    account_name: Optional[str] = None

class GW2AccountResponse(BaseModel):
    id: int
    user_id: int
    account_name: Optional[str]
    world_id: Optional[int]
    created_at: datetime
    updated_at: Optional[datetime]
    is_active: bool
    
    class Config:
        from_attributes = True

class GW2CharacterResponse(BaseModel):
    id: int
    account_id: int
    character_name: str
    level: Optional[int]
    profession: Optional[str]
    race: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True

class GW2AchievementResponse(BaseModel):
    id: int
    achievement_id: int
    name: str
    description: Optional[str]
    requirement: Optional[str]
    locked_text: Optional[str]
    type: Optional[str]
    flags: Optional[List[str]]
    tiers: Optional[List[Dict[str, Any]]]
    prerequisites: Optional[List[int]]
    rewards: Optional[List[Dict[str, Any]]]
    bits: Optional[List[Dict[str, Any]]]
    point_cap: Optional[int]
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True

# API Response Models
class GW2APIAccount(BaseModel):
    id: str
    name: str
    world: int
    guilds: Optional[List[str]] = None
    guild_leader: Optional[List[str]] = None
    created: str
    access: Optional[List[str]] = None
    commander: Optional[bool] = None
    fractal_level: Optional[int] = None
    daily_ap: Optional[int] = None
    monthly_ap: Optional[int] = None
    wvw_rank: Optional[int] = None

class GW2APICharacter(BaseModel):
    name: str
    race: str
    gender: str
    flags: List[str]
    profession: str
    level: int
    guild: Optional[str] = None
    age: int
    created: str
    deaths: int
    craftings: Optional[List[Dict[str, Any]]] = None
    title: Optional[int] = None
    backstory: Optional[List[str]] = None
    wvw_abilities: Optional[List[Dict[str, Any]]] = None
    equipment: Optional[List[Dict[str, Any]]] = None
    recipes: Optional[List[int]] = None
    equipment_pvp: Optional[Dict[str, Any]] = None
    bags: Optional[List[Dict[str, Any]]] = None
    training: Optional[List[Dict[str, Any]]] = None
    pets: Optional[List[Dict[str, Any]]] = None
    gathering: Optional[List[str]] = None

class GW2APIAchievement(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    requirement: Optional[str] = None
    locked_text: Optional[str] = None
    type: Optional[str] = None
    flags: Optional[List[str]] = None
    tiers: Optional[List[Dict[str, Any]]] = None
    prerequisites: Optional[List[int]] = None
    rewards: Optional[List[Dict[str, Any]]] = None
    bits: Optional[List[Dict[str, Any]]] = None
    point_cap: Optional[int] = None

class GW2APIAchievementProgress(BaseModel):
    id: int
    current: Optional[int] = None
    max: Optional[int] = None
    done: Optional[bool] = None
    bits: Optional[List[Dict[str, Any]]] = None
    unlocked: Optional[bool] = None

class GW2APIItem(BaseModel):
    id: int
    name: str
    icon: Optional[str] = None
    description: Optional[str] = None
    type: Optional[str] = None
    rarity: Optional[str] = None
    level: Optional[int] = None
    vendor_value: Optional[int] = None
    default_skin: Optional[int] = None
    flags: Optional[List[str]] = None
    game_types: Optional[List[str]] = None
    restrictions: Optional[List[str]] = None
    chat_link: Optional[str] = None
    details: Optional[Dict[str, Any]] = None

class GW2APIWorld(BaseModel):
    id: int
    name: str
    population: str

class GW2APIBuild(BaseModel):
    id: int
