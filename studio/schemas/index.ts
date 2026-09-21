import { author } from './author'
import { blockContent } from './blockContent'
import { galleryCase } from './galleryCase'
import { post } from './post'
import { service } from './service'
import { siteSettings } from './siteSettings'
import { testimonial } from './testimonial'
import { scholarlyWork } from './scholarlyWork'
import { academicHonor } from './academicHonor'

export const schemaTypes = [
  // Singleton settings
  siteSettings,
  // Clinical content
  service,
  // Smile transformations
  galleryCase,
  // Patient social proof
  testimonial,
  // Patient education
  post,
  author,
  // Academic & Scholarly Works
  scholarlyWork,
  academicHonor,
  // Portable text blocks
  blockContent,
]

