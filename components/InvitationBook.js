'use client';

import { useEffect, useRef, useState } from 'react';
import BackCover from '@/components/BackCover';
import FrontCover from '@/components/FrontCover';
import InsideLeft from '@/components/InsideLeft';
import InsideRight from '@/components/InsideRight';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { INVITATION_PAGES, nextPageIndex, previousPageIndex } from '@/lib/navigation.mjs';
import { DEFAULT_THEME_ID, getTheme, resolveThemeId, THEME_STORAGE_KEY } from '@/lib/theme.mjs';

const PAGE_LABELS = ['Front', 'Inside Left', 'Inside Right', 'Back'];
const SWIPE_THRESHOLD = 55;

export default function InvitationBook() {
  const [pageIndex, setPageIndex] = useState(0);
  const [themeId, setThemeId] = useState(DEFAULT_THEME_ID);
  const [themeReady, setThemeReady] = useState(false);
  const touchStartX = useRef(null);

  useEffect(() => {
    try {
      setThemeId(resolveThemeId(window.localStorage.getItem(THEME_STORAGE_KEY)));
    } catch {
      setThemeId(DEFAULT_THEME_ID);
    } finally {
      setThemeReady(true);
    }
  }, []);

  useEffect(() => {
    if (!themeReady) return;
    document.documentElement.dataset.invitationTheme = themeId;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeId);
    } catch {
      // Storage can be blocked in privacy modes; theme still works for this session.
    }
  }, [themeId, themeReady]);

  function changeTheme(nextThemeId) {
    setThemeId(resolveThemeId(nextThemeId));
  }

  function goTo(index) {
    setPageIndex(Math.max(0, Math.min(INVITATION_PAGES.length - 1, index)));
  }

  function handleTouchStart(event) {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event) {
    if (touchStartX.current == null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    setPageIndex((current) => delta < 0 ? nextPageIndex(current) : previousPageIndex(current));
  }

  const activeTheme = getTheme(themeId);
  const themeStyle = {
    '--theme-accent': activeTheme.accent,
    '--theme-accent-dark': activeTheme.accentDark,
    '--theme-gold': activeTheme.gold,
    '--theme-soft': activeTheme.soft,
    '--theme-ink': activeTheme.ink
  };

  const pages = [
    <FrontCover key="front" themeId={themeId} onOpen={() => goTo(1)} />,
    <InsideLeft key="inside-left" themeId={themeId} />,
    <InsideRight key="inside-right" themeId={themeId} />,
    <BackCover key="back" themeId={themeId} />
  ];

  return (
    <main className="bookApp" style={themeStyle} data-invitation-theme={themeId} data-theme-ready={themeReady ? 'true' : 'false'}>
      <ThemeSwitcher themeId={themeId} onThemeChange={changeTheme} />

      <section
        className={`bookStage page-${INVITATION_PAGES[pageIndex]}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-live="polite"
      >
        <div className="pageViewport">{pages[pageIndex]}</div>
      </section>

      <nav className="bookNav" aria-label="Invitation pages">
        <button
          type="button"
          className="navArrow"
          onClick={() => setPageIndex((current) => previousPageIndex(current))}
          disabled={pageIndex === 0}
          aria-label="Previous page"
        >
          ‹
        </button>

        <div className="pageDots">
          {PAGE_LABELS.map((label, index) => (
            <button
              type="button"
              key={label}
              className={index === pageIndex ? 'pageDot active' : 'pageDot'}
              onClick={() => goTo(index)}
              aria-label={`Go to ${label}`}
              aria-current={index === pageIndex ? 'page' : undefined}
              title={label}
            />
          ))}
        </div>

        <span className="pageLabel">{PAGE_LABELS[pageIndex]}</span>

        <button
          type="button"
          className="navArrow"
          onClick={() => setPageIndex((current) => nextPageIndex(current))}
          disabled={pageIndex === INVITATION_PAGES.length - 1}
          aria-label="Next page"
        >
          ›
        </button>
      </nav>

      <p className="swipeHint">Swipe or use the arrows to explore the invitation</p>
    </main>
  );
}
