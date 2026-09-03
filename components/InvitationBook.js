'use client';

import { useRef, useState } from 'react';
import BackCover from '@/components/BackCover';
import FrontCover from '@/components/FrontCover';
import InsideLeft from '@/components/InsideLeft';
import InsideRight from '@/components/InsideRight';
import { INVITATION_PAGES, nextPageIndex, previousPageIndex } from '@/lib/navigation.mjs';

const PAGE_LABELS = ['Front', 'Inside Left', 'Inside Right', 'Back'];
const SWIPE_THRESHOLD = 55;

export default function InvitationBook() {
  const [pageIndex, setPageIndex] = useState(0);
  const touchStartX = useRef(null);

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

  const pages = [
    <FrontCover key="front" onOpen={() => goTo(1)} />,
    <InsideLeft key="inside-left" />,
    <InsideRight key="inside-right" />,
    <BackCover key="back" />
  ];

  return (
    <main className="bookApp">
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
