import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const target = path.resolve(process.cwd(), 'lib/event.mjs');

const keys = [
  'GOOGLE_MAPS_URL',
  'VENUE_NAME',
  'VENUE_ADDRESS',
  'GROOM_NAME',
  'BRIDE_NAME',
  'GROOM_FATHER_NAME',
  'GROOM_MOTHER_NAME',
  'BRIDE_FATHER_NAME',
  'BRIDE_MOTHER_NAME',
  'GROOM_FAMILY_CONTACT_NAME',
  'GROOM_FAMILY_PHONE_NUMBER',
  'BRIDE_FAMILY_CONTACT_NAME',
  'BRIDE_FAMILY_PHONE_NUMBER',
  'EVENT_TIMEZONE',
  'EVENT_TIMEZONE_OFFSET',
  'EVENT_START_DATE',
  'EVENT_START_TIME'
];

const missing = keys.filter((key) => !String(process.env[key] ?? '').trim());
if (missing.length) {
  console.error(`Missing required invitation configuration: ${missing.join(', ')}`);
  process.exit(1);
}

let source = fs.readFileSync(target, 'utf8');

for (const key of keys) {
  const token = `{{${key}}}`;
  const value = String(process.env[key]);
  source = source.split(token).join(value);
}

const unresolved = [...source.matchAll(/{{([A-Z0-9_]+)}}/g)].map((match) => match[1]);
if (unresolved.length) {
  console.error(`Unresolved invitation placeholders: ${[...new Set(unresolved)].join(', ')}`);
  process.exit(1);
}

fs.writeFileSync(target, source, 'utf8');
console.log('Invitation event configuration rendered successfully.');
