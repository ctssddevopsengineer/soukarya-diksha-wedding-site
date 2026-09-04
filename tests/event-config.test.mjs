import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { EVENT } from '../lib/event.mjs';

test('reception details are centralized in EVENT constants', () => {
  for (const key of ['dateLabel', 'timeLabel', 'venueName', 'venueAddress', 'mapsUrl']) {
    assert.equal(typeof EVENT[key], 'string', `${key} should be a string`);
    assert.ok(EVENT[key].trim().length > 0, `${key} should not be empty`);
  }

  assert.ok(EVENT.start instanceof Date);
  assert.equal(Number.isNaN(EVENT.start.getTime()), false);
  assert.match(EVENT.mapsUrl, /^https:\/\//);
});

test('Dinner is not part of the event configuration', () => {
  assert.equal(Object.hasOwn(EVENT, 'dinnerLabel'), false);
});

test('InsideRight consumes event constants instead of hardcoding reception values', async () => {
  const source = await readFile(new URL('../components/InsideRight.js', import.meta.url), 'utf8');

  assert.match(source, /EVENT\.dateLabel/);
  assert.match(source, /EVENT\.timeLabel/);
  assert.match(source, /EVENT\.venueName/);
  assert.match(source, /EVENT\.venueAddress/);
  assert.match(source, /EVENT\.mapsUrl/);
  assert.match(source, /EVENT\.start/);

  assert.doesNotMatch(source, />Dinner</i);
});


test('front-cover copy is centralized for dynamic theme rendering', () => {
  assert.equal(EVENT.frontCover.heading, 'Reception');
  assert.equal(EVENT.frontCover.subheading, 'Invitation');
  assert.ok(Array.isArray(EVENT.frontCover.closingLines));
  assert.ok(EVENT.frontCover.closingLines.length >= 2);
});
