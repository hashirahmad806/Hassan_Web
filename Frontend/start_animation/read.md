# ANTIGRAVITY MASTER PROMPT
## Premium Dental Clinic Entrance Animation Implementation

You are a senior frontend engineer, creative developer, motion designer, and
Three.js / React Three Fiber specialist.

Your task is to implement the premium entrance animation described in the
provided Markdown specification.

IMPORTANT:
DO NOT start coding immediately.

First READ the complete Markdown file:

ANTIGRAVITY_3D_TOOTH_INTEGRATION.md

Treat that Markdown file as the primary technical specification for the
animation and 3D implementation.

Then inspect the existing project before making ANY changes.

============================================================
1. UNDERSTAND THE EXISTING WEBSITE FIRST
============================================================

Inspect the complete project structure.

Identify:

- Framework
- React/Vite/Next.js
- JavaScript or TypeScript
- Tailwind CSS
- Existing animation libraries
- Existing components
- Existing Home page
- Existing Hero section
- Existing Navbar
- Existing Footer
- Existing global styles
- Existing 3D implementation, if any
- Existing assets
- Existing logo
- Existing background
- Existing dental imagery
- Existing GLB/3D assets

Open and understand the actual Hero implementation.

IMPORTANT:

The existing website is the source of truth for the design.

Do NOT replace the existing website with a new design.

Do NOT rebuild the Home page.

Do NOT delete existing sections.

Do NOT change unrelated functionality.

============================================================
2. READ THE MARKDOWN SPECIFICATION
============================================================

Before implementation, completely read:

ANTIGRAVITY_3D_TOOTH_INTEGRATION.md

Extract from it:

- 0–3 second animation timeline
- Preloader behavior
- Loading indicator
- Fade-in behavior
- Fade-out behavior
- Left/right split transition
- Hero reveal
- 3D tooth entrance
- Mouse rotation
- Zoom
- Touch interaction
- Lighting
- Responsive requirements
- Performance requirements
- Accessibility requirements
- Reduced-motion behavior
- Final acceptance criteria

The Markdown specification must guide the implementation.

Do not ignore its timing or interaction requirements.

============================================================
3. CORE EXPERIENCE
============================================================

The final experience should feel like a premium modern dental clinic.

The opening sequence should be:

PAGE LOAD
    ↓
PRELOADER
    ↓
FADE IN
    ↓
TOOTH / BRAND VISUAL
    ↓
LOADING INDICATOR
    ↓
LOADING COMPLETES
    ↓
CENTER VISUAL FADES OUT
    ↓
LEFT / RIGHT SPLIT
    ↓
HERO REVEAL
    ↓
3D TOOTH ENTERS
    ↓
HERO CONTENT REVEALS
    ↓
3D TOOTH BECOMES INTERACTIVE
    ↓
NORMAL WEBSITE

The result must feel cinematic but subtle.

Do NOT make it flashy.

Do NOT make it look like a gaming website.

Do NOT use excessive effects.

============================================================
4. EXACT TIMELINE
============================================================

Implement approximately this exact timeline:

0.00s
Background starts fading in.

0.00–0.35s
Preloader background:
opacity 0 → 1

0.25–0.90s
Tooth/logo visual enters:

opacity:
0 → 1

scale:
0.92 → 1

y:
12px → 0

Use premium easing:

cubic-bezier(0.22, 1, 0.36, 1)

0.45–1.35s
Loading indicator animates.

Progress:

0% → 100%

Use smooth easeInOut.

1.20–1.70s
Loading reaches completion.

1.65–2.10s
Center tooth/logo exits:

opacity:
1 → 0

scale:
1 → 0.97

y:
0 → -8px

Use:

cubic-bezier(0.4, 0, 1, 1)

1.90–2.70s
Begin split reveal.

LEFT PANEL:

x: 0 → -100%

RIGHT PANEL:

x: 0 → 100%

Use:

cubic-bezier(0.76, 0, 0.24, 1)

2.25–3.00s
Hero content reveals.

Order:

1. Eyebrow
2. Heading
3. Description
4. CTA

Use subtle stagger.

2.30–3.00s
Actual 3D tooth enters Hero:

opacity:
0 → 1

scale:
0.96 → 1

x:
20px → 0

Use:

cubic-bezier(0.22, 1, 0.36, 1)

2.80–3.20s
Interaction hint fades in:

"Drag to rotate · Scroll to zoom"

