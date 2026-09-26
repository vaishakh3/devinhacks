# Devin Hacks Kochi website

A redesigned, responsive static website using the approved Kochi animation. The full-screen city extends into a miniature-city design language: park green, brick red, printed cream and glass blue. The format uses large architectural event facts, and the reward pass pairs MAX with the official Devin mark. No build step, framework, remote fonts, analytics, API keys or backend is required.

## Preview

Serve this folder with a static web server, for example:

```sh
python3 -m http.server 8087 --bind 127.0.0.1
```

Open `http://127.0.0.1:8087/`. The local preview was started during delivery. Use a server rather than opening the HTML as a file for consistent video and download behavior.

- `index.html`: full landing page, semantic content and FAQs.
- `styles.css`: responsive visual system and motion preferences.
- `site.js`: compact navigation, decorative film playback handling and optional registration state.
- `event-config.js`: registration URL switch.
- `design-guide.html`: visual reference for colors, typography, voice and interactions.
- `RESEARCH-AND-DESIGN.md`: desk research, references, decision rationale, known facts and open questions.
- `devin-hacks-kochi.ics`: date-only, tentative reminder for October 24, 2026. It does not imply an all-day competition or invent start/end times.
- `assets/`: self-hosted fonts, desktop/portrait videos, posters and the official Devin product mark and the custom Devin Hacks event identity.

## Event content

The hero now reads “100 builders. Twelve hours.” as requested by the organizer; the format remains solo.

Confirmed: Devin Hacks Kochi; October 24; 12 hours; solo participation; Kochi with venue TBC; each top-five winner receives a Devin Max plan worth $200. The year 2026 is an explicit draft assumption based on the current year. Confirm it before public launch. Plan duration and redemption terms remain pending.

The event facts are rendered in `index.html` so readers do not need JavaScript to find them. When updating the date, search this HTML, the calendar file and this documentation for `2026` and `October`. Update the calendar start date and exclusive next-day end date together. Update repeated facts consistently in hero, essentials, FAQ, footer and metadata.

## Registration and prizes

Registration is open at https://luma.com/3v8n74l1. All seven registration actions are real HTML links, so they work without JavaScript. Keep `event-config.js` and the links in `index.html` synchronized when changing the destination. The script accepts HTTPS overrides and otherwise leaves the confirmed HTML links intact. The calendar remains a separate, date-only download.

The grand prize is a PlayStation 5 for one winning builder. Its dedicated section sits immediately before the existing top-five Devin Max rewards. The artwork extends the miniature Kochi theme with a console and controller on a brick-red waterfront plinth, cream surroundings, palms and a Chinese fishing net. The headline, prize details and CTA are accessible HTML, not embedded in the image.

`assets/ps5-kochi-prize.webp` (1254px, 109 KB) and its 640px variant (36 KB) are lazy-loaded responsive WebP assets. Both derive from original artwork generated with the built-in image-generation tool using the organizer’s supplied prize poster and the existing city poster as references. The generation brief is recorded in `PRIZE-ARTWORK.md`.

The top five winners still each receive a Devin Max plan worth $200. Plan duration and redemption terms remain pending.

## Animation and performance

The desktop or portrait file is selected once when loading based on viewport width and orientation. HEVC is selected only when the browser reports supported, smooth, power-efficient decoding; otherwise H.264 is used. Normally only one movie is requested; an HEVC decoding error can trigger one H.264 fallback request. The video is silent, inline, plays once and holds its last frame. It pauses when offscreen or the page is hidden. User-paused playback stays paused. A poster remains usable when playback is blocked or fails.

Reduced-motion and data-saver preferences prevent initial autoplay/loading. These visitors see the static city poster. Escape pauses decorative playback. There are no visible pause or replay controls, as requested. CSS reveals and smooth scrolling also respect reduced motion. Secondary images are WebP and lazy loaded. Space Grotesk is self-hosted under its included SIL Open Font License.

## Hosting

Upload this directory to any static host. Use HTTPS, correct MIME types (`video/mp4`, `text/calendar`, `font/ttf`) and support byte-range requests for video. The current media and playback-script URLs include a version query to refresh older browser caches. Bump this version whenever replacing the film; avoid long immutable caching for unversioned filenames. The film fills the viewport with `object-fit: cover`; responsive framing can crop its edges. Portrait devices up to 900 px select the portrait film. The central city remains clear, while concise hero copy sits over a soft edge fade. Desktop uses two small corner navigation anchors. Phones use one compact, aligned paper navbar with the menu opening below it; neither uses backdrop blur. Desktop and portrait video files use the updated Kochi refinement.

Cache HTML and configuration conservatively so registration updates appear promptly. A public deployment has not been created.

## Credits and scope

Map data © OpenStreetMap contributors: https://www.openstreetmap.org/copyright

The movie and posters are the approved assets from the companion `devin-hacks-kochi` animation package, which contains the Blender source and detailed reference list. Logos visible in the city identify Kochi landmarks; they do not establish event sponsorship. No audio is played on the website.

Review `VERIFICATION.md` for the checks performed and their limits.

Devin mark: extracted from the navigation logo on https://devin.ai/ on 18 September 2026. Used to identify the announced product reward; it does not imply sponsorship.

## Event logo

The event identity is a chamfered red D with an H cut into its negative space, paired with outlined Space Grotesk lettering and a KOCHI signature. Navbar and footer use SVG lockups; the same monogram is used for SVG/ICO favicons, Apple touch icons and manifest icons. A transparent PNG and logo-preview.png are included for sharing. The official Devin product logo in the reward pass is separate and unchanged.

Use assets/devin-hacks-logo.svg on light backgrounds and assets/devin-hacks-logo-reversed.svg on dark backgrounds. Use assets/devin-hacks-mark.svg for square placements. Keep the master artwork’s proportions and clear space; do not squash the wordmark into a favicon.

## Video quality revision

The website’s earlier exports used stronger compression than the downloadable film. Both web exports now use H.264 CRF 19 (previously 24 desktop / 23 portrait); the portrait render is increased from 720 × 1280 to 1080 × 1920. Desktop stays at the master’s 1920 × 1080. Frame rate remains 24 fps and duration 14 seconds. Higher quality increases transfer size. The H.264 files are about 14.8 MB each; the high-quality HEVC alternatives are about 9.9 MB each, roughly a third smaller. Only the selected variant is loaded during normal playback. The page keeps native decoding, fast-start metadata, a poster, idle-time startup, offscreen/hidden-page pausing and reduced-motion/data-saver fallbacks. No JavaScript frame renderer or scroll-linked video seeking is added.

The browser decoding assessment is a prediction, not a guarantee across devices. See [MediaCapabilities documentation](https://developer.mozilla.org/en-US/docs/Web/API/MediaCapabilities/decodingInfo). In the preceding HD revision, all 336 desktop frames were compared with the rendered reference: SSIM increased from 0.985539 for the prior CRF-24 settings to 0.990507 for HEVC and 0.991667 for H.264. This measures compression fidelity, not a subjective quality score. The companion film package includes quality-qa.json. Physical phone and constrained-network testing remain outside this local validation.

The current film includes a further optical A–C spacing correction in HACKS, reviewed from both camera angles. The scene, desktop/portrait movies and posters were replaced together; media URLs now use ac2 to avoid showing the previous cached title. Encoding settings are unchanged.
