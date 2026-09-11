import { createImageUrlBuilder } from '@sanity/image-url'
import { sanityClient } from './client'
import type { SanityImage } from './types'

const imageBuilder = createImageUrlBuilder(sanityClient)

/**
 * Generates an optimized, responsive image URL respecting Sanity hotspot & crop metadata.
 * Safely handles null, undefined, or malformed image sources without crashing.
 */
export function urlForImage(source: SanityImage | any) {
  if (!source || (!source.asset && !source._ref && typeof source !== 'string')) {
    // Safe fallback builder when image asset is missing
    const nullBuilder: any = {
      width: () => nullBuilder,
      height: () => nullBuilder,
      quality: () => nullBuilder,
      fit: () => nullBuilder,
      auto: () => nullBuilder,
      url: () => '',
    }
    return nullBuilder
  }

  try {
    return imageBuilder.image(source).auto('format').fit('max')
  } catch {
    const nullBuilder: any = {
      width: () => nullBuilder,
      height: () => nullBuilder,
      quality: () => nullBuilder,
      fit: () => nullBuilder,
      auto: () => nullBuilder,
      url: () => '',
    }
    return nullBuilder
  }
}
