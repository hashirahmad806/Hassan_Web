import { describe, it, expect } from 'vitest';
import { urlForImage } from './image';

describe('urlForImage (Seam 2: Sanity Image URL Builder)', () => {
  it('generates a formatted image URL with dimensions for a valid Sanity image asset', () => {
    const mockImage = {
      _type: 'image',
      asset: {
        _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
        _type: 'reference',
      },
    };

    const url = urlForImage(mockImage).width(800).height(600).url();

    expect(url).toContain('cdn.sanity.io');
    expect(url).toContain('w=800');
    expect(url).toContain('h=600');
    expect(url).toContain('auto=format');
  });

  it('safely handles null or undefined image source without throwing runtime errors', () => {
    expect(() => {
      const url = urlForImage(null as any).width(400).url();
      expect(url).toBe('');
    }).not.toThrow();
  });
});
