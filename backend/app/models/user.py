from sqlmodel import Field, SQLModel, JSON, Column
from typing import List
import uuid

class Moviebuddies(SQLModel, table=True):
    id: uuid.UUID | None = Field(default_factory=uuid.uuid4, primary_key=True)
    username: str = Field(index=True, unique=True)
    email: str 
    buddies_list: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    is_admin: bool | None = Field(default=False)
    hashed_password: str

class MoviebuddiesCreate(SQLModel, table=False):
    username: str = Field(index=True, unique=True)
    email: str
    buddies_list: List[str] = Field(default_factory=list, sa_column=Column(JSON))
    plain_password: str
    is_admin: bool | None = False

    
