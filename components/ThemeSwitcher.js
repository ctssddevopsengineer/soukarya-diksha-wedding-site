'use client';

import { THEMES, THEME_IDS } from '@/lib/theme.mjs';

export default function ThemeSwitcher({ themeId, onThemeChange }) {
  return (
    <section className="themeSwitcher" aria-label="Choose invitation colour theme">
      <span className="themeSwitcherLabel">Colour Theme</span>
      <div className="themeOptions" role="radiogroup" aria-label="Invitation colour theme">
        {THEME_IDS.map((id) => {
          const theme = THEMES[id];
          const active = id === themeId;
          return (
            <button
              key={id}
              type="button"
              className={active ? 'themeOption active' : 'themeOption'}
              onClick={() => onThemeChange(id)}
              role="radio"
              aria-checked={active}
              aria-label={`Use ${theme.label} theme`}
              title={theme.label}
            >
              <span className="themeSwatch" style={{ '--swatch': theme.swatch }} aria-hidden="true" />
              <span>{theme.shortLabel}</span>
              {active && <span className="themeCheck" aria-hidden="true">✓</span>}
            </button>
          );
        })}
      </div>
    </section>
  );
}
