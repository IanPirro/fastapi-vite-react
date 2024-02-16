from sqlalchemy import TIMESTAMP, UUID, Boolean, String, func, text
from sqlalchemy.orm import Mapped, mapped_column

from .base import BaseModel


class UserModel(BaseModel):
    __tablename__ = "users"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("uuid_generate_v4()"),
    )
    external_id: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    first_name: Mapped[str] = mapped_column(String, nullable=False)
    last_name: Mapped[str] = mapped_column(String, nullable=False)
    has_seen_onboarding: Mapped[bool] = mapped_column(String, nullable=False)
    created_at: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP, server_default=func.now())
    updated_at: Mapped[TIMESTAMP] = mapped_column(
        TIMESTAMP, server_default=func.now(), onupdate=func.current_timestamp()
    )
