from contextlib import asynccontextmanager
from typing import Annotated
import os
import uuid
import requests
from dotenv import load_dotenv
from pydantic import BaseModel, Field

from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware

# from sqlmodel import SQLModel
# from .models.user import Moviebuddies
# from .db.db import engine
# from .db.db import create_db_and_tables
# from .api.v1.endpoints import user

load_dotenv()

# @asynccontextmanager
# async def initialization(app: FastAPI):
#     create_db_and_tables()
#     yield
#     engine.dispose()

#app = FastAPI(lifespan=initialization)
app = FastAPI()
#app.include_router(user.router, prefix="/api/v1", tags=["user"])
app.add_middleware(
  CORSMiddleware,
  allow_origins = ["*"],
  allow_methods = ["*"],
  allow_headers = ["*"]
)

MOVIES_SEARCH_BASE_URL = 'https://api.themoviedb.org/3/search/movie'
MOVIE_SEARCH_BASE_URL = 'https://api.themoviedb.org/3/movie'

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

TMDB_API_KEY = os.getenv("TMDB_API_KEY")

class MovieFavor(BaseModel):
    user_id: str
    movie_id: str
    favor: bool = False

class User(BaseModel):
    uid: uuid.UUID
    username: str = Field(max_length=10)
    friend_list: list[str] = []
    movie_list: list[str] = []
    movie_favor_map: list[MovieFavor] = []

@app.post("/user/ori")
def repeatUser(user: User):
    return user

def search_movies(name: str, page: int | None = 1):
    if not TMDB_API_KEY:
        raise HTTPException(status_code=500, detail="API key not found")
    response = requests.get(f"{MOVIES_SEARCH_BASE_URL}?query={name}&api_key={TMDB_API_KEY}&page={page}")
    return response.json()

def search_movie_by_name(id: str):
    if not TMDB_API_KEY:
        raise HTTPException(status_code=500, detail="API key not found")
    response = requests.get(f"{MOVIE_SEARCH_BASE_URL}/{id}?api_key={TMDB_API_KEY}")
    return response.json()

@app.get('/movie/search')
def get_movies(name: str, page: int | None = 1):
    return search_movies(name, page)

@app.get('/movie/{id}')
def get_movies(id: str):
    return search_movie_by_name(id)


@app.get("/items/")
async def read_items(token: Annotated[str, Depends(oauth2_scheme)]):
    return {"token": token}


