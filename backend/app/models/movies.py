from sqlmodel import SQLModel, Field, Column, JSON
from typing import List
from datetime import date
import uuid

class Movie(SQLModel, table=False):
    id: int = Field(primary_key=True)
    adult: bool
    backdrop_path: str | None = None
    genre_ids: List[int] = Field(sa_column=Column(JSON))
    original_language: str | None
    original_title: str | None
    overview: str | None = None
    popularity: float | None
    poster_path: str | None = None
    release_date: date | None = None
    title: str | None
    video: bool | None
    vote_average: float | None
    vote_count: int | None

class MovieFavor(Movie, table=True):
    id: uuid.UUID | None = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: str = Field(index=True)
    rating: int = Field(default=5, ge=1, le=10)
    wanted: bool = Field(default=False)