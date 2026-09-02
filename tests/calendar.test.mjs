import test from 'node:test';
import assert from 'node:assert/strict';
import { buildGoogleCalendarUrl, buildIcs, escapeIcsText, toUtcCalendarStamp } from '../lib/calendar.mjs';
import { EVENT } from '../lib/event.mjs';

test('converts India offset date to UTC calendar format', () => {
  assert.equal(toUtcCalendarStamp('2027-01-18T18:30:00+05:30'), '20270118T130000Z');
});

test('throws for an invalid date', () => {
  assert.throws(() => toUtcCalendarStamp('not-a-date'), /Invalid event date/);
});

test('escapes ICS special characters', () => {
  assert.equal(escapeIcsText('A, B; C\\D\nE'), 'A\\, B\\; C\\\\D\\nE');
});

test('generates a valid VEVENT payload', () => {
  const ics = buildIcs(EVENT);
  assert.match(ics, /BEGIN:VCALENDAR/);
  assert.match(ics, /BEGIN:VEVENT/);
  assert.match(ics, /SUMMARY:Soukarya & Diksha — Wedding Reception/);
  assert.match(ics, /DTSTART:20270118T130000Z/);
  assert.match(ics, /END:VCALENDAR/);
});

test('generates Google Calendar URL with event title', () => {
  const url = new URL(buildGoogleCalendarUrl(EVENT));
  assert.equal(url.hostname, 'calendar.google.com');
  assert.equal(url.searchParams.get('action'), 'TEMPLATE');
  assert.equal(url.searchParams.get('text'), EVENT.title);
});
