import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { EVENT } from '../lib/event.mjs';

test('reception details are centralized in EVENT constants', () => {
  assert.equal(EVENT.dateLabel, 'Monday, 18 January 2027');
  assert.equal(EVENT.timeLabel, '6:30 PM onwards');
  assert.equal(EVENT.venueName, 'HRS Bhawan');
  assert.equal(
    EVENT.venueAddress,
    '92, Artillery Road, Cantonment, Barrackpore, West Bengal 700120'
  );
  assert.match(EVENT.mapsUrl, /^https:\/\/maps\.app\.goo\.gl\//);
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

  assert.doesNotMatch(source, /Monday, 18 January 2027/);
  assert.doesNotMatch(source, /6:30 PM onwards/);
  assert.doesNotMatch(source, /92, Artillery Road/);
  assert.doesNotMatch(source, />Dinner</);
});
