'use client';

import { EVENT } from '@/lib/event.mjs';
import { buildGoogleCalendarUrl, buildIcs } from '@/lib/calendar.mjs';

function toSafeFilePart(value) {
  return String(value || 'wedding-reception')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'wedding-reception';
}

export default function CalendarButtons() {
  const googleUrl = buildGoogleCalendarUrl(EVENT);

  function downloadIcs() {
    const blob = new Blob([buildIcs(EVENT)], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${toSafeFilePart(EVENT.couple)}-reception.ics`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="actionRow">
      <a className="btn btnGold" href={googleUrl} target="_blank" rel="noreferrer">
        Google Calendar
      </a>
      <button className="btn btnGhost" type="button" onClick={downloadIcs}>
        Apple / Outlook
      </button>
    </div>
  );
}
