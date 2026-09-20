export type ThemeId = "cream" | "dark" | "minimal" | "pixel";

export type Profile = {
  name: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  website: string;
  skills: string[];
  projectTitle: string;
  projectDescription: string;
  projectStack: string;
  role: string;
  company: string;
  duration: string;
  college: string;
  degree: string;
  graduationYear: string;
};

export type EditorTab = "edit" | "preview" | "customize";