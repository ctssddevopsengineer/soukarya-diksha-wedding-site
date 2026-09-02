# Soukarya & Diksha — Smart Wedding Microsite

A production-oriented, GitHub Pages compatible Next.js App Router project for a smart wedding/reception invitation.

## Features

- Responsive Bengali–Nepali themed reception microsite
- Google Maps venue deep link
- Google Calendar link
- Apple/Outlook `.ics` download
- RSVP form with validation
- Safe demo RSVP fallback using browser localStorage
- Optional production RSVP POST endpoint via `NEXT_PUBLIC_RSVP_ENDPOINT`
- Node built-in unit tests (no test framework dependency)
- GitHub Actions CI
- GitHub Pages CD using official Pages actions
- Repository-aware Next.js `basePath` for project Pages URLs

## Important RSVP architecture note

GitHub Pages is a static host. It cannot safely keep a server-side API key or persist RSVP submissions by itself.

This project therefore works immediately in **demo mode**. If `NEXT_PUBLIC_RSVP_ENDPOINT` is unset, validated RSVP data is saved locally in that guest's browser only.

For real guest collection, configure a secure HTTPS endpoint that accepts JSON POST requests and set it as a GitHub repository variable named `NEXT_PUBLIC_RSVP_ENDPOINT`. Never place database credentials, GitHub PATs, or private API keys in `NEXT_PUBLIC_*` variables because those values are shipped to the browser.

## Local setup

```bash
npm install
npm test
npm run dev
```

The first `npm install` creates `package-lock.json`. Commit that file. The supplied GitHub Actions workflows automatically use `npm ci` once the lockfile exists, while still allowing the very first bootstrap run to succeed without one.

Open http://localhost:3000.

Before going live, edit `lib/event.mjs` with the final date, venue name and address.

## GitHub Pages setup

1. Push this repository to GitHub.
2. Open **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Merge/push to `main`.
5. The `Deploy GitHub Pages` workflow builds `out/` and deploys it.

For a repository called `soukarya-diksha-wedding-site`, the expected URL is:

`https://<username>.github.io/soukarya-diksha-wedding-site/`

The Next.js config derives the repository name automatically inside GitHub Actions and applies it as `basePath`/`assetPrefix`.

## Run tests

```bash
npm test
```

The unit tests cover:

- Timezone conversion for calendar events
- ICS escaping and event generation
- Google Calendar URL generation
- RSVP normalization and validation
- Guest count boundaries
- Declined RSVP normalization
- Demo and remote RSVP submission behavior
- Remote API error behavior

## Recommended branch protection

Require the `Test and build` status check on `main`, require pull requests, and block direct pushes for the cleanest demo of a production delivery flow.
