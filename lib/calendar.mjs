function pad(value) {
  return String(value).padStart(2, '0');
}

export function toUtcCalendarStamp(dateLike) {
  const date = new Date(dateLike);
  if (Number.isNaN(date.getTime())) {
    throw new TypeError('Invalid event date');
  }
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
}

export function escapeIcsText(value) {
  return String(value)
    .replaceAll('\\', '\\\\')
    .replaceAll('\n', '\\n')
    .replaceAll(',', '\\,')
    .replaceAll(';', '\\;');
}

export function buildIcs(event) {
  const start = toUtcCalendarStamp(event.start);
  const end = toUtcCalendarStamp(event.end);
  const uid = `soukarya-diksha-${start.toLowerCase()}@wedding.local`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Soukarya & Diksha//Wedding Reception//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${start}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `LOCATION:${escapeIcsText(`${event.venueName}, ${event.venueAddress}`)}`,
    `DESCRIPTION:${escapeIcsText(event.description)}`,
    `URL:${event.mapsUrl}`,
    'END:VEVENT',
    'END:VCALENDAR',
    ''
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
