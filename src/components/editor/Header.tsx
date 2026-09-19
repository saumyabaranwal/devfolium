import { CheckCircle2, Eye } from "lucide-react";

export function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="/">
        <span className="brand-mark">〽</span>
        <span>DevFolium</span>
      </a>

      <nav className="nav-links">
        <a href="#about">About us</a>
        <a href="#programs">Programs</a>
        <a href="#blog">Blog</a>
        <a href="#courses">Courses</a>
        <a href="#faq">FAQ</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="header-actions">
        <span className="saved-status">
          <CheckCircle2 size={18} />
          Autosaved
        </span>
        <button className="button button-secondary">
          <Eye size={17} />
          Preview
        </button>
        <button className="button button-primary">Publish portfolio</button>
      </div>
    </header>
  );
}