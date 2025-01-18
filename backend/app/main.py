from contextlib import asynccontextmanager
from typing import Annotated
import os
import requests
from dotenv import load_dotenv

from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware

from sqlmodel import SQLModel
from .models.user import Moviebuddies
from .db.db import engine
from .db.db import create_db_and_tables
from .api.v1.endpoints import user

load_dotenv()

@asynccontextmanager
async def initialization(app: FastAPI):
    create_db_and_tables()
    yield
    engine.dispose()

app = FastAPI(lifespan=initialization)
app.include_router(user.router, prefix="/api/v1", tags=["user"])
app.add_middleware(
  CORSMiddleware,
  allow_origins = ["*"],
  allow_methods = ["*"],
  allow_headers = ["*"]
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
SEARCH_URL = os.getenv("SEARCH_URL")

def search_movie(name: str, page: int = 1):
    if not TMDB_API_KEY:
        raise HTTPException(status_code=500, detail="API key not found")
    response = requests.get(f"{SEARCH_URL}?query={name}&api_key={TMDB_API_KEY}&page={page}")
    return response.json()

@app.get('/movies')
def get_movies(name: str, page: int | None = 1):
    return search_movie(name, page)


@app.get("/items/")
async def read_items(token: Annotated[str, Depends(oauth2_scheme)]):
    return {"token": token}


