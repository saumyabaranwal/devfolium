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

const colors = [
  "#f4fa75",
  "#252b37",
  "#8f6749",
  "#6e9279",
  "#52a6a0",
  "#5c89c9",
  "#8063b3",
  "#e96e3e",
  "#c48a9c",
  "#b7b8b5",
];

export function CustomizePanel(props: Props) {
  return (
    <aside className="panel customize-panel">
      <div className="customize-left">
        <section>
          <h2>Customize</h2>
          <h3>Theme</h3>

          <div className="theme-grid">
            {themes.map((item) => (
              <button
                key={item.id}
                className={`theme-card ${
                  props.theme === item.id ? "selected-theme" : ""
                }`}
                onClick={() => props.onThemeChange(item.id)}
              >
                <div className={`theme-thumbnail mini-${item.id}`}>
                  <i />
                  <i />
                  <i />
                </div>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="accent-section">
          <h3>Accent colors</h3>

          <div className="accent-grid">
            {colors.map((color) => (
              <button
                key={color}
                className={`color-swatch ${
                  props.accent === color ? "selected-color" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => props.onAccentChange(color)}
                aria-label={`Choose ${color}`}
              >
                {props.accent === color && <Check size={16} />}
              </button>
            ))}

            <button className="color-swatch add-color" aria-label="Add color">
              <Plus size={17} />
            </button>
          </div>
        </section>
      </div>

      <div className="customize-middle">
        <label className="font-select">
          Font
          <select defaultValue="Inter">
            <option>Inter</option>
            <option>DM Sans</option>
            <option>Space Grotesk</option>
          </select>
        </label>

        <div className="toggle-row">
          <span>Enable subtle animations</span>
          <button
            className={`toggle ${props.animations ? "toggle-on" : ""}`}
            onClick={props.onAnimationsChange}
            aria-label="Toggle subtle animations"
          >
            <span />
          </button>
        </div>

        <div className="toggle-row">
          <span>Show section navigation</span>
          <button
            className={`toggle ${props.navigation ? "toggle-on" : ""}`}
            onClick={props.onNavigationChange}
            aria-label="Toggle section navigation"
          >
            <span />
          </button>
        </div>
      </div>

      <section className="completeness-card">
        <h3>Portfolio completeness — 65%</h3>

        <div className="progress-track">
          <div className="progress-value completeness-progress" />
        </div>

        <p>● <span>Add a profile photo</span></p>
        <p>● <span>Add at least one project</span></p>
        <p className="incomplete">○ <span>Add social links</span></p>
      </section>
    </aside>
  );
}