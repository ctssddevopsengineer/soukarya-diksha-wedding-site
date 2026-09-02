import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeRsvp, RSVP_STATUS, submitRsvp, validateRsvp } from '../lib/rsvp.mjs';

test('normalizes guest input safely', () => {
  assert.deepEqual(normalizeRsvp({ name: '  Rahul   Sen  ', status: 'attending', guests: '2', message: ' Hi ' }), {
    name: 'Rahul Sen', status: 'attending', guests: 2, message: 'Hi'
  });
});

test('accepts a valid attending RSVP', () => {
  const result = validateRsvp({ name: 'Rahul Sen', status: RSVP_STATUS.ATTENDING, guests: 2, message: '' });
  assert.equal(result.valid, true);
  assert.equal(result.value.guests, 2);
});

test('rejects missing name and status', () => {
  const result = validateRsvp({ name: '', status: '', guests: 1 });
  assert.equal(result.valid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.status);
});

test('rejects guest count above limit', () => {
  const result = validateRsvp({ name: 'Rahul Sen', status: RSVP_STATUS.ATTENDING, guests: 9 });
  assert.equal(result.valid, false);
  assert.ok(result.errors.guests);
});

test('declined RSVP normalizes guest count to one', () => {
  const result = validateRsvp({ name: 'Rahul Sen', status: RSVP_STATUS.DECLINED, guests: 4 });
  assert.equal(result.valid, true);
  assert.equal(result.value.guests, 1);
});

test('demo submission succeeds without endpoint', async () => {
  const result = await submitRsvp('', { name: 'Rahul' });
  assert.deepEqual(result, { mode: 'demo', ok: true });
});

test('remote submission sends JSON POST', async () => {
  let captured;
  const fakeFetch = async (url, options) => {
    captured = { url, options };
    return { ok: true, status: 200 };
  };

  const result = await submitRsvp('https://example.test/rsvp', { name: 'Rahul' }, fakeFetch);
  assert.equal(result.mode, 'remote');
  assert.equal(captured.options.method, 'POST');
  assert.equal(captured.options.headers['content-type'], 'application/json');
  assert.equal(JSON.parse(captured.options.body).name, 'Rahul');
});

test('remote submission throws on non-2xx', async () => {
  const fakeFetch = async () => ({ ok: false, status: 500 });
  await assert.rejects(() => submitRsvp('https://example.test/rsvp', {}, fakeFetch), /HTTP 500/);
});
