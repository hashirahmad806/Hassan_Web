# Dr. Hassan BDS - Sanity Studio (v3)

A bespoke, production-grade Sanity v3 Content Management Studio tailored for **Dr. Hassan Salman (BDS, RDS)** dental surgery and clinic website (`hassanbds.info`).

## Features & Medical Taxonomies

1. **🏥 Site & Clinic Settings (Singleton)**:
   - Clinic contact details, 24/7 emergency hotline, WhatsApp direct booking link.
   - Operating hours and physical address with Google Maps integration.
   - Doctor qualifications (BDS, RDS), bio, and portrait photo with focal hotspot cropping.
   - Hero headline and banner photograph.
   - Single-instance desk structure: avoids accidental creation of duplicate setting documents.

2. **🩺 Clinical Services**:
   - Categorized by dental treatment disciplines (Preventive, Cosmetic, Implants, Orthodontics, Endodontics, Pediatric, Whitening).
   - Enforces 160-character summary limit for optimal mobile card rendering and Google search snippets.
   - Structured pricing notes and rich clinical descriptions with treatment steps.

3. **✨ Smile Transformations (Before & After Gallery)**:
   - Side-by-side intraoral and smile photographic case studies.
   - Mandatory alt-text and focal point cropping to prevent visual skewing.
   - Procedure duration and treatment breakdown.

4. **📚 Patient Education & Articles (Blog)**:
   - Patient-oriented oral hygiene advice, post-extraction care, and orthodontic tips.
   - Medical reviewer / author attribution.
   - Custom portable text callout blocks (Surgeon Tip, Important Precautions, Hygiene Reminders).

---

## Quick Start (Local Development)

### 1. Install Dependencies
```bash
cd studio
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your Sanity project ID:
```env
SANITY_STUDIO_PROJECT_ID=your_sanity_project_id
SANITY_STUDIO_DATASET=production
```

*(Note: You can create a free project at [sanity.io/manage](https://www.sanity.io/manage)).*

### 3. Launch the Studio
```bash
npm run dev
```
The Studio will start at `http://localhost:3333`.

---

## Deploying to Production

To host the studio on Sanity's global edge network (`https://dr-hassan-clinic.sanity.studio`):
```bash
npx sanity deploy
```
Follow the interactive prompt to select your custom studio hostname.
