# 🦷 Dr. Hassan Salman (BDS, RDS) — Clinic Web Platform

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Sanity](https://img.shields.io/badge/Sanity-v3_CMS-F03E2F?logo=sanity&logoColor=white)](https://www.sanity.io/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?logo=three.js&logoColor=white)](https://threejs.org/)
[![Vitest](https://img.shields.io/badge/Vitest-Tested-729B1B?logo=vitest&logoColor=white)](https://vitest.dev/)

A state-of-the-art, luxury dental clinic and aesthetic smile design web platform built for **Dr. Hassan Salman (BDS, RDS)**. Engineered with a responsive React frontend, 3D WebGL animations, headless Sanity Studio v3 CMS, an Express backend, and test-driven development (TDD) resilience.

---

## 🏛 Architecture & Monorepo Structure

The repository is organized into three decoupled, production-ready modules:

```text
Hassan_Web/
├── Frontend/                 # Luxury Patient-Facing Web Application
│   ├── src/
│   │   ├── app/              # Router, providers & views
│   │   ├── components/       # UI atoms, layouts, and clinical sections
│   │   ├── three/            # Interactive Three.js WebGL scenes & canvas
│   │   ├── animations/       # GSAP timelines & Lenis smooth scroll engine
│   │   ├── lib/sanity/       # Sanity v3 Client, image builder & fetchers
│   │   └── content/          # Structured clinical fallback copy
│   └── vitest.config.ts      # Unit & integration test configuration
│
├── studio/                   # Sanity Studio v3 Headless CMS
│   ├── schemas/              # Content models (Services, Cases, Settings, Posts)
│   └── sanity.config.ts      # Studio configuration & desk structure
│
├── Backend/                  # Node.js / Express REST API
│   ├── src/                  # Controllers, routes, email mailers
│   └── server.ts             # Express app with Helmet, CORS & Rate Limiting
│
├── .agents/                  # Agent workflows, rules & TDD skills
└── package.json              # Monorepo task orchestration scripts
```

---

## ✨ Key Features

- **💎 Luxury Aesthetic & Visual Polish**: Custom typography, gold/emerald/charcoal palette, glassmorphism, and responsive design tailored for premier healthcare.
- **🌐 3D Interactive WebGL Hero**: Lightweight Three.js organic sphere with mouse parallax, scroll transforms, and reduced-motion fallback.
- **⚡ Smooth Inertia Scrolling**: Unified Lenis scroll engine synchronized with GSAP `ScrollTrigger`.
- **📝 Headless CMS with Sanity v3**:
  - Live editorial control over clinical treatments, doctor profile, clinic hours, and pricing notes.
  - **Before & After Gallery**: High-resolution smile rehabilitation case studies with focal-point hotspot cropping.
  - **Built-in Resilience**: Test-proven fallback architecture that serves static content seamlessly if CMS credentials or network are offline.
- **📅 Appointment & Inquiry System**: Typed form handling using React Hook Form + Zod with Express backend processing.
- **🧪 Test-Driven Development (TDD)**: Verified at critical public seams with 100% passing Vitest test suite.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: `v18+` (LTS recommended)
- **npm**: `v9+`

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/<your-username>/Hassan_Web.git
cd Hassan_Web

# Install dependencies across all modules
npm install
npm install --prefix Frontend
npm install --prefix studio
npm install --prefix Backend
```

### 2. Configure Environment Variables

#### Frontend (`Frontend/.env`):
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SANITY_PROJECT_ID=your_sanity_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-03-01
```

#### Sanity Studio (`studio/.env`):
```env
SANITY_STUDIO_PROJECT_ID=your_sanity_project_id
SANITY_STUDIO_DATASET=production
```

#### Backend (`Backend/.env`):
```env
PORT=5000
CLIENT_URL=http://localhost:5173
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
NOTIFICATION_EMAIL=clinic@drhassan.com
```

---

## 💻 Running Locally

You can launch any service directly from the root repository:

| Command | Description | Local URL |
|---|---|---|
| `npm run dev` | Starts the patient-facing Frontend website | [http://localhost:5173](http://localhost:5173) |
| `npm run dev:studio` | Launches the Sanity CMS Studio | [http://localhost:3333](http://localhost:3333) |
| `npm run dev:backend` | Starts the Express REST API | [http://localhost:5000](http://localhost:5000) |
| `npm test` | Runs the automated Vitest test suite | — |
| `npm run test:watch` | Runs tests in interactive watch mode | — |
| `npm run build` | Builds the frontend for production | `Frontend/dist` |

---

## 🧪 Testing (TDD)

The application enforces disciplined Test-Driven Development across public system seams:

- **Seam 1 (Sanity Data Access Layer)**: Verifies data mapping and graceful offline fallback (`src/lib/sanity/services.test.ts`).
- **Seam 2 (Image URL Helper)**: Verifies CDN generation, hotspot parameters, and null-safe handling (`src/lib/sanity/image.test.ts`).
- **Component & Hook Seams**: Button interactions, layout rendering, and responsive media query listeners.

Run all tests:
```bash
npm test
```

---

## 📦 Production Deployment

### Frontend (Vercel / Netlify / Cloudflare Pages)
- **Root Directory**: `Frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Sanity Studio (Sanity Edge Hosting)
```bash
cd studio
npx sanity deploy
```

### Backend (Railway / Render / VPS)
```bash
cd Backend
npm run build
npm start
```

---

## 📄 License

Private repository. Copyright © 2024–2026 Dr. Hassan Salman Clinic. All rights reserved.
