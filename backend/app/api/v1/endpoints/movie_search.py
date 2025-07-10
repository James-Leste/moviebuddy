from contextlib import asynccontextmanager
from typing import Annotated
import os

import requests
from dotenv import load_dotenv
from pydantic import BaseModel, Field

from fastapi import APIRouter, Depends, FastAPI, HTTPException, Query
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware

from app.db.db import SessionDep, engine
from app.db.db import create_db_and_tables
from app.api.v1.endpoints import user

load_dotenv()

MOVIES_SEARCH_BASE_URL = 'https://api.themoviedb.org/3/search/movie'
MOVIE_SEARCH_BASE_URL = 'https://api.themoviedb.org/3/movie'

TMDB_API_KEY = os.getenv("TMDB_API_KEY")

router = APIRouter()

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

@router.get('/movie/search')
def get_movies(name: str, page: int | None = 1):
    return search_movies(name, page)

@router.get('/movie/{id}')
def get_movies(id: str):
    return search_movie_by_name(id)