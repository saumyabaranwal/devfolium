export type ThemeId = "cream" | "dark" | "minimal" | "pixel";

export type Profile = {
  name: string;
  headline: string;
  bio: string;
  location: string;
  skills: string[];
};

export type EditorTab = "edit" | "preview" | "customize";