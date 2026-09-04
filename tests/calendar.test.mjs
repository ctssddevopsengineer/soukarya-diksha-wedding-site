import test from 'node:test';
import assert from 'node:assert/strict';
import { buildGoogleCalendarUrl, buildIcs, escapeIcsText, toUtcCalendarStamp } from '../lib/calendar.mjs';

const event = {
  title: 'Soukarya & Diksha — Wedding Reception',
  start: '2027-01-18T18:30:00+05:30',
  end: '2027-01-18T22:30:00+05:30',
  venueName: 'Venue',
  venueAddress: 'Kolkata, India',
  mapsUrl: 'https://maps.example.test',
  description: 'Join us, with love; and blessings.'
};

test('converts IST event time to UTC calendar stamp', () => {
  assert.equal(toUtcCalendarStamp(event.start), '20270118T130000Z');
});

test('rejects invalid dates', () => {
  assert.throws(() => toUtcCalendarStamp('not-a-date'), TypeError);
});

test('escapes ICS reserved punctuation', () => {
  assert.equal(escapeIcsText('A, B; C\\D'), 'A\\, B\\; C\\\\D');
});

test('builds valid VCALENDAR envelope', () => {
  const ics = buildIcs(event);
  assert.match(ics, /BEGIN:VCALENDAR/);
  assert.match(ics, /DTSTART:20270118T130000Z/);
  assert.match(ics, /END:VCALENDAR/);
});

test('builds Google Calendar URL with event fields', () => {
  const url = new URL(buildGoogleCalendarUrl(event));
  assert.equal(url.hostname, 'calendar.google.com');
  assert.equal(url.searchParams.get('text'), event.title);
  assert.equal(url.searchParams.get('dates'), '20270118T130000Z/20270118T170000Z');
});
