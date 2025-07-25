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

from sqlmodel import SQLModel
from .models.user import Moviebuddies, MoviebuddiesCreate
from .models.movies import Movie, MovieFavor
from .db.db import SessionDep, engine
from .db.db import create_db_and_tables
from .api.v1.endpoints import user, movie_search, auth, movie_favor

load_dotenv()

@asynccontextmanager
async def initialization(app: FastAPI):
    create_db_and_tables()
    yield
    engine.dispose()

app = FastAPI(lifespan=initialization)
app.include_router(user.router, prefix="/api/v1", tags=["user"])
app.include_router(movie_search.router, prefix="/api/v1", tags=["movie_search"])
app.include_router(auth.router, prefix="/api/v1", tags=["auth"])
app.include_router(movie_favor.router, prefix="/api/v1", tags=["movie_favor"])
app.add_middleware(
  CORSMiddleware,
  allow_origins = ["*"],
  allow_methods = ["*"],
  allow_headers = ["*"]
)

