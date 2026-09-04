'use client';

import { useRef } from 'react';
import { getThemeAsset, THEMES, THEME_IDS } from '@/lib/theme.mjs';

export default function ThemeSwitcher({ themeId, onThemeChange, onThemeWarm }) {
  const optionRefs = useRef([]);

  function focusTheme(index) {
    const normalized = (index + THEME_IDS.length) % THEME_IDS.length;
    optionRefs.current[normalized]?.focus();
    onThemeWarm?.(THEME_IDS[normalized]);
  }

  function handleKeyDown(event, index) {
    let targetIndex = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') targetIndex = index + 1;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') targetIndex = index - 1;
    if (event.key === 'Home') targetIndex = 0;
    if (event.key === 'End') targetIndex = THEME_IDS.length - 1;
    if (targetIndex == null) return;

    event.preventDefault();
    const normalized = (targetIndex + THEME_IDS.length) % THEME_IDS.length;
    focusTheme(normalized);
    onThemeChange(THEME_IDS[normalized]);
  }

  return (
    <section className="themeSwitcher" aria-label="Choose invitation colour theme">
      <div className="themeSwitcherHeading">
        <span className="themeSwitcherLabel">Colour Theme</span>
        <span className="themeSwitcherHint">Choose a preview — your selection is shareable</span>
      </div>

      <div className="themeOptions" role="radiogroup" aria-label="Invitation colour theme">
        {THEME_IDS.map((id, index) => {
          const theme = THEMES[id];
          const active = id === themeId;
          return (
            <button
              key={id}
              ref={(node) => { optionRefs.current[index] = node; }}
              type="button"
              className={active ? 'themeOption active' : 'themeOption'}
              onClick={() => onThemeChange(id)}
              onPointerEnter={() => onThemeWarm?.(id)}
              onFocus={() => onThemeWarm?.(id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              role="radio"
              aria-checked={active}
              aria-label={`Use ${theme.label} theme`}
              title={theme.label}
              tabIndex={active ? 0 : -1}
            >
              <span className="themeThumbnailFrame" style={{ '--swatch': theme.swatch }} aria-hidden="true">
                <img
                  className="themeThumbnail"
                  src={getThemeAsset(id, 'thumbnail')}
                  alt=""
                  loading={active ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <span className="themeSwatch" style={{ '--swatch': theme.swatch }} />
              </span>
              <span className="themeOptionName">{theme.shortLabel}</span>
              {active && <span className="themeCheck" aria-hidden="true">✓</span>}
            </button>
          );
        })}
      </div>
    </section>
  );
}
