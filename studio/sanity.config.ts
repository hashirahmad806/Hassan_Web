import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { StudioIcon, StudioLogo } from './components/StudioLogo'
import { deskStructure } from './deskStructure'
import { schemaTypes } from './schemas'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'eqhpsuo3'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'dr-hassan-dental-clinic',
  title: 'Dr. Hassan Dental Surgeon',
  subtitle: 'Aesthetic Dentistry & Reconstructive Clinic Studio',

  projectId,
  dataset,

  icon: StudioIcon,

  studio: {
    components: {
      logo: StudioLogo,
    },
  },

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
