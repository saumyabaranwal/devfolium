"""
Theme + appearance settings.

Content lives in `Profile`; *how it looks* lives here. All three themes read
the same Profile — only these settings and the theme's own CSS differ.
"""

from typing import Any, Literal, get_args

from pydantic import BaseModel, ConfigDict, Field, field_validator

ThemeId = Literal["midnight", "terminal", "pixel"]
THEME_IDS: tuple[str, ...] = get_args(ThemeId)
DEFAULT_THEME: ThemeId = "midnight"

# TEMPORARY: map the old frontend theme ids onto the three official themes.
# Remove once the frontend's ThemeId type is updated.
LEGACY_THEME_ALIASES: dict[str, ThemeId] = {
    "cream": "midnight",
    "dark": "midnight",
    "minimal": "terminal",
}


def normalize_theme_id(value: Any) -> Any:
    if isinstance(value, str):
        key = value.strip().lower()
        return LEGACY_THEME_ALIASES.get(key, key)
    return value


SectionId = Literal["about", "skills", "projects", "experience", "education", "contact"]
DEFAULT_SECTION_ORDER: list[SectionId] = list(get_args(SectionId))


class Appearance(BaseModel):
    model_config = ConfigDict(extra="ignore")

    accent: str = Field(default="#f4fa75", pattern=r"^#[0-9a-fA-F]{6}$")
    animations: bool = True
    navigation: bool = True
    section_order: list[SectionId] = Field(default_factory=lambda: list(DEFAULT_SECTION_ORDER))
    hidden_sections: list[SectionId] = Field(default_factory=list)

    @field_validator("section_order")
    @classmethod
    def complete_section_order(cls, value: list[SectionId]) -> list[SectionId]:
        """Remove duplicates and append any section the client forgot."""
        ordered: list[SectionId] = []
        for section in value:
            if section not in ordered:
                ordered.append(section)
        for section in DEFAULT_SECTION_ORDER:
            if section not in ordered:
                ordered.append(section)
        return ordered

    @field_validator("hidden_sections")
    @classmethod
    def unique_hidden(cls, value: list[SectionId]) -> list[SectionId]:
        return list(dict.fromkeys(value))
