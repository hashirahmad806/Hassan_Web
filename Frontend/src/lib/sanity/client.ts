import { createClient } from '@sanity/client'

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'eqhpsuo3'
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-03-01'

/**
 * Production Sanity Client for Dr. Hassan BDS Clinic
 * Uses Sanity's Edge CDN for blazing-fast cached responses across global clinics.
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})
