import {
  BookOpen,
  BriefcaseBusiness,
  Camera,
  FileText,
  GraduationCap,
  House,
  Link,
  Mail,
  Menu,
  Pencil,
  Plus,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import type { Profile } from "../../types/portfolio";

type TextField = Exclude<keyof Profile, "skills">;

type Props = {
  profile: Profile;
  onChange: (profile: Profile) => void;
};

export function ProfileEditor({ profile, onChange }: Props) {
  const updateField = (field: TextField, value: string) => {
    onChange({ ...profile, [field]: value });
  };

  const removeSkill = (skill: string) => {
    onChange({
      ...profile,
      skills: profile.skills.filter((item) => item !== skill),
    });
  };

  return (
    <aside className="panel editor-panel">
      <div className="editor-intro">
        <h1>Build your portfolio</h1>
        <p>Add your details, then make it yours.</p>
      </div>

      <div className="step-area">
        <span>Step 1 of 4</span>
        <div className="progress-track">
          <div className="progress-value" />
        </div>
      </div>

      <div className="start-options">
        <button className="choice-card active-choice">
          <Pencil size={22} />
          <strong>Fill manually</strong>
        </button>

        <button className="choice-card upload-card">
          <FileText size={22} />
          <strong>Upload résumé</strong>
          <span>We’ll extract your details for review</span>
          <small>PDF only · up to 5 MB</small>
          <Upload className="upload-icon" size={14} />
        </button>
      </div>

      <div className="form-area">
        <section className="form-section">
          <div className="form-section-title">
            <UserRound size={15} />
            Personal details
          </div>

          <div className="profile-row">
            <div>
              <span className="field-label">Profile image</span>
              <div className="avatar-upload">
                <div className="avatar-placeholder">SB</div>
                <button aria-label="Upload profile image">
                  <Camera size={16} />
                </button>
              </div>
            </div>

            <label>
              Name
              <input
                value={profile.name}
                onChange={(event) => updateField("name", event.target.value)}
              />
            </label>
          </div>

          <label>
            Professional headline
            <input
              value={profile.headline}
              onChange={(event) => updateField("headline", event.target.value)}
            />
          </label>

          <label>
            Short bio
            <textarea
              value={profile.bio}
              onChange={(event) => updateField("bio", event.target.value)}
            />
          </label>

          <label>
            Location
            <input
              value={profile.location}
              onChange={(event) => updateField("location", event.target.value)}
            />
          </label>
        </section>

        <section className="form-section">
          <div className="form-section-title">
            <Link size={15} />
            Contact & links
          </div>

          <div className="field-grid">
            <label>
              Email
              <input
                value={profile.email}
                onChange={(event) => updateField("email", event.target.value)}
              />
            </label>

            <label>
              Phone
              <input
                value={profile.phone}
                onChange={(event) => updateField("phone", event.target.value)}
              />
            </label>
          </div>

          <label>
            GitHub URL
            <input
              value={profile.github}
              onChange={(event) => updateField("github", event.target.value)}
            />
          </label>

          <label>
            LinkedIn URL
            <input
              value={profile.linkedin}
              onChange={(event) => updateField("linkedin", event.target.value)}
            />
          </label>

          <label>
            Personal website
            <input
              value={profile.website}
              onChange={(event) => updateField("website", event.target.value)}
            />
          </label>
        </section>

        <section className="form-section">
          <div className="form-section-title">
            <Menu size={15} />
            Skills
          </div>

          <div className="skill-list">
            {profile.skills.map((skill) => (
              <button
                className="skill-pill"
                key={skill}
                onClick={() => removeSkill(skill)}
              >
                {skill}
                <X size={12} />
              </button>
            ))}
          </div>

          <button className="add-skill">
            <Plus size={15} />
            Add skill
          </button>
        </section>

        <section className="form-section">
          <div className="form-section-title">
            <BriefcaseBusiness size={15} />
            Featured project
          </div>

          <label>
            Project title
            <input
              value={profile.projectTitle}
              onChange={(event) =>
                updateField("projectTitle", event.target.value)
              }
            />
          </label>

          <label>
            Project description
            <textarea
              value={profile.projectDescription}
              onChange={(event) =>
                updateField("projectDescription", event.target.value)
              }
            />
          </label>

          <label>
            Technology stack
            <input
              value={profile.projectStack}
              onChange={(event) =>
                updateField("projectStack", event.target.value)
              }
            />
          </label>

          <button className="add-entry">
            <Plus size={15} />
            Add another project
          </button>
        </section>

        <section className="form-section">
          <div className="form-section-title">
            <BookOpen size={15} />
            Experience
          </div>

          <label>
            Role
            <input
              value={profile.role}
              onChange={(event) => updateField("role", event.target.value)}
            />
          </label>

          <label>
            Company / organisation
            <input
              value={profile.company}
              onChange={(event) => updateField("company", event.target.value)}
            />
          </label>

          <label>
            Duration
            <input
              value={profile.duration}
              onChange={(event) =>
                updateField("duration", event.target.value)
              }
            />
          </label>
        </section>

        <section className="form-section">
          <div className="form-section-title">
            <GraduationCap size={15} />
            Education
          </div>

          <label>
            College / university
            <input
              value={profile.college}
              onChange={(event) => updateField("college", event.target.value)}
            />
          </label>

          <div className="field-grid">
            <label>
              Degree
              <input
                value={profile.degree}
                onChange={(event) =>
                  updateField("degree", event.target.value)
                }
              />
            </label>

            <label>
              Graduation year
              <input
                value={profile.graduationYear}
                onChange={(event) =>
                  updateField("graduationYear", event.target.value)
                }
              />
            </label>
          </div>
        </section>
      </div>

      <nav className="section-nav" aria-label="Portfolio sections">
        <a className="active-section" href="#about">
          <House size={15} />
          About
        </a>
        <a href="#skills">
          <Menu size={15} />
          Skills
        </a>
        <a href="#projects">
          <BriefcaseBusiness size={15} />
          Projects
        </a>
        <a href="#experience">
          <BookOpen size={15} />
          Experience
        </a>
        <a href="#education">
          <GraduationCap size={15} />
          Education
        </a>
        <a href="#contact">
          <Mail size={15} />
          Contact
        </a>
      </nav>
    </aside>
  );
}