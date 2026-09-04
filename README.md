# Soukarya & Diksha Wedding Site — Phase 2A Classic + Blush

This package contains the private wedding invitation microsite with the approved four-page invitation experience and the two production-safe colour themes:

1. **Original Deep Red**
2. **Blush Rose / Baby Pink**

## What is included
- Front cover
- Inside left — family blessings
- Inside right — reception details
- Back cover — gratitude and assistance contacts
- Theme switching with persistence
- QR / map popover on the reception details page
- Add to Calendar support
- Mobile-first invitation book navigation
- Test suite for structure, layout guards, and event-data wiring

## Theme behavior
- `classic` remains the default theme
- `blush` uses the newly supplied blank + achieved template direction
- legacy saved value `pink` automatically resolves to `blush`

## Useful commands
```bash
npm install
npm test
npm run build
npm run dev
```

## Important implementation notes
- Reception content is driven from `lib/event.mjs`
- Theme assets are resolved from `lib/theme.mjs`
- The invitation pages themselves render from reusable React components under `components/`
- The blush theme artwork lives under `public/themes/blush/`

## Validation
See `VALIDATION_CLASSIC_BLUSH.md` for the executed verification summary.

## Royal Plum theme
Royal Plum is available as the fifth theme. It uses dedicated page artwork, dynamic event copy, a centered Page 3 monogram, and a plum/gold Location/Map interaction with a vector pin icon. Existing Deep Red, Blush Rose, Rani Magenta and Royal Navy assets are protected by regression hashes.
