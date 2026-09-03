# Page 4 Heritage Landscape — Validation Cases

## Scope
Regression and layout validation for the fourth/back-cover page only, while preserving Pages 1–3.

## Automated source/regression checks
1. Uses `public/images/back-cover-heritage-blank.png` as the visual base.
2. Back-cover copy is read from `EVENT.backCover`.
3. Bride/groom names are read from `EVENT.groomName` and `EVENT.brideName`.
4. Family assistance details are read from `EVENT.contacts`.
5. No person-specific values are hardcoded inside `BackCover.js`.
6. NFC/QR UI is absent in Phase 1.
7. NFC/QR configuration is absent from `EVENT.backCover` in Phase 1.
8. Back-cover viewport preserves the native `1536 / 1085` aspect ratio.
9. Typography uses container-relative (`cqw`) sizing so it scales with the actual invitation page instead of the browser viewport.
10. Main text zones are ordered and vertically separated: gratitude -> couple -> journey -> assistance.
11. Existing Inside Left and Inside Right regression tests continue to pass.

## Visual layout check
A browser-rendered standalone preview of the exact Page 4 layout was produced at 1440×1020.
Measured vertical gaps:
- Gratitude block -> Couple names: 15.0 px
- Couple names -> Journey message: 55.8 px
- Journey message -> Assistance: 69.5 px

No text-block collision was detected in the preview.

## Build check
The source/unit/regression suite runs without package installation. A clean Next.js production build could not be executed because the sandbox has no npm network access and `tslib@2.8.1` is not present in the local npm cache. This is an environment dependency limitation, not a reported source-code build error.
