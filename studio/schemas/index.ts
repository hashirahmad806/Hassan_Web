import { author } from './author'
import { blockContent } from './blockContent'
import { galleryCase } from './galleryCase'
import { post } from './post'
import { service } from './service'
import { siteSettings } from './siteSettings'
import { testimonial } from './testimonial'

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
  // Portable text blocks
  blockContent,
]
