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
  notificationEmail?: string
  instagramUrl?: string
  facebookUrl?: string
  linkedinUrl?: string
  youtubeUrl?: string
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

export interface SanityTestimonial {
  _id: string
  _type: 'testimonial'
  patientName: string
  quote: string
  rating: number
  procedure?: string
  caseStudyRef?: string
  verifiedPatient?: boolean
  isFeatured?: boolean
  order?: number
  avatar?: SanityImage
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

export interface SanityFileAsset {
  _type: 'file'
  asset?: {
    _id?: string
    _ref?: string
    url?: string
    originalFilename?: string
    size?: number
  }
}

export interface SanityScholarlyWork {
  _id: string
  _type: 'scholarlyWork'
  title: string
  slug: { current: string }
  journal: string
  publicationDate: string
  year: string
  category: 'pediatric-preventive' | 'orthodontics' | 'behavioral-dentistry' | 'aesthetic' | 'biomimetic' | 'oral-surgery' | 'prosthodontics' | 'implantology' | 'clinical-case' | string
  authors: string[]
  abstract: string
  doi?: string
  pdfFile?: SanityFileAsset
  pdfUrl?: string
  citations?: {
    apa?: string
    bibtex?: string
    harvard?: string
  }
  isFeatured?: boolean
  order?: number
}

export interface SanityAcademicHonor {
  _id: string
  _type: 'academicHonor'
  title: string
  awardType: 'gold-medal' | 'degree' | 'clinical-distinction' | 'fellowship' | 'presentation-award' | string
  institution: string
  year: string
  citation?: string
  credentialDoc?: SanityImage
  credentialDocUrl?: string
  order?: number
}

