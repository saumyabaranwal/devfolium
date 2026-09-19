import { Mail, Monitor, Smartphone } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import type { Profile, ThemeId } from "../../types/portfolio";

type Props = {
  profile: Profile;
  theme: ThemeId;
  mobilePreview: boolean;
  onTogglePreview: () => void;
};

export function LivePreview({
  profile,
  theme,
  mobilePreview,
  onTogglePreview,
}: Props) {
  return (
    <main className="panel preview-panel">
      <div className="panel-heading">
        <h2>Live preview</h2>
        <button className="device-toggle" onClick={onTogglePreview}>
          {mobilePreview ? <Smartphone size={18} /> : <Monitor size={19} />}
        </button>
      </div>

      <div className={`browser-frame ${mobilePreview ? "mobile-frame" : ""}`}>
        <div className="browser-bar">
          <span />
          <span />
          <span />
        </div>

        <section className={`portfolio-preview theme-${theme}`}>
          <nav className="preview-nav">
            <strong className="preview-logo">〽</strong>
            <div>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#experience">Experience</a>
              <a href="#contact">Contact</a>
            </div>
            <button>Résumé ↓</button>
          </nav>

          <div className="hero-preview">
            <div>
              <h1>{profile.name || "Your name"}</h1>
              <h2>{profile.headline || "Your professional headline"}</h2>
              <p>{profile.bio || "Tell visitors about yourself."}</p>

              <div className="social-icons">
                <FaGithub size={19} />
                <FaLinkedinIn size={19} />
                <Mail size={19} />
              </div>
            </div>

            <div className="preview-avatar">
              <span>SB</span>
            </div>
          </div>

          <div className="stats">
            <div><strong>3+</strong><span>Years building</span></div>
            <div><strong>10+</strong><span>Projects shipped</span></div>
            <div><strong>5+</strong><span>Technologies</span></div>
          </div>

          <section className="projects-preview">
            <div className="section-title">
              <h3>Featured projects</h3>
              <span />
            </div>

            <div className="project-grid">
              <article>
                <div className="project-image dark-image" />
                <div>
                  <h4>TaskFlow</h4>
                  <p>A productivity app with clean UI and real-time collaboration.</p>
                  <div className="project-tags">
                    <span>React</span><span>TypeScript</span>
                  </div>
                </div>
              </article>

              <article>
                <div className="project-image blue-image" />
                <div>
                  <h4>Mindful</h4>
                  <p>A wellness platform for journaling and habits.</p>
                  <div className="project-tags">
                    <span>Next.js</span><span>Tailwind</span>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}