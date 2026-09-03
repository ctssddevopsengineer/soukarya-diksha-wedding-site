
# Soukarya & Diksha — Digital Reception Invitation

A mobile-first, four-page digital invitation built with Next.js. The experience intentionally mirrors a physical card:

1. Front Cover
2. Inside Left — blessings and families
3. Inside Right — reception details, Google Maps QR, Add to Calendar, countdown
4. Back Cover — contact details and the NFC/QR technology signature

## Stack

- Next.js App Router
- React
- Static export (`out/`)
- GitHub Actions CI/CD
- Cloudflare Pages hosting
- Node built-in test runner

## Configure your real event data

Edit **`lib/event.mjs`** before production deployment. Replace:

- reception date and time
- venue name and full address
- groom's parents
- bride's parents
- groom-side contact
- bride-side contact

The current Google Maps link is already configured.

## Local development

```bash
npm install --no-audit --no-fund
npm test
npm run dev
```

Open `http://localhost:3000`.

## Production validation

```bash
npm test
npm run build
```

A successful build writes the static site to `out/`.

## Cloudflare Pages via GitHub Actions

Create a Cloudflare Pages project named `soukarya-diksha`, then configure these GitHub **production environment secrets**:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

The `Deploy to Cloudflare Pages` workflow runs on pushes to `main` and can also be started manually.

## NFC

Program your NFC tag with the final Cloudflare Pages URL, for example:

`https://soukarya-diksha.pages.dev`

The printed QR and NFC can both point to the same site. The separate venue QR opens Google Maps directly.

## Privacy

The site is static and has no RSVP database or guest tracking. `metadata.robots` is set to `index: false`, but this is not access control. If the URL must be private, add an authentication/access layer before distribution.


## Family Blessings Page

The Inside Left / Family Blessings page uses `public/images/inside-left-blank.png` as the approved text-free artwork. The component does not mask or paint over template text. All displayed invitation copy and person-specific values come from `lib/event.mjs`.

Update these constants only:

- `GROOM_NAME` / `BRIDE_NAME`
- `GROOM_FATHER_NAME` / `GROOM_MOTHER_NAME`
- `BRIDE_FATHER_NAME` / `BRIDE_MOTHER_NAME`
- `EVENT.insideLeft.heading`
- `EVENT.insideLeft.introLines`
- `EVENT.insideLeft.closingLines`

The highlighted `Groom's Family` and `Bride's Family` labels remain independent headings and the names are rendered below them.

### Validation

`npm test` / `node --test tests/*.test.mjs` validates centralized constants, family value bindings, template usage, heading preservation, navigation, contacts, calendar behavior and Inside Right behavior.
