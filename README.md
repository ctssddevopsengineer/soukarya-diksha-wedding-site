# Soukarya & Diksha Wedding Site

A digital wedding invitation experience built with Next.js, designed to feel warm, personal, and elegant across desktop and mobile screens. The app presents a four-page invitation book with theme switching, responsive navigation, and event details that are centralized for easy updates.

## Project overview

This project is a modern microsite for a wedding invitation and can be seen as a lightweight digital guestbook experience. It includes:

- a four-page invitation flow: Front, Inside Left, Inside Right, and Back
- a theme system with multiple visual styles
- swipe, arrow, and keyboard navigation
- persistent theme selection using browser storage and URL state
- event data and family contact configuration in a central data file
- image-based theme assets for each page and color palette
- automated test coverage for layout, navigation, and theme integrity

The application entry point is `app/page.js`, which renders `InvitationBook` from `components/InvitationBook.js`.

## Tech stack

- Next.js `^16.3.4`
- React `19.2.0`
- React DOM `19.2.0`
- Node `>=22`

## Deployment

### Local development

```bash
npm install
npm run dev
```

Then open the local Next.js development URL shown in the terminal.

### Production build

```bash
npm run build
npm start
```

### Useful test commands

```bash
npm test
npm run test:unit
npm run test:phase2a
```

## Current app structure

```text
app/
  globals.css
  layout.js
  page.js

components/
  InvitationBook.js
  FrontCover.js
  InsideLeft.js
  InsideRight.js
  BackCover.js
  ThemeSwitcher.js
  CalendarButtons.js
  ContactDetails.js
  Countdown.js

lib/
  event.mjs
  theme.mjs
  theme-url.mjs
  theme-preload.mjs
  navigation.mjs
  calendar.mjs
  contact.mjs
  responsive.mjs

public/
  themes/
    classic/
    blush/
    magenta/
    navy/
    plum/
    saffron/

tests/
  theme.test.mjs
  navigation.test.mjs
  event-config.test.mjs
  responsive-matrix.test.mjs
  long-text-stress.test.mjs
  phase2a-ux-hardening.test.mjs
```

## Event and content configuration

The event information is centralized in `lib/event.mjs` and currently includes:

- couple names: Soukarya & Diksha
- event title: `Soukarya & Diksha — Wedding Reception`
- date: `2027-01-23`
- timezone: `Asia/Kolkata`
- venue: `HRS Bhawan`
- address: `92, Artillary Road, Cantonment, Barrackpore, West Bengal 700120`
- map link: Google Maps deep link configured in the code

This makes it easy to update names, venue, schedule, or family details without rewriting the UI.

## Theme customization

Theme configuration lives in `lib/theme.mjs`.

### Default theme

- `classic`

### Available themes

- `classic`
- `blush`
- `magenta`
- `navy`
- `plum`
- `saffron`

### Backward-compatible aliases

- `pink` -> `blush`
- `rani` -> `magenta`
- `royalNavy` -> `navy`
- `royalPlum` -> `plum`
- `saffronGold` -> `saffron`

Each theme has metadata such as accent color, soft tones, ink color, and page assets under `public/themes/<theme>/`.

To customize the invitation appearance:

1. update the theme metadata in `lib/theme.mjs`
2. replace or add assets inside `public/themes/<theme>/`
3. keep the file names consistent with the generated asset references
4. confirm the updated theme still passes the integrity tests

## Customization notes for collaborators

A few files are the main touchpoints for project changes:

- `lib/event.mjs` — names, event date, venue, family details, and map link
- `lib/theme.mjs` — theme names, palette, aliases, and theme metadata
- `public/themes/*` — page artwork and visual styling assets
- `components/*.js` — page layout and invitation content rendering
- `app/globals.css` — shared styling and visual polish

## Maintenance

This project is intentionally structured so that non-design contributors can update wedding details without changing the underlying page logic. If any invitation text, family references, theme colors, or venue details need to change, the core updates are centralized in the files above.

## Notes

- The app stores the selected theme in browser local storage using the key `sd-invitation-theme`.
- The active theme is also synchronized to the URL for shareable or persistent state.
- The app includes a test suite for navigation, responsiveness, theme integrity, and stress conditions.

This README is intended to serve as a simple project overview for family members or collaborators, while remaining aligned with the code that powers the invitation site.
