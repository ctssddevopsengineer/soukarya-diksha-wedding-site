// Event related constants
const EVENT_START_DATE = new Date('2027-01-23T19:00:00+05:30');
const EVENT_END_DATE = new Date(EVENT_START_DATE.getTime() + 6 * 60 * 60 * 1000); // 6 hours later
const EVENT_TIMEZONE = 'Asia/Kolkata';
//const EVENT_TIMEZONE_OFFSET = '+05:30'; // IST (Indian Standard Time)

// Map related constants
const MAPS_URL = 'https://maps.app.goo.gl/QXBrYKXfHC27pNAj8?g_st=ac';
const VENUE_NAME = 'HRS Bhawan';
const VENUE_ADDRESS = '92, Artillary Road, Cantonment, Barrackpore, West Bengal 700120';

// Groom and Bride names
const GROOM_NAME = 'Soukarya';
const BRIDE_NAME = 'Diksha';

// Groom's parents name
const GROOM_FATHER_NAME = 'Mr. Somnath Datta';
const GROOM_MOTHER_NAME = 'Mrs. Nirjhara Datta';

// Bride's parents name
const BRIDE_FATHER_NAME = 'Mr. Sri Krishna Bhujel';
const BRIDE_MOTHER_NAME = 'Mrs. Durgamaya Bhujel';

// Groom and Bride family contact information
const GROOM_FAMILY_CONTACT_NAME = 'Mr. Somnath Datta';
const GROOM_FAMILY_CONTACT_PHONE = '+91 XXXXX XXXXX'; // Placeholder phone number
const BRIDE_FAMILY_CONTACT_NAME = 'Mrs. Gita Khawas';
const BRIDE_FAMILY_CONTACT_PHONE = '+91 XXXXX XXXXX'; // Placeholder phone number

// contact names and phone numbers are placeholders. Please update them before production printing/deployment.
const groomFamilyContact = {
  name: GROOM_FAMILY_CONTACT_NAME,
  phone: GROOM_FAMILY_CONTACT_PHONE
};

const brideFamilyContact = {
  name: BRIDE_FAMILY_CONTACT_NAME,
  phone: BRIDE_FAMILY_CONTACT_PHONE
};
function formatDateLabel(date, locale = 'en-GB', timeZone = EVENT_TIMEZONE) {
  try {
    return new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone
    }).format(date);
  } catch (e) {
    return date.toDateString();
  }
}

function formatTime(date, locale = 'en-GB', timeZone = EVENT_TIMEZONE) {
  try {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone
    }).format(date);
  } catch (e) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

function formatTimeLabel(start, end, locale = 'en-GB', timeZone = EVENT_TIMEZONE) {
  if (start && end) {
    try {
      const sameDay = start.toDateString() === end.toDateString();
      const s = formatTime(start, locale, timeZone);
      const e = formatTime(end, locale, timeZone);
      return sameDay ? `${s} — ${e}` : `${s} onwards`;
    } catch (e) {
      return `${start.toLocaleTimeString()} onwards`;
    }
  }
  return `${formatTime(start, locale, timeZone)} onwards`;
}

export const EVENT = Object.freeze({
  title: 'Soukarya & Diksha — Wedding Reception',
  couple: 'Soukarya & Diksha',
  tagline: 'A Celebration of Two Cultures, One Beautiful Journey',

  // TODO: Replace these placeholder values before production printing/deployment.
  dateLabel: formatDateLabel(EVENT_START_DATE),
  timeLabel: formatTimeLabel(EVENT_START_DATE),
  start: EVENT_START_DATE,
  end: EVENT_END_DATE,
  timezone: EVENT_TIMEZONE,

  venueName: VENUE_NAME,
  venueAddress: VENUE_ADDRESS,
  mapsUrl: MAPS_URL,

  description:
    'Together with their families, Soukarya and Diksha invite you to celebrate their wedding reception.',

  families: Object.freeze({
    groom: Object.freeze({
      heading: "Groom's Family",
      father: GROOM_FATHER_NAME,
      mother: GROOM_MOTHER_NAME
    }),
    bride: Object.freeze({
      heading: "Bride's Family",
      father: BRIDE_FATHER_NAME,
      mother: BRIDE_MOTHER_NAME
    })
  }),

  contacts: Object.freeze([
    Object.freeze({
      role: "Groom's Family",
      name: groomFamilyContact.name,
      phone: groomFamilyContact.phone
    }),
    Object.freeze({
      role: "Bride's Family",
      name: brideFamilyContact.name,
      phone: brideFamilyContact.phone
    })
  ])
});
