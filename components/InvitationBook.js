'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import BackCover from '@/components/BackCover';
import FrontCover from '@/components/FrontCover';
import InsideLeft from '@/components/InsideLeft';
import InsideRight from '@/components/InsideRight';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { INVITATION_PAGES, nextPageIndex, previousPageIndex } from '@/lib/navigation.mjs';
import { DEFAULT_THEME_ID, getTheme, resolveThemeId, THEME_STORAGE_KEY } from '@/lib/theme.mjs';
import { getThemeWarmupAssets } from '@/lib/theme-preload.mjs';
import { buildThemeRelativeUrl, getInitialThemeId, getThemeIdFromSearch } from '@/lib/theme-url.mjs';

const PAGE_LABELS = ['Front', 'Inside Left', 'Inside Right', 'Back'];
const SWIPE_THRESHOLD = 55;
const INTERACTIVE_SELECTOR = 'button, a, input, select, textarea, [role="button"], [role="radio"]';

export default function InvitationBook() {
  const [pageIndex, setPageIndex] = useState(0);
  const [themeId, setThemeId] = useState(DEFAULT_THEME_ID);
  const [themeReady, setThemeReady] = useState(false);
  const touchStartX = useRef(null);
  const warmedAssets = useRef(new Set());

  const warmThemeAssets = useCallback((targetThemeId, targetPageIndex = pageIndex) => {
    if (typeof window === 'undefined' || typeof window.Image !== 'function') return;

    for (const src of getThemeWarmupAssets(targetThemeId, targetPageIndex)) {
      if (!src || warmedAssets.current.has(src)) continue;
      warmedAssets.current.add(src);
      const image = new window.Image();
      image.decoding = 'async';
      image.src = src;
    }
  }, [pageIndex]);

  useEffect(() => {
    let storedTheme = null;
    try {
      storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      // Storage may be unavailable in privacy mode. URL/default still work.
    }

    setThemeId(getInitialThemeId({ search: window.location.search, storedTheme }));
    setThemeReady(true);
  }, []);

  useEffect(() => {
    function handlePopState() {
      const urlTheme = getThemeIdFromSearch(window.location.search);
      if (urlTheme) setThemeId(urlTheme);
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (!themeReady) return;

    document.documentElement.dataset.invitationTheme = themeId;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeId);
    } catch {
      // Storage can be blocked; the URL still preserves the active theme.
    }

    const nextRelativeUrl = buildThemeRelativeUrl(window.location, themeId);
    const currentRelativeUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (nextRelativeUrl !== currentRelativeUrl) {
      window.history.replaceState(window.history.state, '', nextRelativeUrl);
    }
  }, [themeId, themeReady]);

  useEffect(() => {
    if (!themeReady) return;
    warmThemeAssets(themeId, pageIndex);
  }, [pageIndex, themeId, themeReady, warmThemeAssets]);

  useEffect(() => {
    function handleKeyboardNavigation(event) {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.target instanceof Element && event.target.closest(INTERACTIVE_SELECTOR)) return;

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setPageIndex((current) => previousPageIndex(current));
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        setPageIndex((current) => nextPageIndex(current));
      } else if (event.key === 'Home') {
        event.preventDefault();
        setPageIndex(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        setPageIndex(INVITATION_PAGES.length - 1);
      }
    }

    window.addEventListener('keydown', handleKeyboardNavigation);
    return () => window.removeEventListener('keydown', handleKeyboardNavigation);
  }, []);

  function changeTheme(nextThemeId) {
    const resolved = resolveThemeId(nextThemeId);
    if (resolved === themeId) return;
    warmThemeAssets(resolved, pageIndex);
    setThemeId(resolved);
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
    <main
      className="bookApp"
      style={themeStyle}
      data-invitation-theme={themeId}
      data-theme-ready={themeReady ? 'true' : 'false'}
    >
      <ThemeSwitcher
        themeId={themeId}
        onThemeChange={changeTheme}
        onThemeWarm={(id) => warmThemeAssets(id, pageIndex)}
      />

      <section
        className={`bookStage page-${INVITATION_PAGES[pageIndex]}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-live="polite"
        aria-label={`${PAGE_LABELS[pageIndex]} invitation page in ${activeTheme.label}`}
      >
        <div className="pageViewport themeTransitionFrame" key={`${themeId}-${pageIndex}`}>
          {pages[pageIndex]}
        </div>
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

      <p className="swipeHint">Swipe, use the arrows, or press ← / → to explore the invitation</p>
    </main>
  );
}