3.00s+
Preloader is completely removed.

The normal website is now interactive.

============================================================
5. PRELOADER DESIGN
============================================================

Create a dedicated reusable preloader component.

Suggested:

src/components/PagePreloader.jsx

But first adapt to the existing project architecture.

The preloader should contain:

- Background
- Center visual
- Loading text
- Progress indicator
- Left transition panel
- Right transition panel

The preloader should appear above the existing Hero.

The Hero must already exist underneath.

Do NOT create a duplicate Hero.

============================================================
6. LOADING INDICATOR
============================================================

Do NOT use a generic large circular spinner.

Use a premium horizontal progress indicator.

Concept:

              TOOTH

             Loading

        ━━━━━━━━━━━━━

The progress should smoothly animate from:

0 → 100%

The loading indicator should be minimal.

It should match the existing dental site's visual identity.

============================================================
7. LEFT / RIGHT SPLIT
============================================================

This is the signature transition.

Create two full-screen transition panels.

Initial state:

+----------------------+----------------------+
|                      |                      |
|                      |                      |
|       LEFT           |         RIGHT        |
|       PANEL          |         PANEL        |
|                      |                      |
|                      |                      |
+----------------------+----------------------+

Then animate:

LEFT → -100% X

RIGHT → +100% X

The existing Hero is revealed underneath.

Use:

cubic-bezier(0.76, 0, 0.24, 1)

Duration:

approximately 800ms.

The transition should feel:

- Smooth
- Cinematic
- Elegant
- Expensive
- Professional

============================================================
8. HERO REVEAL
============================================================

Do not replace the existing Hero.

Animate the existing elements.

Eyebrow:

opacity 0 → 1
y 20px → 0

Heading:

opacity 0 → 1
y 30px → 0

Description:

opacity 0 → 1
y 20px → 0

CTA:

opacity 0 → 1
y 20px → 0
scale 0.98 → 1

Use approximately:

cubic-bezier(0.22, 1, 0.36, 1)

Use subtle stagger.

Do not make the text fly dramatically across the screen.

============================================================
9. 3D TOOTH
============================================================

Use the provided:

molar_tooth_3d.glb

Expected location:

public/models/molar_tooth_3d.glb

Load it using:

useGLTF()

Do not load it twice.

Use React Three Fiber.

Use Drei where appropriate.

The 3D tooth should be positioned naturally inside the existing Hero.

Adjust:

- Scale
- Position
- Camera
- Lighting

based on the actual model and the existing Hero layout.

Do not blindly use fixed values if they do not fit the existing design.

============================================================
10. 3D INTERACTION
============================================================

After the entrance animation finishes:

Mouse drag:
→ Rotate

Mouse wheel:
→ Zoom

Touch drag:
→ Rotate

Touch pinch:
→ Zoom where supported

Disable panning.

Use OrbitControls.

Preferred:

enablePan:
false

enableZoom:
true

enableDamping:
true

dampingFactor:
0.05

autoRotate:
false

Do NOT continuously spin the tooth.

The visitor should control the model.

============================================================
11. PROFESSIONAL LIGHTING
============================================================

Use studio-style lighting.

Prefer:

Environment preset="studio"

Add directional lights only when needed.

The tooth should look like:

clean white dental enamel
+
soft reflections
+
subtle highlights
+
professional studio illumination

Avoid:

- Chrome
- Plastic
- Neon
- Strong colored lights
- Excessive bloom
- Gaming-style lighting

============================================================
12. BACKGROUND
============================================================

Inspect the existing website background first.

If a provided background asset exists, use it appropriately.

Do not automatically replace the existing Hero background.

The preloader should visually belong to the same brand.

The transition should feel like one continuous scene.

Avoid:

- Random gradients
- Random colors
- Unrelated images
- Excessive blur

============================================================
13. PERFORMANCE
============================================================

This is a production website.

Optimize the animation.

IMPORTANT:

Do NOT:

- Load the GLB twice
- Create multiple Three.js canvases unnecessarily
- Add heavy shader effects
- Add unnecessary animation loops
- Use excessive WebGL effects
- Block the website artificially for 3 seconds

The 3 seconds represents the visual sequence.

Do not create an artificial long loading delay.

Use:

useGLTF.preload()

where appropriate.

Use reasonable:

dpr={[1, 2]}

============================================================
14. LOADING AND ERROR STATES
============================================================

If the 3D model is loading:

Show a graceful loading state.

