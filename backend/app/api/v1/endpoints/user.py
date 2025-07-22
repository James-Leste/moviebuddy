from typing import Annotated
import uuid

from fastapi import APIRouter, Depends, HTTPException, Query


from app.models.user import Moviebuddies, MoviebuddiesCreate
from app.db.db import engine
from sqlmodel import Session, select
from app.db.db import SessionDep
from .auth import get_password_hash, CurrentUserDep, CurrentAdminUserDep

router = APIRouter()

@router.post("/moviebuddies")
def create_moviebuddies(moviebuddies: MoviebuddiesCreate, session: SessionDep) -> Moviebuddies:
    hashed_password = get_password_hash(moviebuddies.plain_password)
    moviebuddies = Moviebuddies(
        **moviebuddies.model_dump(exclude={"plain_password"}),
        hashed_password=hashed_password
    )
    session.add(moviebuddies)
    session.commit()
    session.refresh(moviebuddies)
    return moviebuddies


@router.get("/moviebuddies")
def read_moviebuddieses(
    session: SessionDep,
    user: CurrentAdminUserDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[Moviebuddies]:
    moviebuddies_list = session.exec(select(Moviebuddies).offset(offset).limit(limit)).all()
    return moviebuddies_list


@router.get("/moviebuddies/{moviebuddies_id}")
def read_moviebuddies(moviebuddies_id: uuid.UUID, session: SessionDep) -> Moviebuddies:
    moviebuddies = session.get(Moviebuddies, moviebuddies_id)
    if not moviebuddies:
        raise HTTPException(status_code=404, detail="Moviebuddies not found")
    return moviebuddies

# Danger: This endpoint is for demonstration purposes only and should not be used in production.
@router.delete("/moviebuddies/{moviebuddies_id}")
def delete_moviebuddies(moviebuddies_id: uuid.UUID, session: SessionDep, current_user: CurrentUserDep):
    if current_user.id != moviebuddies_id:
        raise HTTPException(status_code=403, detail="You can only delete your own account")
    moviebuddies = session.get(Moviebuddies, moviebuddies_id)
    if not moviebuddies:
        raise HTTPException(status_code=404, detail="Moviebuddies not found")
    session.delete(moviebuddies)
    session.commit()
    return {"ok": True}