import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class UserBase(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=255)
    last_name: str = Field(..., min_length=1, max_length=255)
    has_seen_onboarding: bool = Field(default=False)


class UserResponseBase(UserBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime.datetime
    updated_at: datetime.datetime


class UserCreate(UserBase):
    pass


class UserResponse(UserResponseBase):
    pass
