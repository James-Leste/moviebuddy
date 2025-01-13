from sqlmodel import Field, SQLModel

class Moviebuddies(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str | None = None
    email: str
    password: str
