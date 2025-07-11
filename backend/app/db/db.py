from sqlmodel import create_engine, SQLModel, Session
import os
from dotenv import load_dotenv
from typing import Annotated
from fastapi import Depends

load_dotenv()

database_url = os.getenv("DB_URL")
connect_args = {"check_same_thread": False}
engine = create_engine(url=database_url, connect_args=connect_args, echo=True)

def create_db_and_tables():
    print(f"database_url: {database_url}")
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

if __name__ == "__main__":
    create_db_and_tables()
