# Professional Website Entrance Animation — UX / Motion Specification

## Project Goal

Replace the current minimal preloader (a small floating tooth on an almost-empty white screen) with a premium, modern entrance experience.

The animation should communicate:

- Dental / clinical identity
- Premium technology
- Trust and professionalism
- A polished personal-brand experience suitable for a portfolio and LinkedIn traffic
- Fast perceived loading without making the visitor wait unnecessarily

The current visual reference shows:
- An off-white / white background
- A small 3D tooth centered on screen
- Purple UI elements on the right side
- A simple loading state

The new animation must keep the existing website identity rather than introducing unrelated colors.

---

# 1. Design Direction

## Recommended Concept: "Precision Reveal"

Create a short cinematic loading sequence where the 3D tooth becomes the visual centerpiece and then transforms into the entrance of the actual website.

The feeling should be:

**Clean → Clinical → Precise → Premium → Reveal**

Avoid:
- Generic spinning loaders
- Large percentage counters
- Excessive particles
- Flashy neon effects
- Cartoon-like dental graphics
- Long loading screens
- Too many simultaneous animations

The animation should feel closer to a premium medical-tech brand than a template website.

---

# 2. Color System

Use the existing website purple as the primary accent.

### Primary Accent
Purple / violet:
`#6C2BFF`

### Deep Purple
`#4B16C9`

### Background
Use a warm/off-white similar to the current screen:
`#FAF9F6`

### Surface
`#FFFFFF`

### Text
Primary:
`#17151F`

Secondary:
`#77727F`

IMPORTANT:
Do not introduce a completely new brand palette.

If the existing website already has CSS variables for its purple, background, or text colors, reuse those variables instead of hardcoding these values.

---

# 3. Animation Duration

Target total duration:

**2.4–3.0 seconds maximum**

The animation must not artificially delay the website.

If the website is ready before the animation finishes:
- complete the animation immediately
- transition into the homepage

If loading genuinely takes longer:
- keep the animation in a subtle breathing/idle state
- do not restart the animation
- do not make the user stare at a static screen

---

# 4. Exact 0–3 Second Timeline

## 0.00–0.20s — Initial State

Full viewport preloader.

Background:
`#FAF9F6`

Everything starts almost invisible.

The 3D tooth is centered but should be noticeably larger than the current implementation.

Recommended visual size:
- Desktop: approximately 150–190px tall
- Tablet: approximately 120–160px
- Mobile: approximately 100–130px

Do not make the tooth enormous.

Initial state:
- opacity: 0
- scale: 0.82
- slight vertical offset: +18px
- rotation: subtle, approximately 8 degrees

---

## 0.20–0.65s — Tooth Entrance

Animate the tooth into the center.

Properties:

- opacity: `0 → 1`
- scale: `0.82 → 1`
- y: `18px → 0`
- rotation: `8deg → 0deg`

Use a premium easing curve:

`cubic-bezier(0.22, 1, 0.36, 1)`

This should feel smooth and expensive, not bouncy.

Add a very subtle purple ambient glow behind the tooth.

The glow should remain soft and restrained.

---

# 5. 0.55–1.15s — Brand / System Identification

While the tooth is settling, reveal the brand text below it.

Recommended structure:

Small eyebrow:

**PRECISION • CARE • TECHNOLOGY**

Then the main brand/name:

**[YOUR BRAND / CLINIC NAME]**

If this is a personal portfolio rather than a clinic website, use the user's professional name/brand instead.

Text animation:
- opacity: `0 → 1`
- y: `10px → 0`
- blur: `6px → 0`

Do NOT use typewriter animation.

The text should appear as a clean cinematic reveal.

---

# 6. 0.85–1.55s — Purple Precision Ring

Introduce a thin purple circular ring around the tooth.

The ring should:

1. Start at approximately 70% scale
2. Expand to 100%
3. Rotate approximately 90–140 degrees
4. Fade from 0.0 to a restrained opacity

The ring represents:
- precision
- technology
- clinical accuracy

Keep the stroke thin.

Do not create a heavy glowing circle.

Optional:
Add 2–3 very small orbiting points around the ring, but only if the result remains elegant.

---

# 7. 1.20–1.90s — Loading Indicator

Replace a generic spinner with a premium progress indicator.

Recommended design:

A very thin horizontal progress line below the text.

Example:

`━━━━━━━━━━━━━━━━`

The line should fill from:

`0% → 100%`

Use the purple accent.

Under it, use very small supporting text:

