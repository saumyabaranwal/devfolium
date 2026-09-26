from datetime import datetime
from typing import Any, Literal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator

from app.schemas.appearance import DEFAULT_THEME, Appearance, ThemeId, normalize_theme_id
from app.schemas.profile import Profile

PortfolioStatus = Literal["draft", "published"]

SLUG_PATTERN = r"^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"

# Slugs that would clash with app routes (e.g. /login, /dashboard) or look official.
RESERVED_SLUGS = frozenset(
    {
        "admin", "api", "app", "auth", "dashboard", "docs", "edit", "editor",
        "health", "help", "login", "logout", "me", "new", "p", "portfolio",
        "portfolios", "public", "register", "settings", "signup", "static",
        "support", "www",
    }
)

_APPEARANCE_KEYS = ("accent", "animations", "navigation", "section_order", "hidden_sections")


def validate_slug(value: str) -> str:
    slug = value.strip().lower()
    if slug in RESERVED_SLUGS:
        raise ValueError("That URL is reserved. Please choose another.")
    if "--" in slug:
        raise ValueError("Slugs cannot contain consecutive hyphens.")
    return slug


def lift_appearance_from_profile(data: Any) -> Any:
    """
    TEMPORARY bridge: the current frontend stores accent/animations/navigation
    inside `profile`. Move them into `appearance` if no appearance was sent.
    """
    if not isinstance(data, dict):
        return data
    profile = data.get("profile")
    if isinstance(profile, dict) and data.get("appearance") is None:
        lifted = {key: profile[key] for key in _APPEARANCE_KEYS if key in profile}
        if lifted:
            data = {**data, "appearance": lifted}
    return data


class PortfolioCreate(BaseModel):
    slug: str = Field(min_length=3, max_length=80, pattern=SLUG_PATTERN, examples=["saumya-baranwal"])
    title: str = Field(default="Untitled portfolio", max_length=120)
    theme_id: ThemeId = DEFAULT_THEME
    profile: Profile = Field(default_factory=Profile)
    appearance: Appearance = Field(default_factory=Appearance)

    @field_validator("theme_id", mode="before")
    @classmethod
    def _theme(cls, value: Any) -> Any:
        return normalize_theme_id(value)

    @field_validator("slug", mode="before")
    @classmethod
    def _lower_slug(cls, value: Any) -> Any:
        return value.strip().lower() if isinstance(value, str) else value

    @field_validator("slug")
    @classmethod
    def _slug(cls, value: str) -> str:
        return validate_slug(value)

    @model_validator(mode="before")
    @classmethod
    def _bridge(cls, data: Any) -> Any:
        return lift_appearance_from_profile(data)


class PortfolioUpdate(BaseModel):
    """PATCH body — every field optional; only sent fields are changed."""

    slug: str | None = Field(default=None, min_length=3, max_length=80, pattern=SLUG_PATTERN)
    title: str | None = Field(default=None, max_length=120)
    theme_id: ThemeId | None = None
    status: PortfolioStatus | None = None
    profile: Profile | None = None
    appearance: Appearance | None = None

    @field_validator("theme_id", mode="before")
    @classmethod
    def _theme(cls, value: Any) -> Any:
        return normalize_theme_id(value)

    @field_validator("slug", mode="before")
    @classmethod
    def _lower_slug(cls, value: Any) -> Any:
        return value.strip().lower() if isinstance(value, str) else value

    @field_validator("slug")
    @classmethod
    def _slug(cls, value: str | None) -> str | None:
        return validate_slug(value) if value is not None else None

    @model_validator(mode="before")
    @classmethod
    def _bridge(cls, data: Any) -> Any:
        return lift_appearance_from_profile(data)


class PortfolioResponse(BaseModel):
    id: UUID
    slug: str
    title: str
    theme_id: ThemeId
    status: PortfolioStatus
    profile: Profile
    appearance: Appearance
    created_at: datetime
    updated_at: datetime
    published_at: datetime | None

    model_config = ConfigDict(from_attributes=True)

    @field_validator("theme_id", mode="before")
    @classmethod
    def _theme(cls, value: Any) -> Any:
        return normalize_theme_id(value)

    @field_validator("appearance", mode="before")
    @classmethod
    def _appearance_default(cls, value: Any) -> Any:
        return value or {}
