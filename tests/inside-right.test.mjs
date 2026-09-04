import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { EVENT } from '../lib/event.mjs';

const source = fs.readFileSync(new URL('../components/InsideRight.js', import.meta.url), 'utf8');

test('event constants provide all reception values used by inside right', () => {
  for (const key of ['dateLabel', 'timeLabel', 'venueName', 'venueAddress', 'mapsUrl']) {
    assert.equal(typeof EVENT[key], 'string');
    assert.ok(EVENT[key].length > 0);
  }
  assert.ok(EVENT.start instanceof Date);
  assert.equal(Number.isNaN(EVENT.start.getTime()), false);
});

test('inside right renders reception values only from EVENT constants', () => {
  for (const property of ['dateLabel', 'timeLabel', 'venueName', 'venueAddress', 'mapsUrl', 'start']) {
    assert.match(source, new RegExp(`EVENT\\.${property}`));
  }
});

test('inside right contains no Dinner field or Dinner UI', () => {
  assert.doesNotMatch(source, /Dinner/i);
});

test('calendar and countdown are inside the reception details overlay', () => {
  const overlayStart = source.indexOf('className="receptionDetailsOverlay"');
  const overlayEnd = source.indexOf('</section>', overlayStart);
  const overlaySource = source.slice(overlayStart, overlayEnd);
  assert.match(overlaySource, /<CalendarButtons \/>/);
  assert.match(overlaySource, /<Countdown target=\{EVENT\.start\} \/>/);
});

test('location medallion supports hover, focus and click interactions', () => {
  assert.match(source, /onMouseEnter=\{openOnHover\}/);
  assert.match(source, /onFocus=\{openOnHover\}/);
  assert.match(source, /onClick=\{togglePinnedLocation\}/);
  assert.match(source, /EVENT\.venueName/);
  assert.match(source, /EVENT\.venueAddress/);
  assert.match(source, /EVENT\.mapsUrl/);
});


test('Rani Magenta can render the blank-template Location / Map label dynamically without affecting other themes', () => {
  assert.match(source, /theme\.dynamicLocationLabel/);
  assert.match(source, /insideRightDynamicLocationLabel/);
  assert.match(source, /Location \/<br \/>Map/);
});