**Preparing your experience**

Alternative:

**Loading experience**

Avoid showing:
`Loading... 37%`

Avoid large numerical percentages.

The loading indicator should feel like part of the brand, not a technical browser loader.

---

# 8. 1.70–2.20s — Transition Preparation

When the website is ready:

- Stop the progress line at 100%
- Reduce the tooth glow
- Slightly scale the tooth from `1 → 1.04`
- Fade the supporting text
- Increase the purple ring slightly

Then prepare the split transition.

---

# 9. 2.20–2.75s — Premium Split Reveal

Use a sophisticated two-panel reveal.

The preloader background divides vertically into:

LEFT PANEL
RIGHT PANEL

Both panels move outward from the center.

Recommended movement:

Left:
`x: 0 → -100%`

Right:
`x: 0 → +100%`

Duration:
approximately `0.55s`

Easing:

`cubic-bezier(0.76, 0, 0.24, 1)`

This creates a cinematic reveal into the actual website.

IMPORTANT:

The homepage should already be rendered underneath the preloader.

The split panels are only an overlay.

Do not navigate to a new page during this animation.

---

# 10. Final Reveal — 2.65–3.00s

The real homepage becomes fully visible.

At the same time:

### Hero
- opacity: `0 → 1`
- y: `20px → 0`

### Navbar
- opacity: `0 → 1`
- y: `-10px → 0`

### Hero visual/video
- scale: `1.04 → 1`
- opacity: `0 → 1`

Use staggered timing.

Do not animate every element individually.

Only animate the major visual hierarchy.

---

# 11. Recommended Visual Composition

During loading, use this hierarchy:

```text
                 subtle ambient glow

                       ◯
                    3D TOOTH

               PRECISION • CARE • TECHNOLOGY

                    YOUR BRAND

              ━━━━━━━━━━━━━━━━━
               Preparing your
                  experience
```

Everything should remain centered.

Large negative space is intentional.

---

# 12. 3D Tooth Requirements

The current tooth is visually too small.

Increase its visual presence while keeping it elegant.

Recommended:

- Desktop: 150–190px
- Mobile: 100–130px

The tooth should have:
- realistic smooth material
- subtle studio lighting
- soft shadows
- gentle rotation
- no aggressive reflections
- no cartoon appearance

If a GLB/GLTF model already exists, reuse it.

Do NOT replace a good existing 3D asset unless necessary.

The model should slowly rotate only a few degrees.

Avoid continuous fast spinning.

Recommended idle motion:

`rotationY: -3deg → 3deg → -3deg`

Duration:
`2.4–3.2s`

Use ease-in-out.

---

# 13. Technical Implementation

Recommended stack:

- React
- CSS / Tailwind
- Framer Motion OR GSAP
- Existing Three.js / React Three Fiber model if already used

Choose ONE animation engine for the preloader.

Do not mix GSAP and Framer Motion unnecessarily.

If the existing project already uses Framer Motion, prefer Framer Motion.

If it already uses GSAP for global page transitions, prefer GSAP.

---

# 14. Component Architecture

Create a dedicated component:

```text
components/
└── entrance/
    ├── EntranceLoader.jsx
    ├── EntranceLoader.css
    └── useEntranceLoader.js
```

If using TypeScript:

```text
components/
└── entrance/
    ├── EntranceLoader.tsx
    ├── EntranceLoader.module.css
    └── useEntranceLoader.ts
```

The component should expose:

```js
<EntranceLoader
  isReady={isPageReady}
  onComplete={handleEntranceComplete}
/>
```

---

# 15. Loading Logic

Do NOT use a fake fixed timeout as the only condition.

Use:

```text
Page starts
    ↓
Show entrance loader
    ↓
Begin loading assets/data
    ↓
Track readiness
    ↓
Page becomes ready?
    ├── NO → subtle idle state
    └── YES
          ↓
Complete progress
          ↓
Split reveal
          ↓
Remove loader
```

The loader should respond to actual page readiness.

If assets are cached and the page loads quickly, the animation should also complete quickly.

---

# 16. Performance Requirements

The entrance animation is the first thing a visitor sees.

Therefore:

- Avoid blocking the main thread
- Avoid huge textures
- Avoid unnecessary JavaScript
- Use GPU-friendly transforms
- Animate `transform` and `opacity`
- Avoid animating layout properties such as width/height/top/left where possible
- Lazy-load non-critical 3D assets when appropriate
- Respect reduced-motion preferences

