import { describe, it, expect, vi } from 'vitest';
import { fetchSanityServices, fetchSanityGalleryCases } from './services';
import { treatments, caseStudies } from '@/content';

describe('fetchSanityServices (Seam 1: Sanity Services Data Access)', () => {
  it('returns formatted services when Sanity client successfully returns data', async () => {
    const mockSanityData = [
      {
        _id: 'service-1',
        _type: 'service',
        title: 'Porcelain Veneers',
        slug: { current: 'porcelain-veneers' },
        category: 'Cosmetic Dentistry',
        shortSummary: 'Transformative ultra-thin porcelain veneers.',
        pricingNote: 'Starting at $1,200',
        keyHighlights: ['Custom shade matching', 'Minimally invasive'],
        order: 1,
      },
    ];

    const mockClient = {
      fetch: vi.fn().mockResolvedValue(mockSanityData),
    };

    const result = await fetchSanityServices(mockClient as any);

    expect(mockClient.fetch).toHaveBeenCalled();
    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockSanityData);
  });

  it('falls back gracefully to static treatments when Sanity fetch fails', async () => {
    const mockClient = {
      fetch: vi.fn().mockRejectedValue(new Error('Network error or invalid Sanity Project ID')),
    };

    const result = await fetchSanityServices(mockClient as any);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(treatments);
    expect(result.isFallback).toBe(true);
  });
});

describe('fetchSanityGalleryCases (Seam 1: Sanity Gallery Data Access)', () => {
  it('returns gallery cases when Sanity client succeeds', async () => {
    const mockCases = [
      {
        _id: 'case-1',
        _type: 'galleryCase',
        caseTitle: 'Full Smile Transformation',
        procedureCategory: 'Full Mouth Rehabilitation',
        duration: '3 Months',
        notes: 'Exceptional aesthetic and biological outcome.',
      },
    ];

    const mockClient = {
      fetch: vi.fn().mockResolvedValue(mockCases),
    };

    const result = await fetchSanityGalleryCases(mockClient as any);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockCases);
    expect(result.isFallback).toBe(false);
  });

  it('falls back gracefully to static caseStudies when Sanity client fails', async () => {
    const mockClient = {
      fetch: vi.fn().mockRejectedValue(new Error('Sanity API rate limit or offline')),
    };

    const result = await fetchSanityGalleryCases(mockClient as any);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(caseStudies);
    expect(result.isFallback).toBe(true);
  });
});
