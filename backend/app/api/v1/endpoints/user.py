from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query


from app.models.user import Moviebuddies
from app.db.db import engine
from sqlmodel import Session, select

router = APIRouter()

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]


@router.post("/Moviebuddies/")
def create_Moviebuddies(Moviebuddies: Moviebuddies, session: SessionDep) -> Moviebuddies:
    session.add(Moviebuddies)
    session.commit()
    session.refresh(Moviebuddies)
    return Moviebuddies


@router.get("/Moviebuddies/")
def read_Moviebuddieses(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[Moviebuddies]:
    Moviebuddieses = session.exec(select(Moviebuddies).offset(offset).limit(limit)).all()
    return Moviebuddieses


@router.get("/Moviebuddies/{Moviebuddies_id}")
def read_Moviebuddies(Moviebuddies_id: int, session: SessionDep) -> Moviebuddies:
    Moviebuddies = session.get(Moviebuddies, Moviebuddies_id)
    if not Moviebuddies:
        raise HTTPException(status_code=404, detail="Moviebuddies not found")
    return Moviebuddies


@router.delete("/Moviebuddies/{Moviebuddies_id}")
def delete_Moviebuddies(Moviebuddies_id: int, session: SessionDep):
    Moviebuddies = session.get(Moviebuddies, Moviebuddies_id)
    if not Moviebuddies:
        raise HTTPException(status_code=404, detail="Moviebuddies not found")
    session.delete(Moviebuddies)
    session.commit()
    return {"ok": True}