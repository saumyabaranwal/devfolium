import { CheckCircle2, Eye } from "lucide-react";

export function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="/">
        <span className="brand-mark">〽</span>
        <span>DevFolium</span>
      </a>

      <nav className="nav-links">
        <a href="#about">Build your personalised portfolio.</a>
      </nav>

      <div className="header-actions">
        <span className="saved-status">
          <CheckCircle2 size={17} />
          Autosaved
        </span>

        <button className="button button-secondary">
          <Eye size={17} />
          <span>Preview</span>
        </button>

        <button className="button button-primary">Publish portfolio</button>
      </div>
    </header>
  );
}