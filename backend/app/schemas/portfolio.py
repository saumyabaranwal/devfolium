from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class PortfolioCreate(BaseModel):
    slug: str = Field(
        min_length=3,
        max_length=80,
        pattern=r"^[a-z0-9-]+$",
        examples=["saumya-baranwal"],
    )
    title: str = Field(default="Untitled portfolio", max_length=120)
    theme_id: str = Field(default="cream", max_length=40)
    profile: dict[str, Any] = Field(default_factory=dict)


class PortfolioUpdate(BaseModel):
    title: str | None = Field(default=None, max_length=120)
    theme_id: str | None = Field(default=None, max_length=40)
    status: str | None = Field(default=None, pattern=r"^(draft|published)$")
    profile: dict[str, Any] | None = None


class PortfolioResponse(BaseModel):
    id: UUID
    slug: str
    title: str
    theme_id: str
    status: str
    profile: dict[str, Any]
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)