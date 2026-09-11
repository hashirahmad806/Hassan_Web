# Dr. Hassan Salman Clinic — Frontend

Production-grade React frontend for the Dr. Hassan Salman dental clinic website, built with Vite, TypeScript, Three.js, GSAP, and Lenis smooth scrolling.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS Modules |
| 3D | react-three-fiber + drei |
| Scroll | Lenis |
| Animation | GSAP + ScrollTrigger |
| State | Zustand |
| Routing | React Router v6 |
| Forms | React Hook Form + Zod |
| CMS | Sanity v3 Client & Image URL Builder |
| API | Axios + Express REST |
| Icons | lucide-react |
| Tests | Vitest + React Testing Library |


## Getting Started

```bash
npm install
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build
npm run test     # Run unit tests
npm run lint     # ESLint check
```

## Project Structure

```
src/
├── app/                 # Router, providers, page components
├── assets/              # Images, fonts, 3D models
├── components/
│   ├── ui/              # Atoms: Button, Input, Badge...
│   ├── layout/          # Header, Footer, PageWrapper
│   └── sections/        # Hero, About, Treatments, Journey...
├── three/               # 3D scenes, objects, hooks
├── animations/
│   ├── gsap/            # Timeline factories per section
│   └── lenis/           # Lenis singleton + ScrollTrigger sync
├── hooks/               # useLenis, useMediaQuery, useScrollReveal
├── store/               # Zustand stores
├── services/            # Axios instance + API stubs
├── content/             # CMS-ready structured content
├── types/               # Global TypeScript interfaces
├── utils/               # Helpers
└── styles/              # globals.css
```

## Design Tokens

All design values are extracted from `/design/DESIGN.md` and mapped to `tailwind.config.ts`:

| Token Category | Source | Tailwind Key |
|---|---|---|
| Colors | `DESIGN.md` colors block | `primary`, `gold-accent`, `ivory-bg`, etc. |
| Typography | `DESIGN.md` typography block | `font-display-lg`, `text-headline-lg`, etc. |
| Spacing | `DESIGN.md` spacing block | `gutter`, `section-padding-desktop`, `container-max` |
| Breakpoints | Design frames | `sm: 375px`, `md: 768px`, `xl: 1440px` |
| Border radius | `DESIGN.md` rounded block | `rounded-sm` through `rounded-full` |

Content copy lives in `/src/content/siteContent.ts` — not hardcoded in components.

## Key Features

- **Hero 3D**: Lazy-loaded `HeroScene` with organic sphere, pointer parallax, scroll-linked transforms
- **Reduced motion**: Static gradient fallback when `prefers-reduced-motion` or WebGL unavailable
- **Lenis + GSAP**: Single scroll engine synced via `lenis.on('scroll', ScrollTrigger.update)`
- **Code splitting**: Routes and 3D bundle loaded via `React.lazy`
- **API ready**: Axios client in `/src/services` with typed stubs for Express REST endpoints

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Design Reference

Source of truth: `/design/` folder containing Figma/HTML exports for:
- Home page (`code.html`)
- Services, About, Gallery, Contact pages
- WebGL shader reference (`shader/code.html`)
