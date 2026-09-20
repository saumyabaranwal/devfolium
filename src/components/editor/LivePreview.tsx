import { Monitor, Smartphone } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
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

        <button
          className="device-toggle"
          onClick={onTogglePreview}
          aria-label="Toggle mobile preview"
        >
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

            <div className="preview-nav-links">
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#experience">Experience</a>
              <a href="#contact">Contact</a>
            </div>

            <button>Résumé ↓</button>
          </nav>

          <div className="hero-preview">
            <div className="preview-copy">
              <span className="hello-badge">Hello, I’m</span>
              <h1>{profile.name || "Your name"}</h1>
              <h2>{profile.headline || "Your professional headline"}</h2>
              <p>{profile.bio || "Tell visitors a little about yourself."}</p>

              <div className="social-icons">
                <FaGithub />
                <span>𝕏</span>
                <FaLinkedinIn />
                <FiMail />
              </div>
            </div>

            <div className="preview-avatar">
              <span>SB</span>
              <i className="orbit orbit-one" />
              <i className="orbit orbit-two" />
              <button>→</button>
            </div>
          </div>

          <div className="stats">
            <div>
              <strong>✦ 3+</strong>
              <span>Years of experience<br />in web development</span>
            </div>
            <div>
              <strong>10+</strong>
              <span>Projects built<br />and shipped</span>
            </div>
            <div>
              <strong>5+</strong>
              <span>Technologies<br />I work with</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}