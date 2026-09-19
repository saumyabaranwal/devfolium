import { useState } from "react";
import "./index.css";
import { initialProfile } from "./data/portfolio";
import { Header } from "./components/editor/Header";
import { ProfileEditor } from "./components/editor/ProfileEditor";
import { LivePreview } from "./components/editor/LivePreview";
import { CustomizePanel } from "./components/editor/CustomizePanel";
import type { ThemeId } from "./types/portfolio";

export default function App() {
  const [profile, setProfile] = useState(initialProfile);
  const [theme, setTheme] = useState<ThemeId>("cream");
  const [accent, setAccent] = useState("#f4fa75");
  const [animations, setAnimations] = useState(true);
  const [navigation, setNavigation] = useState(true);
  const [mobilePreview, setMobilePreview] = useState(false);

  return (
    <div className="app-shell" style={{ "--accent": accent } as React.CSSProperties}>
      <Header />

      <div className="editor-layout">
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