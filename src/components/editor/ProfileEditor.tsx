import {
  BookOpen,
  BriefcaseBusiness,
  Camera,
  FileText,
  GraduationCap,
  Link,
  Menu,
  Pencil,
  Plus,
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
        <p>Fill in the fields below — your preview updates live on the right.</p>
      </div>

      <div className="step-area">
        <span>Step 1 of 4 · Profile details</span>
        <div className="progress-track">
          <div className="progress-value" />
        </div>
      </div>

      <div className="start-options">
        <button className="choice-pill active-choice" type="button">
          <Pencil size={15} />
          Fill manually
        </button>

        <button className="choice-pill" type="button">
          <FileText size={15} />
          Upload résumé
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
                placeholder="e.g. Sam Bennett"
                value={profile.name}
                onChange={(event) => updateField("name", event.target.value)}
              />
            </label>
          </div>

          <label>
            Professional headline
            <input
              placeholder="e.g. Frontend Developer & Designer"
              value={profile.headline}
              onChange={(event) => updateField("headline", event.target.value)}
            />
          </label>

          <label>
            Short bio
            <textarea
              placeholder="A couple of sentences about who you are and what you build."
              value={profile.bio}
              onChange={(event) => updateField("bio", event.target.value)}
            />
          </label>

          <label>
            Location
            <input
              placeholder="e.g. Bengaluru, India"
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
                placeholder="you@example.com"
                value={profile.email}
                onChange={(event) => updateField("email", event.target.value)}
              />
            </label>

            <label>
              Phone
              <input
                placeholder="+91 98765 43210"
                value={profile.phone}
                onChange={(event) => updateField("phone", event.target.value)}
              />
            </label>
          </div>

          <label>
            GitHub URL
            <input
              placeholder="github.com/yourname"
              value={profile.github}
              onChange={(event) => updateField("github", event.target.value)}
            />
          </label>

          <label>
            LinkedIn URL
            <input
              placeholder="linkedin.com/in/yourname"
              value={profile.linkedin}
              onChange={(event) => updateField("linkedin", event.target.value)}
            />
          </label>

          <label>
            Personal website
            <input
              placeholder="yourname.dev"
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
              placeholder="e.g. Portfolio Builder"
              value={profile.projectTitle}
              onChange={(event) =>
                updateField("projectTitle", event.target.value)
              }
            />
          </label>

          <label>
            Project description
            <textarea
              placeholder="What does it do, and what problem does it solve?"
              value={profile.projectDescription}
              onChange={(event) =>
                updateField("projectDescription", event.target.value)
              }
            />
          </label>

          <label>
            Technology stack
            <input
              placeholder="e.g. React, TypeScript, Node.js"
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
              placeholder="e.g. Software Engineer Intern"
              value={profile.role}
              onChange={(event) => updateField("role", event.target.value)}
            />
          </label>

          <label>
            Company / organisation
            <input
              placeholder="e.g. Acme Corp"
              value={profile.company}
              onChange={(event) => updateField("company", event.target.value)}
            />
          </label>

          <label>
            Duration
            <input
              placeholder="e.g. Jun 2024 – Aug 2024"
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
              placeholder="e.g. IIT Delhi"
              value={profile.college}
              onChange={(event) => updateField("college", event.target.value)}
            />
          </label>

          <div className="field-grid">
            <label>
              Degree
              <input
                placeholder="e.g. B.Tech Computer Science"
                value={profile.degree}
                onChange={(event) =>
                  updateField("degree", event.target.value)
                }
              />
            </label>

            <label>
              Graduation year
              <input
                placeholder="e.g. 2026"
                value={profile.graduationYear}
                onChange={(event) =>
                  updateField("graduationYear", event.target.value)
                }
              />
            </label>
          </div>
        </section>
      </div>
    </aside>
  );
}