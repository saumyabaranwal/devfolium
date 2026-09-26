import uuid
from datetime import datetime
from typing import Any

from sqlalchemy import CheckConstraint, DateTime, String, Uuid, func, text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class Portfolio(Base):
    __tablename__ = "portfolios"
    __table_args__ = (
        CheckConstraint("status IN ('draft', 'published')", name="status_valid"),
    )

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)

    # NOTE: user_id (FK -> users.id) is added in Step 3 (authentication).

    slug: Mapped[str] = mapped_column(String(80), unique=True, index=True, nullable=False)
    title: Mapped[str] = mapped_column(String(120), default="Untitled portfolio", nullable=False)

    theme_id: Mapped[str] = mapped_column(
        String(40), default="midnight", server_default="midnight", nullable=False
    )
    status: Mapped[str] = mapped_column(
        String(20), default="draft", server_default="draft", nullable=False
    )

    # Content — validated by app.schemas.profile.Profile before saving.
    profile: Mapped[dict[str, Any]] = mapped_column(
        JSONB, default=dict, server_default=text("'{}'::jsonb"), nullable=False
    )
    # Look & feel — validated by app.schemas.appearance.Appearance.
    appearance: Mapped[dict[str, Any]] = mapped_column(
        JSONB, default=dict, server_default=text("'{}'::jsonb"), nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
    )
    published_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    def __repr__(self) -> str:
        return f"<Portfolio slug={self.slug!r} status={self.status!r}>"
