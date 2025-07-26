from typing import Annotated
import uuid

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select, or_, and_

from app.models.user import Moviebuddies, MoviebuddiesCreate, MoviebuddiesPublic
from app.db.db import engine
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


@router.get("/moviebuddies/search/fuzzy")
def search_moviebuddies_fuzzy(
    session: SessionDep,
    #current_user: CurrentUserDep,
    query: str = Query(..., min_length=1, description="Search query for username or full name"),
    offset: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(10, ge=1, le=50, description="Maximum number of records to return"),
) -> list[MoviebuddiesPublic]:
    """
    Search for users by fuzzy matching their username or full name.
    
    This endpoint performs a case-insensitive search across usernames and full names.
    It uses SQL LIKE with wildcards for fuzzy matching.
    Returns only public user information for privacy and security.
    """
    # Create case-insensitive search pattern
    search_pattern = f"%{query.lower()}%"
    
    # Build query to search in username and full_name fields
    search_conditions = or_(
        Moviebuddies.username.ilike(search_pattern),
        and_(
            Moviebuddies.full_name.is_not(None),
            Moviebuddies.full_name.ilike(search_pattern)
        )
    )
    
    # Only return active users for privacy
    final_query = select(Moviebuddies).where(
        and_(
            search_conditions,
            Moviebuddies.is_active == True
        )
    ).offset(offset).limit(limit)
    
    results = session.exec(final_query).all()
    
    # Convert to public model
    public_results = []
    for user in results:
        public_user = MoviebuddiesPublic(
            **user.model_dump(exclude={"hashed_password", "is_admin", "is_active", "is_verified", "failed_login_attempts", "two_factor_enabled", "created_at", "updated_at", "last_login", "last_seen", "signup_source"}),  # Exclude sensitive fields
        )
        public_results.append(public_user)
    
    return public_results

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