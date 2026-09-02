'use client';

import { EVENT } from '@/lib/event.mjs';
import { buildGoogleCalendarUrl, buildIcs } from '@/lib/calendar.mjs';

export default function CalendarButtons() {
  function downloadIcs() {
    const blob = new Blob([buildIcs(EVENT)], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'soukarya-diksha-reception.ics';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="buttonRow" aria-label="Calendar options">
      <a
        className="button buttonPrimary"
        href={buildGoogleCalendarUrl(EVENT)}
        target="_blank"
        rel="noreferrer"
      >
        Add to Google Calendar
      </a>
      <button className="button buttonSecondary" type="button" onClick={downloadIcs}>
        Apple / Outlook (.ics)
      </button>
    </div>
  );
}
