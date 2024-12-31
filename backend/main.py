from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import PostgresDsn
from pydantic_core import MultiHostUrl
from sqlmodel import Field, Session, SQLModel, create_engine, select
from dotenv import load_dotenv
import os
load_dotenv()
import requests

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins = ["*"],
  allow_methods = ["*"],
  allow_headers = ["*"]
)
TMDB_API_KEY = os.getenv("TMDB_API_KEY")
SEARCH_URL = os.getenv("SEARCH_URL")


# class Hero(SQLModel, table=True):
#     id: int | None = Field(default=None, primary_key=True)
#     name: str = Field(index=True)
#     age: int | None = Field(default=None, index=True)
#     secret_name: str



# def SQLALCHEMY_DATABASE_URI() -> PostgresDsn:
#     POSTGRES_USER: str = "jamesroot"
#     POSTGRES_PASSWORD: str = '123456'
#     POSTGRES_SERVER: str = "localhost"
#     POSTGRES_PORT: int = 5432
#     POSTGRES_DB: str = "jamesroot"
#     return MultiHostUrl.build(
#         scheme="postgresql",
#         username=POSTGRES_USER,
#         password=POSTGRES_PASSWORD,
#         host=POSTGRES_SERVER,
#         port=POSTGRES_PORT,
#         path=POSTGRES_DB,
#     )

# engine = create_engine(str(SQLALCHEMY_DATABASE_URI()))


# def create_db_and_tables():
#     SQLModel.metadata.create_all(engine)


# def get_session():
#     with Session(engine) as session:
#         yield session

# SessionDep = Annotated[Session, Depends(get_session)]

# @app.on_event("startup")
# def on_startup():
#     create_db_and_tables()


# @app.post("/heroes/")
# def create_hero(hero: Hero, session: SessionDep) -> Hero:
#     session.add(hero)
#     session.commit()
#     session.refresh(hero)
#     return hero


# @app.get("/heroes/")
# def read_heroes(
#     session: SessionDep,
#     offset: int = 0,
#     limit: Annotated[int, Query(le=100)] = 100,
# ) -> list[Hero]:
#     heroes = session.exec(select(Hero).offset(offset).limit(limit)).all()
#     return heroes


# @app.get("/heroes/{hero_id}")
# def read_hero(hero_id: int, session: SessionDep) -> Hero:
#     hero = session.get(Hero, hero_id)
#     if not hero:
#         raise HTTPException(status_code=404, detail="Hero not found")
#     return hero


# @app.delete("/heroes/{hero_id}")
# def delete_hero(hero_id: int, session: SessionDep):
#     hero = session.get(Hero, hero_id)
#     if not hero:
#         raise HTTPException(status_code=404, detail="Hero not found")
#     session.delete(hero)
#     session.commit()
#     return {"ok": True}

def search_movie(name: str, page: int = 1):
    if not TMDB_API_KEY:
        raise HTTPException(status_code=500, detail="API key not found")
    response = requests.get(f"{SEARCH_URL}?query={name}&api_key={TMDB_API_KEY}&page={page}")
    return response.json()

@app.get('/movies/{page}')
def get_movies(name: str, page: int | None = 1):
    return search_movie(name, page)

