/**
 * Production GROQ Queries for Dr. Hassan BDS Clinic Website
 */

/**
 * Fetch the Singleton Clinic Settings document
 */
export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    _id,
    _type,
    clinicName,
    emergencyPhone,
    whatsappNumber,
    email,
    notificationEmail,
    instagramUrl,
    facebookUrl,
    linkedinUrl,
    youtubeUrl,
    address,
    googleMapsUrl,
    workingHours,
    heroHeadline,
    heroSubheadline,
    heroBannerImage {
      asset->,
      crop,
      hotspot,
      alt
    },
    doctorName,
    doctorQualifications,
    doctorBio,
    doctorPortrait {
      asset->,
      crop,
      hotspot,
      alt
    }
  }
`

/**
 * Fetch all patient testimonials and reviews ordered by priority
 */
export const testimonialsQuery = `
  *[_type == "testimonial"] | order(order asc, _createdAt desc) {
    _id,
    _type,
    patientName,
    quote,
    rating,
    procedure,
    caseStudyRef,
    verifiedPatient,
    isFeatured,
    order,
    avatar {
      asset->,
      crop,
      hotspot,
      alt
    }
  }
`

/**
 * Fetch all clinical services ordered by display priority
 */
export const servicesQuery = `
  *[_type == "service"] | order(order asc, _createdAt asc) {
    _id,
    _type,
    title,
    slug,
    category,
    shortSummary,
    coverImage {
      asset->,
      crop,
      hotspot,
      alt
    },
    pricingNote,
    keyHighlights,
    order
  }
`

/**
 * Fetch a single clinical service by its URL slug
 */
export const serviceBySlugQuery = `
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    category,
    shortSummary,
    coverImage {
      asset->,
      crop,
      hotspot,
      alt
    },
    pricingNote,
    keyHighlights,
    body,
    order
  }
`

/**
 * Fetch all smile transformation case studies (Before & After)
 */
export const galleryCasesQuery = `
  *[_type == "galleryCase"] | order(_createdAt desc) {
    _id,
    _type,
    caseTitle,
    procedureCategory,
    beforeImage {
      asset->,
      crop,
      hotspot,
      alt
    },
    afterImage {
      asset->,
      crop,
      hotspot,
      alt
    },
    duration,
    notes,
    isFeatured,
    relatedService-> {
      _id,
      title,
      slug
    }
  }
`

/**
 * Fetch featured smile transformations for the homepage gallery
 */
export const featuredGalleryCasesQuery = `
  *[_type == "galleryCase" && isFeatured == true] | order(_createdAt desc)[0...6] {
    _id,
    _type,
    caseTitle,
    procedureCategory,
    beforeImage {
      asset->,
      crop,
      hotspot,
      alt
    },
    afterImage {
      asset->,
      crop,
      hotspot,
      alt
    },
    duration,
    notes,
    relatedService-> {
      _id,
      title,
      slug
    }
  }
`

/**
 * Fetch all patient education blog articles
 */
export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    publishedAt,
    category,
    tags,
    readTimeMinutes,
    excerpt,
    coverImage {
      asset->,
      crop,
      hotspot,
      alt
    },
    author-> {
      _id,
      name,
      slug,
      credentials,
      image {
        asset->,
        crop,
        hotspot,
        alt
      }
    }
  }
`

/**
 * Fetch a single blog post by its URL slug
 */
export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    publishedAt,
    category,
    tags,
    readTimeMinutes,
    excerpt,
    coverImage {
      asset->,
      crop,
      hotspot,
      alt
    },
    author-> {
      _id,
      name,
      slug,
      credentials,
      bio,
      image {
        asset->,
        crop,
        hotspot,
        alt
      }
    },
    body
  }
`

/**
 * Fetch 3 most recent dental blog articles for homepage widget
 */
export const recentPostsQuery = `
  *[_type == "post"] | order(publishedAt desc)[0...3] {
    _id,
    _type,
    title,
    slug,
    publishedAt,
    category,
    readTimeMinutes,
    excerpt,
    coverImage {
      asset->,
      crop,
      hotspot,
      alt
    },
    author-> {
      name,
      credentials
    }
  }
`
