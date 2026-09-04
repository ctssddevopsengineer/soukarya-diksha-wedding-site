function requireValidDate(value, label) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new TypeError(`${label} must be a valid ISO-8601 date/time`);
  }
  return date;
}

export function toUtcCalendarStamp(value) {
  return requireValidDate(value, 'date')
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z');
}

export function escapeIcsText(value = '') {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

export function buildIcs(event) {
  if (!event?.title || !event?.start || !event?.end) {
    throw new TypeError('event requires title, start and end');
  }

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Soukarya and Diksha//Reception Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:soukarya-diksha-reception@digital-invitation`,
    `DTSTAMP:${toUtcCalendarStamp(new Date().toISOString())}`,
    `DTSTART:${toUtcCalendarStamp(event.start)}`,
    `DTEND:${toUtcCalendarStamp(event.end)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `LOCATION:${escapeIcsText(`${event.venueName}, ${event.venueAddress}`)}`,
    `DESCRIPTION:${escapeIcsText(event.description)}`,
    `URL:${event.mapsUrl}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

export function buildGoogleCalendarUrl(event) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${toUtcCalendarStamp(event.start)}/${toUtcCalendarStamp(event.end)}`,
    details: event.description,
    location: `${event.venueName}, ${event.venueAddress}`
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
