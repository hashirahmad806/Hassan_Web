import { sanityClient } from './client';
import { servicesQuery, galleryCasesQuery } from './queries';
import { treatments, caseStudies } from '@/content';
import type { Service, GalleryCase } from './types';

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

