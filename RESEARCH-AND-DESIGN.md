# Devin Hacks Kochi — UI/UX revamp

18 September 2026. Competitive desk research, interface critique, design development and browser QA. No participant interviews or conversion experiment were conducted, so improvement claims are design judgments rather than measured conversion results.

## Direction before implementation

**Visual thesis:** An immersive full-screen Kochi city that continues below the fold through miniature architecture, park greens, red roofs, printed passes and glass-blue surfaces.

**Content plan:** Visible event identity and essential facts → Kochi city film → solo format and logistics → publicly announced Devin Max rewards → practical FAQs → calendar reminder.

**Interaction thesis:** Preserve the city assembly; use a brief heading entrance and restrained scroll reveals; reinforce links and FAQ disclosures with small transitions. Respect reduced motion and avoid scrolling tricks.

## Why the earlier layout needed revision

The film already includes large event lettering, buildings and company marks. An intermediate redesign separated the text into a large masthead and contained the film in a cinema frame. The user preferred the earlier full-screen experience. The final design restores edge-to-edge, full-viewport video with `object-fit: cover`, keeping the central city clear and limiting copy to the upper and lower edges. A soft fade supports the lower headline and action; two small desktop corner anchors leave the upper map clear; the later mobile revision combines the logo and menu into one compact bar. The expanded menu appears only on request. The source video files now include the later authorized Kochi authenticity refinement; responsive framing can crop the edges. Portrait devices up to 900 px use the approved portrait film.

The company architecture section did not help attendees decide to join. It has been removed. The previously disclosed first-place reward and related product images have been removed from the website; the film retains its subtle Easter eggs, with the later Kochi refinement incorporated. Public rewards now focus on the confirmed top-five Devin Max plans.

The previous page repeated its invitation across several sections. The revised architecture has four decisions: understand the commitment, see the announced reward, resolve practical questions, and save the date.

## Research and applied decisions

- **NN/g, text scanning research:** Readers often scan headings and distinct chunks. Applied: literal navigation labels, shorter sections, a definition list for event facts, direct FAQ questions and one dominant idea per section. [Source](https://www.nngroup.com/articles/text-scanning-patterns-eyetracking/)
- **NN/g, visual hierarchy:** Size, contrast and placement guide the order of attention. Applied: persistent event branding, a semantic event-name H1, visible date and format, and the dominant city film. [Source](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)
- **Hack the North:** The illustrated event world and explicit date/location build a recognizable identity. Applied: retain the original Kochi visual identity while simplifying everything around it. Its policies and illustrations are not copied. [Reference](https://hackthenorth.com/)
- **ETHGlobal event pages:** Practical event information and rewards are distinguishable. Applied: a separate, concise reward block and a scannable detail section. No event rules borrowed. [Reference](https://ethglobal.com/events/trifecta)
- **MLH organizer guide:** Prioritize event name, date and the next action. Applied: these remain visible before any video or JavaScript loads. [Source](https://github.com/MLH/mlh-hackathon-organizer-guide/blob/master/general-information/hackathon-website/main-website.md)
- **Motion control:** The user explicitly requested removal of visible pause/replay controls. The film plays once, pauses offscreen, supports Escape to stop, and uses a static poster for reduced motion or data saving. This is not a claim of full WCAG conformance. [Motion guidance](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)

## Themes considered

1. **Coastal editorial, previous version:** Warm and locally grounded, but green tones and imagery layers competed with the film.
2. **Neon terminal:** Rejected. It would add another strong visual language and make the daytime city feel disconnected.
3. **Event poster + cinema, intermediate direction:** Near-black, paper and red-orange connect to the film’s red lettering. The editorial treatment remains below the fold. Following user review, the contained cinema was replaced by the preferred immersive full-screen hero.

## Design language

- Park `#D0DCBC`, ink `#213A35`, red accent `#A82F22`, brick `#B83D2C`, printed cream `#EFD9AB`, warm stone `#EADDC4`, glass blue `#25494E`.
- Self-hosted Space Grotesk with system monospace labels. Large architectural typography, simple alignment and restrained rules.
- The format is one connected typographic composition: 01 builder, 12 hours, 24 October. Large red numerals echo the film’s built lettering, while logistics stay directly underneath. The earlier standalone illustration was removed following user review.
- The reward becomes a printed builder’s pass, with the official Devin mark next to MAX and a bounded width to prevent a stretched empty composition. Five numbered ranks and “$200 plan value / winner” distinguish the benefit from cash or a ticket price.
- Native FAQ disclosures sit on warm stone; the closing date has shallow extruded lettering over a glass-blue drafting grid.
- Keep the full-screen presentation and approved film style. Remove visible playback controls and the broad header background/blur. Two compact corner anchors provide desktop navigation; phones use one aligned navbar following user feedback.
- Movement stays restrained: the existing assembly film, section entrances, a small hover lift and clear disclosure/menu feedback.

## Iteration and review

The first implementation extended the film’s materials and colors through every section. Desktop and phone review then led to clearer prize-value copy, clean section-link alignment, removal of decorative numbers from accessible names, an outside-click menu dismissal and stronger small-text contrast. Final checks include narrow phones, portrait tablet and desktop, without claiming measured conversion improvement.

## Confirmed content and pending decisions

Confirmed: Devin Hacks Kochi; October 24; 12-hour solo format; Kochi with venue TBC; each of the top five winners receives a Devin Max plan worth $200 (organizer-supplied value). The video’s visual direction is approved; local details were subsequently refined with organizer authorization.

2026 remains an explicit working assumption from the current year and needs confirmation before public launch. Also pending: application URL, opening/closing dates, exact start time, venue/address, eligibility/age, fee, access and food arrangements, judging criteria, submission rules, tool policies, organizer contact, code of conduct and prize-plan duration/redemption terms.

## Usability hypotheses to validate with attendees

Visitors should be able to identify the date, solo format and 12-hour commitment within seconds; read event facts without relying on video playback; distinguish a $200 plan from a cash prize; and understand that registration is not yet open. Before launch, ask prospective attendees to perform these tasks without coaching. Browser QA checks layout and functionality, not these human outcomes.

## Section revision

User screenshots exposed excess whitespace in the reward pass and a disconnected image in the format section. Replaced the image with the actual event facts, responsive as three open columns or three compact rows. Used the official [Devin navigation mark](https://devin.ai/) as product identification in the reward pass. Reviewed desktop, wide desktop and 320 px phone; hero media was unchanged during that UI revision. A subsequent authorized film refinement adds Kochi details without changing the page layout.

## Identity and mobile navigation follow-up

The event logo is now an original geometric DH monogram with outlined stacked lettering, reused for the favicon and touch icons. It is distinct from the official Devin product logo in the reward pass. A single compact mobile navbar aligns the logo and menu, while desktop retains corner navigation. The expanded menu spans the bar’s width; a fixed-width button prevents label changes from shifting its separator. Mobile section anchors leave space for the fixed navbar.
