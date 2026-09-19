import {
  Camera,
  FileText,
  Menu,
  Pencil,
  Plus,
  Upload,
  X,
} from "lucide-react";
import type { Profile } from "../../types/portfolio";

type Props = {
  profile: Profile;
  onChange: (profile: Profile) => void;
};

export function ProfileEditor({ profile, onChange }: Props) {
  const updateField = (field: keyof Profile, value: string) => {
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
      <h1>Build your portfolio</h1>
      <p className="muted">Add your details, then make it yours.</p>

      <div className="step-area">
        <span>Step 1 of 4</span>
        <div className="progress-track">
          <div className="progress-value" />
        </div>
      </div>

      <div className="start-options">
        <button className="choice-card active-choice">
          <Pencil size={31} />
          <strong>Fill manually</strong>
        </button>

        <button className="choice-card">
          <FileText size={31} />
          <strong>Upload résumé</strong>
          <span>We’ll extract your details for review</span>
          <small>PDF only · up to 5 MB</small>
          <Upload className="upload-icon" size={15} />
        </button>
      </div>

      <div className="form-scroll">
        <div className="profile-row">
          <div className="avatar-upload">
            <div className="avatar-placeholder">SB</div>
            <button aria-label="Upload profile photo">
              <Camera size={17} />
            </button>
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

        <div className="skills-field">
          <span>Skills</span>
          <div className="skill-list">
            {profile.skills.map((skill) => (
              <button
                className="skill-pill"
                key={skill}
                onClick={() => removeSkill(skill)}
                title={`Remove ${skill}`}
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
        </div>
      </div>

      <nav className="section-nav">
        <a className="active-section" href="#about">
          <Menu size={16} />
          About
        </a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#education">Education</a>
        <a href="#contact">Contact</a>
      </nav>
    </aside>
  );
}