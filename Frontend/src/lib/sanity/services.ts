import { sanityClient } from './client';
import { servicesQuery, galleryCasesQuery, testimonialsQuery, siteSettingsQuery } from './queries';
import { treatments, caseStudies, testimonials, siteConfig } from '@/content';
import type { Service, GalleryCase, SanityTestimonial, SiteSettings } from './types';

export type SanityService = Service;
export type SanityGalleryCase = GalleryCase;


export interface FetchResult<T> {
  success: boolean;
  data: T;
  isFallback?: boolean;
}

/**
 * Fetches clinical services from Sanity CMS with resilience fallback to static content.
 */
export async function fetchSanityServices(
  client = sanityClient,
): Promise<FetchResult<SanityService[] | typeof treatments>> {
  try {
    const data = await client.fetch<SanityService[]>(servicesQuery);
    if (Array.isArray(data) && data.length > 0) {
      return {
        success: true,
        data,
        isFallback: false,
      };
    }
    return {
      success: true,
      data: treatments,
      isFallback: true,
    };
  } catch {
    return {
      success: true,
      data: treatments,
      isFallback: true,
    };
  }
}

/**
 * Fetches clinical smile transformation cases from Sanity CMS with fallback to static cases.
 */
export async function fetchSanityGalleryCases(
  client = sanityClient,
): Promise<FetchResult<SanityGalleryCase[] | typeof caseStudies>> {
  try {
    const data = await client.fetch<SanityGalleryCase[]>(galleryCasesQuery);
    if (Array.isArray(data) && data.length > 0) {
      return {
        success: true,
        data,
        isFallback: false,
      };
    }
    return {
      success: true,
      data: caseStudies,
      isFallback: true,
    };
  } catch {
    return {
      success: true,
      data: caseStudies,
      isFallback: true,
    };
  }
}

/**
 * Fetches patient reviews and testimonials from Sanity CMS with fallback to static testimonials.
 */
export async function fetchSanityTestimonials(
  client = sanityClient,
): Promise<FetchResult<SanityTestimonial[] | typeof testimonials>> {
  try {
    const data = await client.fetch<SanityTestimonial[]>(testimonialsQuery);
    if (Array.isArray(data) && data.length > 0) {
      return {
        success: true,
        data,
        isFallback: false,
      };
    }
    return {
      success: true,
      data: testimonials,
      isFallback: true,
    };
  } catch {
    return {
      success: true,
      data: testimonials,
      isFallback: true,
    };
  }
}

/**
 * Fetches singleton clinic site settings from Sanity CMS with fallback to siteConfig.
 */
export async function fetchSanitySiteSettings(
  client = sanityClient,
): Promise<FetchResult<SiteSettings | typeof siteConfig>> {
  try {
    const data = await client.fetch<SiteSettings>(siteSettingsQuery);
    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      return {
        success: true,
        data,
        isFallback: false,
      };
    }
    return {
      success: true,
      data: siteConfig,
      isFallback: true,
    };
  } catch {
    return {
      success: true,
      data: siteConfig,
      isFallback: true,
    };
  }
}

