import { Check, Plus } from "lucide-react";
import type { ThemeId } from "../../types/portfolio";

type Props = {
  theme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
  accent: string;
  onAccentChange: (accent: string) => void;
  animations: boolean;
  onAnimationsChange: () => void;
  navigation: boolean;
  onNavigationChange: () => void;
};

const themes: { id: ThemeId; label: string }[] = [
  { id: "cream", label: "Cream" },
  { id: "dark", label: "Dark" },
  { id: "minimal", label: "Minimal" },
  { id: "pixel", label: "Pixel" },
];

const colors = ["#f4fa75", "#252b37", "#936849", "#78806d", "#72a9a7", "#6085ba", "#ee6f27", "#bd8399"];

export function CustomizePanel(props: Props) {
  return (
    <aside className="panel customize-panel">
      <h2>Customize</h2>

      <section>
        <h3>Theme</h3>
        <div className="theme-grid">
          {themes.map((item) => (
            <button
              key={item.id}
              className={`theme-card ${props.theme === item.id ? "selected-theme" : ""}`}
              onClick={() => props.onThemeChange(item.id)}
            >
              <div className={`theme-thumbnail mini-${item.id}`}>
                <i /><i /><i />
              </div>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      <hr />

      <section>
        <h3>Accent colors</h3>
        <div className="accent-grid">
          {colors.map((color) => (
            <button
              key={color}
              className={`color-swatch ${props.accent === color ? "selected-color" : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => props.onAccentChange(color)}
              aria-label={`Choose ${color}`}
            >
              {props.accent === color && <Check size={16} />}
            </button>
          ))}
          <button className="color-swatch add-color"><Plus size={18} /></button>
        </div>
      </section>

      <hr />

      <label className="font-select">
        Font
        <select defaultValue="Inter">
          <option>Inter</option>
          <option>DM Sans</option>
          <option>Space Grotesk</option>
        </select>
      </label>

      <hr />

      <div className="toggle-row">
        <span>Enable subtle animations</span>
        <button
          className={`toggle ${props.animations ? "toggle-on" : ""}`}
          onClick={props.onAnimationsChange}
        >
          <span />
        </button>
      </div>

      <div className="toggle-row">
        <span>Show section navigation</span>
        <button
          className={`toggle ${props.navigation ? "toggle-on" : ""}`}
          onClick={props.onNavigationChange}
        >
          <span />
        </button>
      </div>

      <section className="completeness-card">
        <h3>Portfolio completeness — 65%</h3>
        <div className="progress-track">
          <div className="progress-value completeness-progress" />
        </div>
        <p>● Add a profile photo</p>
        <p>● Add at least one project</p>
        <p className="incomplete">○ Add social links</p>
      </section>
    </aside>
  );
}