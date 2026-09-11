/**
 * Sanity CMS TypeScript Interfaces for Dr. Hassan BDS Clinic
 */

export interface SanityAssetRef {
  _type: 'reference'
  _ref: string
}

export interface SanityImageCrop {
  top: number
  bottom: number
  left: number
  right: number
}

export interface SanityImageHotspot {
  x: number
  y: number
  height: number
  width: number
}

export interface SanityImage {
  _type: 'image'
  asset: SanityAssetRef
  crop?: SanityImageCrop
  hotspot?: SanityImageHotspot
  alt: string
  caption?: string
}

export interface WorkingHourItem {
  _key?: string
  days: string
  hours: string
  isClosed?: boolean
}

export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  clinicName: string
  emergencyPhone: string
  whatsappNumber: string
  email?: string
  address: string
  googleMapsUrl?: string
  workingHours: WorkingHourItem[]
  heroHeadline: string
  heroSubheadline?: string
  heroBannerImage: SanityImage
  doctorName: string
  doctorQualifications: string
  doctorBio: string
  doctorPortrait: SanityImage
}

export interface Service {
  _id: string
  _type: 'service'
  title: string
  slug: { current: string }
  category: string
  shortSummary: string
  coverImage: SanityImage
  pricingNote?: string
  keyHighlights?: string[]
  body?: any[]
  order?: number
}

export interface GalleryCase {
  _id: string
  _type: 'galleryCase'
  caseTitle: string
  procedureCategory: string
  beforeImage: SanityImage
  afterImage: SanityImage
  duration?: string
  notes?: string
  isFeatured?: boolean
  relatedService?: {
    _id: string
    title: string
    slug: { current: string }
  }
}

export interface Author {
  _id: string
  _type: 'author'
  name: string
  slug: { current: string }
  credentials?: string
  image: SanityImage
  bio?: string
}

export interface Post {
  _id: string
  _type: 'post'
  title: string
  slug: { current: string }
  publishedAt: string
  author: Author
  coverImage: SanityImage
  category: string
  tags?: string[]
  readTimeMinutes?: number
  excerpt: string
  body: any[]
}
