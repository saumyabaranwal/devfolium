import { useState } from "react";
import type { CSSProperties } from "react";

import "./index.css";

import { Header } from "./components/editor/Header";
import { ProfileEditor } from "./components/editor/ProfileEditor";
import { LivePreview } from "./components/editor/LivePreview";
import { CustomizePanel } from "./components/editor/CustomizePanel";
import { initialProfile } from "./data/portfolio";
import {
  createPortfolio,
  updatePortfolio,
} from "./lib/api";
import type { EditorTab, ThemeId } from "./types/portfolio";

type SaveStatus = "idle" | "saving" | "saved" | "error";

function createSlug(name: string) {
  const baseSlug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return baseSlug || "untitled-portfolio";
}

export default function App() {
  const [profile, setProfile] = useState(initialProfile);
  const [theme, setTheme] = useState<ThemeId>("cream");
  const [accent, setAccent] = useState("#f4fa75");
  const [animations, setAnimations] = useState(true);
  const [navigation, setNavigation] = useState(true);
  const [mobilePreview, setMobilePreview] = useState(false);
  const [activeTab, setActiveTab] = useState<EditorTab>("edit");

  const [portfolioId, setPortfolioId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveMessage, setSaveMessage] = useState("Ready to publish");

  const handlePublish = async () => {
    if (!profile.name.trim()) {
      setSaveStatus("error");
      setSaveMessage("Add your name first");
      setActiveTab("edit");
      return;
    }

    const portfolioPayload = {
      slug: createSlug(profile.name),
      title: `${profile.name}'s portfolio`,
      theme_id: theme,
      profile: {
        ...profile,
        accent,
        animations,
        navigation,
      },
    };

    try {
      setSaveStatus("saving");
      setSaveMessage("Saving portfolio…");

      if (portfolioId) {
        await updatePortfolio(portfolioId, {
          title: portfolioPayload.title,
          theme_id: portfolioPayload.theme_id,
          profile: portfolioPayload.profile,
          status: "published",
        });
      } else {
        const createdPortfolio = await createPortfolio(portfolioPayload);

        setPortfolioId(createdPortfolio.id);

        await updatePortfolio(createdPortfolio.id, {
          status: "published",
        });
      }

      setSaveStatus("saved");
      setSaveMessage("Portfolio published");
    } catch (error) {
      setSaveStatus("error");

      if (error instanceof Error) {
        setSaveMessage(error.message);
      } else {
        setSaveMessage("Could not publish portfolio");
      }
    }
  };

  return (
    <div
      className="app-shell"
      style={{ "--accent": accent } as CSSProperties}
    >
      <Header
        saveStatus={saveStatus}
        message={saveMessage}
        onPublish={handlePublish}
      />

      <div className="mobile-tabs" role="tablist" aria-label="Portfolio editor">
        {(["edit", "preview", "customize"] as EditorTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? "active-mobile-tab" : ""}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={`editor-layout show-${activeTab}`}>
        <ProfileEditor profile={profile} onChange={setProfile} />

        <LivePreview
          profile={profile}
          theme={theme}
          mobilePreview={mobilePreview}
          onTogglePreview={() => setMobilePreview(!mobilePreview)}
        />

        <CustomizePanel
          theme={theme}
          onThemeChange={setTheme}
          accent={accent}
          onAccentChange={setAccent}
          animations={animations}
          onAnimationsChange={() => setAnimations(!animations)}
          navigation={navigation}
          onNavigationChange={() => setNavigation(!navigation)}
        />
      </div>
    </div>
  );
}