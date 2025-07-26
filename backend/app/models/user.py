from sqlmodel import Field, SQLModel, JSON, Column
from typing import List
import uuid
from datetime import datetime, date

class Moviebuddies(SQLModel, table=True):
    id: uuid.UUID | None = Field(default_factory=uuid.uuid4, primary_key=True)
    
    # Core auth
    username: str = Field(index=True, unique=True)
    email: str = Field(index=True, unique=True)
    hashed_password: str
    is_admin: bool = False
    
    # Profile
    full_name: str | None = None
    bio: str | None = None
    avatar_url: str | None = None
    date_of_birth: date | None = None
    location: str | None = None
    
    # Relationships
    buddies_list: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    favorite_genres: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    watchlist: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    
    # Preferences
    language: str = "en"
    theme: str = "light"
    notifications_enabled: bool = True
    
    # Security & verification
    is_active: bool = True
    is_verified: bool = False
    failed_login_attempts: int = 0
    two_factor_enabled: bool = False
    
    # Lifecycle
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    last_login: datetime | None = None
    
    # Analytics
    last_seen: datetime | None = None
    signup_source: str | None = None


class MoviebuddiesPublic(SQLModel, table=False):
    id: uuid.UUID | None = Field(default_factory=uuid.uuid4, primary_key=True)
    
    # Core auth
    username: str = Field(index=True, unique=True)
    email: str = Field(index=True, unique=True)
    is_admin: bool = False
    
    # Profile
    full_name: str | None = None
    bio: str | None = None
    avatar_url: str | None = None
    date_of_birth: date | None = None
    location: str | None = None
    
    # Relationships
    buddies_list: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    favorite_genres: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    watchlist: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    
    # Preferences
    language: str = "en"
    theme: str = "light"
    notifications_enabled: bool = True
    
    # Security & verification
    is_active: bool = True
    is_verified: bool = False
    failed_login_attempts: int = 0
    two_factor_enabled: bool = False
    
    # Lifecycle
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    last_login: datetime | None = None
    
    # Analytics
    last_seen: datetime | None = None
    signup_source: str | None = None

class MoviebuddiesCreate(SQLModel, table=False):
    username: str = Field(index=True, unique=True)
    email: str
    plain_password: str
    is_admin: bool | None = False

    full_name: str | None = None
    bio: str | None = None
    avatar_url: str | None = None
    date_of_birth: date | None = None
    location: str | None = None
    
    # Relationships
    buddies_list: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    favorite_genres: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    watchlist: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    
    # Preferences
    language: str = "en"
    theme: str = "light"
    notifications_enabled: bool = True
    
    # Security & verification
    is_active: bool = True
    is_verified: bool = False
    failed_login_attempts: int = 0
    two_factor_enabled: bool = False
    
    # Lifecycle
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    last_login: datetime | None = None
    
    # Analytics
    last_seen: datetime | None = None
    signup_source: str | None = None

    
