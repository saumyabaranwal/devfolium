"""
The portfolio content model.

This is the single source of truth for portfolio *content*. Every theme
(Midnight, Terminal, Pixel), the editor, résumé import and AI suggestions all
read and write this exact shape, stored in `portfolios.profile` (JSONB):

    {
      "basics":     {...},
      "skills":     ["Python", "React", ...],
      "projects":   [{...}, ...],
      "experience": [{...}, ...],
      "education":  [{...}, ...],
      "links":      [{...}, ...]
    }

Appearance settings (accent colour, section order, ...) live separately in
`schemas/appearance.py`, so content and styling never get mixed up.
"""

import re
from typing import Any, Literal
from uuid import uuid4

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator, model_validator

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

MAX_SHORT = 120
MAX_DATE = 40
MAX_URL = 500
MAX_DESCRIPTION = 2000

_SCHEME_RE = re.compile(r"^([a-z][a-z0-9+.\-]*):(.*)$")
_PORT_RE = re.compile(r"^\d+(/|$)")


def new_id() -> str:
    return uuid4().hex


def normalize_url(value: Any) -> str:
    """
    Accept what people actually type ("github.com/me") and store a safe,
    absolute URL ("https://github.com/me").

    Only http/https are allowed — this blocks `javascript:` and `data:` URLs,
    which would otherwise be an XSS hole on public portfolio pages.
    Empty values are kept as "" so half-finished drafts still save.
    """
    if value is None:
        return ""
    url = str(value).strip()
    if not url:
        return ""

    lowered = url.lower()
    if lowered.startswith(("http://", "https://")):
        return url

    scheme = _SCHEME_RE.match(lowered)
    # "example.com:8080/x" is a host:port, not a scheme — allow it.
    if scheme and not _PORT_RE.match(scheme.group(2)):
        # e.g. "javascript:alert(1)", "data:...", "ftp://..." — reject.
        raise ValueError("Only http:// and https:// links are allowed.")
    return f"https://{url}"


def clean_string_list(values: Any, *, max_item_length: int) -> list[str]:
    """Strip, drop blanks, de-duplicate case-insensitively, keep order."""
    if values is None:
        return []
    if isinstance(values, str):
        values = values.split(",")

    seen: set[str] = set()
    cleaned: list[str] = []
    for raw in values:
        item = str(raw).strip()[:max_item_length]
        key = item.lower()
        if item and key not in seen:
            seen.add(key)
            cleaned.append(item)
    return cleaned


class ProfileModel(BaseModel):
    """Shared config: trim whitespace, silently drop unknown keys."""

    model_config = ConfigDict(str_strip_whitespace=True, extra="ignore")


# ---------------------------------------------------------------------------
# Sections
# ---------------------------------------------------------------------------


class Basics(ProfileModel):
    name: str = Field(default="", max_length=MAX_SHORT)
    headline: str = Field(default="", max_length=160, examples=["Full-stack developer"])
    bio: str = Field(default="", max_length=1500)
    location: str = Field(default="", max_length=MAX_SHORT)
    email: EmailStr | None = None
    phone: str = Field(default="", max_length=40)
    avatar_url: str = Field(default="", max_length=MAX_URL)

    @field_validator("email", mode="before")
    @classmethod
    def blank_email_is_none(cls, value: Any) -> Any:
        if isinstance(value, str) and not value.strip():
            return None
        return value

    @field_validator("avatar_url", mode="before")
    @classmethod
    def _url(cls, value: Any) -> str:
        return normalize_url(value)


class Project(ProfileModel):
    id: str = Field(default_factory=new_id, max_length=64)
    title: str = Field(default="", max_length=MAX_SHORT)
    description: str = Field(default="", max_length=MAX_DESCRIPTION)
    tech_stack: list[str] = Field(default_factory=list, max_length=20)
    highlights: list[str] = Field(default_factory=list, max_length=10)
    repo_url: str = Field(default="", max_length=MAX_URL)
    live_url: str = Field(default="", max_length=MAX_URL)
    featured: bool = False

    @field_validator("tech_stack", mode="before")
    @classmethod
    def _stack(cls, value: Any) -> list[str]:
        return clean_string_list(value, max_item_length=40)

    @field_validator("highlights", mode="before")
    @classmethod
    def _highlights(cls, value: Any) -> list[str]:
        return clean_string_list(value, max_item_length=300)

    @field_validator("repo_url", "live_url", mode="before")
    @classmethod
    def _url(cls, value: Any) -> str:
        return normalize_url(value)


