import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'y8v2q9k1',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
})
