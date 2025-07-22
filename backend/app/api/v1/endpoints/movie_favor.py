from typing import Annotated
import uuid

from fastapi import APIRouter, Depends, HTTPException, Query
import sqlalchemy


from app.models.user import Moviebuddies, MoviebuddiesCreate
from app.db.db import engine
from sqlmodel import Session, select
from app.db.db import SessionDep
from app.models.movies import MovieFavor
from .auth import get_password_hash, CurrentUserDep, CurrentAdminUserDep


router = APIRouter()

@router.post("/movie/favor/{movie_id}", response_model=MovieFavor)
async def create_movie_favor(movie_id: int,
                             session: SessionDep,
                             current_user: CurrentUserDep,
                             rating: int = Query(5, ge=1, le=10), 
                             wanted: bool = Query(False)):
    try:
        movie_favor = MovieFavor(
            user_id=current_user.id,
            rating=rating,
            wanted=wanted,
            movie_id=movie_id
        )
        session.add(movie_favor)
        session.commit()
        session.refresh(movie_favor)
    except sqlalchemy.exc.IntegrityError:
        raise HTTPException(
            status_code=400,
            detail="You have already favorited this movie."
        )
    return movie_favor

@router.get("/movie/favor", response_model=list[MovieFavor] | MovieFavor)
async def get_movie_favors(
    session: SessionDep,
    current_user: CurrentUserDep,
    favor_id: uuid.UUID | None = None,
    user_id: uuid.UUID | None = None,
    movie_id: int | None = None,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100
) -> list[MovieFavor]:
    if favor_id:
        result = session.exec(
            select(MovieFavor).where(MovieFavor.id == favor_id)
        )
        favor = result.first()
        if not favor:
            raise HTTPException(status_code=404, detail="Favor not found")
        return favor

    query = select(MovieFavor)

    if user_id and movie_id:
        query = query.where(
            MovieFavor.user_id == user_id,
            MovieFavor.movie_id == movie_id
        )
        result = await session.exec(query)
        favor = result.first()
        if not favor:
            raise HTTPException(status_code=404, detail="Favor not found for user and movie")
        return favor

    if user_id:
        query = query.where(MovieFavor.user_id == user_id)
    if movie_id:
        query = query.where(MovieFavor.movie_id == movie_id)
    
    if not user_id and not movie_id and not favor_id:
        query = query.where(MovieFavor.user_id == current_user.id).offset(offset).limit(limit)

    result = session.exec(query)
    return result.all()

@router.delete("/movie/favor/{movie_favor_id}")
async def delete_movie_favor(
    movie_favor_id: int,
    session: SessionDep,
    current_user: CurrentUserDep
):
    movie_favor = session.get(MovieFavor, movie_favor_id)
    if not movie_favor:
        raise HTTPException(status_code=404, detail="Movie favor not found")
    if movie_favor.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="You can only delete your own movie favors")
    
    session.delete(movie_favor)
    session.commit()
    return {"ok": True}
