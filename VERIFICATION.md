# Website verification — 18 September 2026

## Current visual pass

- Reviewed full-screen hero and lower sections at desktop 1280 × 720, phone 390 × 844 and narrow phone 320 × 667. Checked tablet hero at 768 × 1024.
- No document horizontal overflow at tested sizes. Hero action fits the narrow phone viewport. The replacement Devin vector mark loads and is 1,434 bytes. The rejected standalone illustration is excluded from the current package.
- Desktop header background is transparent and backdrop-filter is none. Identity and Explore are small corner anchors; phones now use a unified paper navbar without backdrop blur. No visible pause or replay controls exist.
- Verified menu open/close, section navigation, outside-click dismissal and native FAQ expansion. Decorative indices are hidden from accessible names.
- Verified portrait video selection at tablet width and active autoplay. Escape changed active playback to paused. Offscreen playback handling was reviewed and exercised.
- Browser console returned no warnings or errors in the final check. Restored the normal viewport after responsive testing.
- Solid-surface text color pairs checked numerically: lowest selected body-text ratio is 4.65:1. These checks do not certify every video frame or constitute a full accessibility audit.

## Files and behavior

- JavaScript syntax check passed.
- HTML IDs are unique; internal anchors and local file references resolve for both landing page and design guide.
- Removed standalone company section and unrevealed prize copy remain absent. Only announced Devin Max rewards are described.
- Existing date-only tentative calendar has CRLF line endings and October 24, 2026 as its start date. The organizer has not yet confirmed the assumed year.
- Desktop and portrait video fingerprints are recorded in ui-verification.json; the assets were subsequently replaced with the authorized Kochi refinement.
- No remote fonts, image services, analytics or framework runtime are required.

## Limits and launch inputs

Browser QA used the Codex in-app browser with responsive viewport overrides, not physical devices or every browser engine. Reduced-motion/data-saver poster behavior was checked in implementation; no claim of a new OS-preference test is made in this pass. Registration remains unconfigured and no external registration service was tested. Organizer confirmation is still needed for year, venue, exact time, application URL, eligibility, fee, rules, contact and prize-plan terms. The site is a local preview, not a public deployment.

## Format and reward revision

Reviewed rebuilt format and reward pass at 1280 px desktop and 320 px phone, plus reward proportions at 1920 px wide desktop. No horizontal page overflow; official SVG loaded; new format action navigated to the calendar section; console returned no errors or warnings. Updated static reference and contrast checks pass. Animation files were unchanged during this UI revision; the later Kochi refinement is documented separately below.

## Kochi film refinement and hero headline

Replaced both films and posters with the authorized Kochi refinement. The companion animation package records full-sequence image checks, train/traffic/water/docking geometry checks and complete MP4 decode checks. Both silent hero videos have 336 frames at 24 fps, a 14-second duration and fast-start metadata. Updated SHA-256 fingerprints are in ui-verification.json.

Browser verification after replacement covered desktop 1280 × 720, phone 390 × 844 and narrow phone 320 × 667. Confirmed the visibly revised map, correct desktop/portrait source selection, active autoplay, end-of-film hold, readable “100 builders. Twelve hours.” copy and no horizontal overflow. No console warnings or errors were returned. Media and playback-script URL versioning was added after the browser initially retained the older movie. Temporary viewport overrides were reset. The headline count is organizer-requested copy; participation remains solo.

## Logo, typography and video quality revision

Custom outlined SVG identity installed in header/footer, with matching SVG/ICO favicon, touch and manifest icons. Checked mobile navigation at 390 px and 320 px, including expanded menu, anchor navigation, alignment and absence of horizontal overflow. The Blender AC and OC pairs were tightened and re-rendered in both compositions; all 672 frames were reviewed and checked for valid dimensions, unique frames and nonblank output. All five movie exports passed full decoding, duration, frame-count and fast-start checks.

The player behavior checks cover efficient-codec selection, single initial download, offscreen pause/resume, one-shot decode-error fallback and zero initial movie loads for reduced motion/data saver. Browser playback selected HEVC at both portrait and desktop dimensions. The portrait run recorded 1 dropped frame out of 336; a desktop run including scrolling recorded 5 out of 336. Offscreen pause and return-to-hero resume were observed. No browser console errors or warnings were returned. These are local desktop-browser observations with phone viewport emulation, not physical mobile-device or slow-network benchmarks.

## Date label and top scroll boundary

OCT now scales at 0.22em with the architectural date and uses semibold weight. Checked at desktop 1280px (33.792px label) and narrow mobile 320px (17.38px label), with no horizontal overflow. Root and body disable vertical overscroll; the root canvas uses the sea color as fallback. After scrolling beyond the top in the local browser, hero top and scrollY remained zero, with no exposed strip. Stylesheet version advanced to dh3. Native physical-device elastic scrolling has not been separately tested.

## Optical A–C title correction

Increased the A–C optical kerning and recentered DEVIN HACKS. Verified aligned glyph pieces and zero adjacent surface intersections, then rerendered both 336-frame sequences at their existing HD resolutions. All frames were reviewed in chronological sheets and checked for valid decoding and nonblank output. Both codec variants and the downloadable film passed full MP4 decoding checks. Cache version ac2 replaces the earlier hero movies and posters. The separate KOCHI tribute is unaffected.

Browser follow-up confirmed the ac2 desktop HEVC source at 1920 × 1080, successful end-of-film playback and the tighter A–C spacing in the displayed frame.


### Arcade footer
A lightweight canvas animation moves a Pac-Man-style character across a row of pellets. It pauses offscreen and in background tabs, respects reduced-motion preferences, and can be stopped with Escape. Desktop (1280px) and mobile (390px) browser checks confirmed movement, disappearing pellets, aligned credits, and no mobile horizontal overflow. JavaScript syntax and local asset/anchor checks passed.

Arcade palette revision: bright yellow character without an eye, near-black background with sparse stars, and no divider rules. Mobile visual check and JavaScript syntax check passed; no browser console errors. Hero playback code unchanged following confirmation that Low Power Mode caused the reported poster-only state.

Pixel arcade revision: 16×16 Pac-Man and four ghost sprites, blue maze walls, score/level display, and brighter stars. Animated sprites share a clear corridor; loop resets after the trailing ghost exits. Desktop and 390px mobile visual checks passed, with no horizontal overflow or console errors. Reduced-motion and offscreen pause behavior retained.

Chase revision: unequal ghost spacing and individual pacing; cyan follows a lower corridor through a wall opening. One glowing power pellet is consumed on contact. Lives display retained. Desktop and mobile visual checks completed; JavaScript syntax verified.
