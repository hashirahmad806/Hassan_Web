---
name: Aura Medical Aesthetic
colors:
  surface: '#fff8f3'
  surface-dim: '#dfd9d4'
  surface-bright: '#fff8f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f9f2ed'
  surface-container: '#f3ede8'
  surface-container-high: '#ede7e2'
  surface-container-highest: '#e8e1dd'
  on-surface: '#1d1b18'
  on-surface-variant: '#4d463c'
  inverse-surface: '#33302d'
  inverse-on-surface: '#f6f0eb'
  outline: '#7e766b'
  outline-variant: '#cfc5b8'
  surface-tint: '#6e5c3c'
  primary: '#6e5c3c'
  on-primary: '#ffffff'
  primary-container: '#d0b892'
  on-primary-container: '#59482a'
  inverse-primary: '#dcc39c'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e5e2e1'
  on-secondary-container: '#656464'
  tertiary: '#5e5e5d'
  on-tertiary: '#ffffff'
  tertiary-container: '#bbbbb9'
  on-tertiary-container: '#4a4b4a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f9dfb7'
  primary-fixed-dim: '#dcc39c'
  on-primary-fixed: '#261902'
  on-primary-fixed-variant: '#554427'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474646'
  tertiary-fixed: '#e3e2e0'
  tertiary-fixed-dim: '#c7c6c5'
  on-tertiary-fixed: '#1a1c1b'
  on-tertiary-fixed-variant: '#464746'
  background: '#fff8f3'
  on-background: '#1d1b18'
  surface-variant: '#e8e1dd'
  ivory-bg: '#FCFAF7'
  charcoal-text: '#1A1A1A'
  gold-accent: '#D0B892'
  muted-silver: '#868686'
  soft-blue-gray: '#E2E9F2'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '600'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 56px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  button:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  section-padding-desktop: 120px
  section-padding-mobile: 64px
---

## Brand & Style
The design system embodies a fusion of clinical excellence and high-end editorial luxury. It is designed to evoke a sense of "approachable prestige"—where patients feel they are entering a sanctuary of expertise rather than a sterile medical environment. 

The aesthetic leverages **Modern Minimalism** with **Glassmorphism** accents. It prioritizes vast negative space to communicate clarity and calm, while utilizing tactile depth to guide the user's focus toward premium outcomes. The visual narrative balances the precision of dental surgery with the softness of aesthetic skin care, ensuring the interface feels as refined as the treatments offered by Dr. Hassan Salman.

## Colors
The palette is rooted in an **Ivory-on-Charcoal** foundation, moving away from harsh pure whites to create a warmer, more inviting "clinic-to-spa" transition. 

- **Primary (Gold Accent):** Reserved strictly for primary calls to action, high-level accolades, and subtle ornamental strokes. It should feel like jewelry against the ivory backdrop.
- **Backgrounds:** Use the ivory/soft-white for main surfaces. Use the soft blue-gray for secondary section backgrounds to denote a shift in content type (e.g., from cosmetic to restorative services).
- **Text:** Deep charcoal provides high legibility and a sense of gravity and authority. Avoid pure black for body text to maintain the "soft" brand character.

## Typography
The typography strategy relies on the contrast between the **traditional elegance** of Playfair Display and the **modern functionality** of Inter.

- **Headlines:** Use Playfair Display for all major headings. Tighten the letter-spacing on larger sizes to maintain an editorial look.
- **Body:** Use Inter for all functional text. The generous line height (1.5x - 1.6x) is critical to maintaining the "airy" luxury feel.
- **Labels:** Small caps with increased tracking (letter spacing) should be used for category labels and pre-headers (e.g., "ORAL REHABILITATION") to inject a sophisticated, systematic feel.

## Layout & Spacing
The layout follows a **Fixed Grid** model on desktop to maintain white space "gutters" that act as visual breathing room. 

- **Vertical Rhythm:** Sections are separated by large gaps (120px+) to prevent the user from feeling rushed. 
- **The Golden Ratio:** Use asymmetric layouts where imagery occupies 60% of the width and text occupies 40% to mimic high-end fashion magazine spreads.
- **Mobile:** Transition to a single-column fluid layout with 24px side margins. Ensure headline sizes scale down significantly to prevent awkward word breaks in the serif typeface.

## Elevation & Depth
Depth is communicated through **Glassmorphism** and **Ambient Shadows** rather than stark borders.

- **Surfaces:** Main cards use a white background with a very soft, diffused shadow (Blur: 30px, Opacity: 4%, Color: Charcoal).
- **Glass Effects:** Navigation bars and floating appointment buttons should use a backdrop blur (20px) with a semi-transparent ivory fill (85% opacity). This maintains a sense of lightness and transparency.
- **Depth Tiers:**
  - *Tier 1 (Base):* Ivory background.
  - *Tier 2 (Cards):* White surface + Soft Shadow.
  - *Tier 3 (Overlays/Modals):* Glassmorphic blur + 1px subtle gold or white border.

## Shapes
The shape language is **Softly Organic**. 

- **Cards & Buttons:** Use a 0.5rem (8px) radius as the standard. This creates a modern look that is approachable but remains "sharp" enough to feel professional and medical.
- **Images:** Clinical photography and "Before & After" shots should use slightly larger rounding (1rem) or even circular frames for portraits to humanize the medical data.
- **Icons:** Use thin-stroke (1.5px) humanist icons with slightly rounded terminals to match the Inter typeface.

## Components
- **Buttons:**
  - *Primary:* Solid Gold background with white or charcoal text. High-contrast, rectangular with 8px rounding.
  - *Secondary:* Ghost style with a 1px Gold or Charcoal border.
- **Cards:** White containers with the defined "Tier 2" ambient shadow. Padding should be generous (min 32px) to ensure content doesn't feel cramped.
- **Inputs:** Clean bottom-border only or soft-filled ivory fields. Avoid heavy boxes. Focus states should be indicated by a gold underline.
- **Chips/Badges:** Small, all-caps text on a soft-blue-gray or light-gold background to categorize services (e.g., "COSMETIC", "SURGICAL").
- **Treatment Timeline:** A bespoke component using thin gold vertical lines and soft-glow dots to guide patients through the "Journey of Care."
- **Glass Appointment Bar:** A persistent, floating bar at the bottom of the mobile screen using backdrop-blur to keep the "Book Now" action always accessible without blocking the view.