class Experience(ProfileModel):
    id: str = Field(default_factory=new_id, max_length=64)
    role: str = Field(default="", max_length=MAX_SHORT)
    company: str = Field(default="", max_length=MAX_SHORT)
    location: str = Field(default="", max_length=MAX_SHORT)
    # Free text on purpose: résumés say "Jun 2023", "Summer 2024", "2022".
    start_date: str = Field(default="", max_length=MAX_DATE)
    end_date: str = Field(default="", max_length=MAX_DATE)
    current: bool = False
    description: str = Field(default="", max_length=MAX_DESCRIPTION)
    highlights: list[str] = Field(default_factory=list, max_length=10)

    @field_validator("highlights", mode="before")
    @classmethod
    def _highlights(cls, value: Any) -> list[str]:
        return clean_string_list(value, max_item_length=300)


class Education(ProfileModel):
    id: str = Field(default_factory=new_id, max_length=64)
    institution: str = Field(default="", max_length=MAX_SHORT)
    degree: str = Field(default="", max_length=MAX_SHORT)
    field_of_study: str = Field(default="", max_length=MAX_SHORT)
    start_date: str = Field(default="", max_length=MAX_DATE)
    end_date: str = Field(default="", max_length=MAX_DATE)
    grade: str = Field(default="", max_length=40)


LinkKind = Literal["github", "linkedin", "website", "twitter", "email", "other"]


class Link(ProfileModel):
    id: str = Field(default_factory=new_id, max_length=64)
    kind: LinkKind = "other"
    label: str = Field(default="", max_length=60)
    url: str = Field(default="", max_length=MAX_URL)

    @field_validator("url", mode="before")
    @classmethod
    def _url(cls, value: Any) -> str:
        return normalize_url(value)


# ---------------------------------------------------------------------------
# The full profile
# ---------------------------------------------------------------------------


class Profile(ProfileModel):
    basics: Basics = Field(default_factory=Basics)
    skills: list[str] = Field(default_factory=list, max_length=60)
    projects: list[Project] = Field(default_factory=list, max_length=20)
    experience: list[Experience] = Field(default_factory=list, max_length=20)
    education: list[Education] = Field(default_factory=list, max_length=10)
    links: list[Link] = Field(default_factory=list, max_length=15)

    @field_validator("skills", mode="before")
    @classmethod
    def _skills(cls, value: Any) -> list[str]:
        return clean_string_list(value, max_item_length=40)

    @model_validator(mode="before")
    @classmethod
    def upgrade_legacy_flat_profile(cls, data: Any) -> Any:
        """
        TEMPORARY bridge: the current React editor sends a flat object like
        {name, headline, projectTitle, company, college, ...}. Convert it to
        the structured shape so old rows and the old frontend keep working.
        Remove this once the frontend sends the new shape.
        """
        if not isinstance(data, dict) or "basics" in data:
            return data
        if not any(key in data for key in ("name", "headline", "projectTitle", "company", "college")):
            return data
        return legacy_to_profile_dict(data)


def legacy_to_profile_dict(old: dict[str, Any]) -> dict[str, Any]:
    def get(key: str) -> str:
        value = old.get(key)
        return str(value).strip() if value is not None else ""

    projects = []
    if get("projectTitle") or get("projectDescription"):
        projects.append(
            {
                "title": get("projectTitle"),
                "description": get("projectDescription"),
                "tech_stack": get("projectStack"),
            }
        )

    experience = []
    if get("role") or get("company"):
        start, _, end = get("duration").partition("-")
        experience.append(
            {
                "role": get("role"),
                "company": get("company"),
                "start_date": start.strip(),
                "end_date": end.strip(),
            }
        )

    education = []
    if get("college") or get("degree"):
        education.append(
            {
                "institution": get("college"),
                "degree": get("degree"),
                "end_date": get("graduationYear"),
            }
        )

    links = []
    for kind in ("github", "linkedin", "website"):
        if get(kind):
            links.append({"kind": kind, "label": kind.capitalize(), "url": get(kind)})

    return {
        "basics": {
            "name": get("name"),
            "headline": get("headline"),
            "bio": get("bio"),
            "location": get("location"),
            "email": get("email"),
            "phone": get("phone"),
        },
        "skills": old.get("skills") or [],
        "projects": projects,
        "experience": experience,
        "education": education,
        "links": links,
    }
