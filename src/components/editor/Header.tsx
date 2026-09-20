import { CheckCircle2, Eye, LoaderCircle } from "lucide-react";

type Props = {
  saveStatus: "idle" | "saving" | "saved" | "error";
  message: string;
  onPublish: () => void;
};

export function Header({ saveStatus, message, onPublish }: Props) {
  const isSaving = saveStatus === "saving";

  return (
    <header className="topbar">
      <a className="brand" href="/">
        <span className="brand-mark">〽</span>
        <span>DevFolium</span>
      </a>

      <p className="header-tagline">Build your personalised portfolio.</p>

      <div className="header-actions">
        <span className={`saved-status status-${saveStatus}`}>
          {isSaving ? (
            <LoaderCircle className="spin" size={17} />
          ) : (
            <CheckCircle2 size={17} />
          )}
          {message}
        </span>

        <button className="button button-secondary">
          <Eye size={17} />
          <span>Preview</span>
        </button>

        <button
          className="button button-primary"
          onClick={onPublish}
          disabled={isSaving}
        >
          {isSaving ? "Publishing…" : "Publish portfolio"}
        </button>
      </div>
    </header>
  );
}