Use:

```css
@media (prefers-reduced-motion: reduce) {
  /* disable cinematic movement */
}
```

For reduced motion:
- fade in the brand
- show the homepage quickly
- remove large movement

---

# 17. Mobile Behavior

On mobile:

- Reduce tooth size
- Reduce ring size
- Keep text readable
- Keep the loading indicator short
- Never let the animation occupy unnecessary vertical space
- Preserve the same visual identity

Do not simply scale the desktop animation down mechanically.

Design a mobile-specific composition.

---

# 18. Accessibility

The preloader must not prevent keyboard users from interacting with the page longer than necessary.

Recommended:

```html
<div
  role="status"
  aria-label="Preparing website"
>
```

Do not rely only on animation to communicate loading.

Respect:

```css
prefers-reduced-motion
```

---

# 19. UX Rules

The visitor should understand within approximately one second:

**"This is a professional, premium website."**

They should NOT think:

- Is the website broken?
- Is this still loading?
- Why is the animation taking so long?
- Why is there a random spinning tooth?

The animation is a brand introduction, not a loading obstacle.

---

# 20. What to Remove From the Current Version

Remove:

- Tiny isolated tooth
- Empty white screen
- Generic loading appearance
- Excessive unused space
- Long static waiting period
- Generic spinner
- Random animation without brand meaning

Keep:

- 3D tooth
- Clean clinical background
- Existing purple brand direction

---

# 21. Final UX Sequence

The complete experience should feel like:

```text
EMPTY / INVISIBLE
        ↓
3D TOOTH EMERGES
        ↓
BRAND TEXT REVEALS
        ↓
PURPLE PRECISION RING
        ↓
PROGRESS LINE
        ↓
PAGE READY
        ↓
CINEMATIC CENTER SPLIT
        ↓
HOMEPAGE REVEAL
```

Target emotional impression:

**"Premium medical technology with precision and confidence."**

---

# 22. Anti-Gravity / AI Coding Agent Instruction

When implementing this specification:

1. First inspect the existing project structure.
2. Identify the current preloader / entrance animation component.
3. Identify the existing 3D tooth asset and its model-loading implementation.
4. Identify the current website color variables.
5. Reuse the existing purple instead of inventing a new primary color.
6. Inspect whether Framer Motion, GSAP, React Three Fiber, or another animation system is already installed.
7. Do not introduce another animation library unless necessary.
8. Preserve existing routing and page functionality.
9. Render the homepage underneath the entrance overlay.
10. Make the preloader an overlay rather than a separate page.
11. Implement the exact timeline described in this document.
12. Ensure the animation ends automatically when the page is ready.
13. Add a maximum safety timeout so the user can never become trapped on the loader.
14. Test desktop and mobile.
15. Test refresh, slow loading, cached loading, and fast loading.
16. Test reduced-motion mode.
17. Remove unused old preloader code after verifying the replacement.
18. Do not change unrelated sections of the website.
19. Do not redesign the navbar, hero, services, or other sections unless required for the entrance reveal.
20. Keep the final implementation production-ready and clean.

---

# 23. Quality Standard

Before considering the task complete, verify:

### Visual
- [ ] Tooth is clearly larger than the current version
- [ ] Tooth remains realistic
- [ ] Purple accent matches the website
- [ ] Background matches the website
- [ ] Text is elegant and readable
- [ ] Ring is subtle
- [ ] Loading indicator is premium
- [ ] Split reveal is smooth
- [ ] Homepage transition feels seamless

### UX
- [ ] No unnecessary waiting
- [ ] No flashing
- [ ] No layout jump
- [ ] No broken 3D model
- [ ] No visible loader after page readiness
- [ ] Refresh works correctly

### Technical
- [ ] No console errors
- [ ] No memory leaks
- [ ] No duplicate animation triggers
- [ ] No unnecessary dependencies
- [ ] Reduced-motion supported
- [ ] Mobile tested
- [ ] Slow network tested

---

# 24. Design Philosophy

The goal is NOT to make the loader "more animated."

The goal is to make the first 3 seconds feel like a deliberate part of the brand.

Use:

**Less decoration + stronger hierarchy + better timing + better transition.**

The visitor should remember the feeling of entering the website, not the mechanics of the loader.

## Final Direction

Build the entrance as a **premium medical-tech brand reveal** centered around the existing 3D tooth and purple visual identity.

It should feel:

**Minimal. Intelligent. Clinical. Cinematic. Premium. Fast.**