If the 3D model fails:

Do NOT crash the website.

Use a fallback visual if one exists.

The rest of the Hero must continue working.

Do not leave a giant empty space.

============================================================
15. REFRESH BEHAVIOR
============================================================

The animation should run when:

- The site initially loads
- The browser is refreshed

It should NOT replay unnecessarily on every internal SPA navigation.

Use sessionStorage or an appropriate project-specific strategy if needed.

Do not interfere with routing.

============================================================
16. MOBILE
============================================================

The animation must work on:

- Desktop
- Tablet
- Mobile

On mobile:

- Keep the transition elegant
- Prevent horizontal overflow
- Keep Hero content readable
- Keep the 3D tooth visible
- Support touch interaction
- Keep buttons accessible

Do not allow the split panels to create horizontal scrolling.

============================================================
17. ACCESSIBILITY
============================================================

Support:

prefers-reduced-motion

For reduced motion:

- Use a short fade
- Remove dramatic movement
- Reduce or remove split animation
- Keep content immediately accessible

The website must remain fully usable without animation.

============================================================
18. ANIMATION QUALITY
============================================================

The animation must NOT feel like:

- PowerPoint
- Template website
- Generic spinner
- Gaming intro
- Cartoon animation
- Cheap loading screen

It should feel like:

- Premium medical brand
- Modern dental clinic
- High-end product reveal
- Apple-like simplicity
- Smooth editorial motion
- Professional healthcare experience

Keep movement subtle.

The user should barely notice the technical complexity.

They should simply feel:

"Wow, this website feels polished."

============================================================
19. DO NOT MODIFY UNRELATED FEATURES
============================================================

Do not modify:

- Backend
- Authentication
- Database
- API logic
- Existing routes
- Existing forms
- Existing Navbar behavior
- Existing Footer
- Existing services
- Existing contact functionality

unless absolutely necessary for integration.

============================================================
20. IMPLEMENTATION PROCESS
============================================================

Follow this exact workflow:

STEP 1
Read the Markdown specification completely.

STEP 2
Inspect the repository.

STEP 3
Inspect package.json.

STEP 4
Inspect the existing Home/Hero.

STEP 5
Inspect all relevant assets.

STEP 6
Identify existing animation libraries.

STEP 7
Install Motion only if necessary.

STEP 8
Implement PagePreloader.

STEP 9
Implement the 0–3 second timeline.

STEP 10
Implement left/right split.

STEP 11
Animate the existing Hero.

STEP 12
Integrate the GLB tooth.

STEP 13
Add professional lighting.

STEP 14
Add OrbitControls.

STEP 15
Add loading/error handling.

STEP 16
Add reduced-motion support.

STEP 17
Test desktop.

STEP 18
Test tablet.

STEP 19
Test mobile.

STEP 20
Run the application.

STEP 21
Check browser console.

STEP 22
Fix all errors and warnings caused by the implementation.

STEP 23
Verify that existing website functionality still works.

============================================================
21. FINAL ACCEPTANCE TEST
============================================================

The task is complete only when the following experience works:

OPEN WEBSITE

↓

0.00s
Background fades in

↓

0.25s
Tooth/logo enters

↓

0.45s
Loading indicator begins

↓

1.35s
Loading reaches completion

↓

1.65s
Center visual begins fading out

↓

1.90s
Left/right panels begin splitting

↓

2.25s
Hero content begins appearing

↓

2.30s
3D tooth begins entering

↓

2.70s
Split panels completely leave screen

↓

3.00s
Hero fully visible

↓

3.00s+
3D tooth interactive

↓

USER DRAGS
Tooth rotates

↓

USER SCROLLS
Tooth zooms

The entire experience should feel smooth and intentional.

============================================================
22. FINAL RESPONSE
============================================================

After implementation, report:

1. Files created
2. Files modified
3. Packages installed
4. Animation timeline implemented
5. 3D model integration
6. Interaction behavior
7. Responsive behavior
8. Performance optimizations
9. Any remaining issues

Do not provide a generic explanation.

Report what you actually changed in the project.

============================================================
FINAL INSTRUCTION
============================================================

READ THE MARKDOWN FILE FIRST.

INSPECT THE EXISTING WEBSITE SECOND.

IMPLEMENT THIRD.

Do not blindly rebuild anything.

Preserve the existing design.

Integrate the animation professionally.

The final result must look like a custom-designed premium dental clinic experience, not a copied animation template.