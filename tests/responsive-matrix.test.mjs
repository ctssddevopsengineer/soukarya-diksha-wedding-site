import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { RESPONSIVE_VALIDATION_WIDTHS, viewportBucket } from '../lib/responsive.mjs';

const css = fs.readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

test('responsive validation matrix covers compact phones through desktop', () => {
  assert.deepEqual(RESPONSIVE_VALIDATION_WIDTHS, [320, 360, 390, 430, 768, 1024, 1440]);
  assert.equal(viewportBucket(320), 'compact-phone');
  assert.equal(viewportBucket(390), 'phone');
  assert.equal(viewportBucket(430), 'phone');
  assert.equal(viewportBucket(768), 'tablet');
  assert.equal(viewportBucket(1024), 'tablet');
  assert.equal(viewportBucket(1440), 'desktop');
});

test('CSS includes targeted compact-phone, phone/tablet and reduced-motion guards', () => {
  assert.match(css, /@media \(max-width: 360px\)/);
  assert.match(css, /@media \(max-width: 430px\)/);
  assert.match(css, /@media \(min-width: 681px\) and \(max-width: 1024px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test('theme picker stays outside page viewport geometry and scales independently', () => {
  assert.match(css, /\.themeOptions[\s\S]*?repeat\(auto-fit, minmax\(132px, 1fr\)\)/);
  assert.match(css, /\.pageViewport[\s\S]*?aspect-ratio:/);
  assert.match(css, /\.page-back \.pageViewport[\s\S]*?aspect-ratio:/);
});
