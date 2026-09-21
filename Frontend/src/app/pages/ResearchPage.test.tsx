import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResearchPage from './ResearchPage';

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    constructor(_callback: any) {}
  } as any;
  global.IntersectionObserver = class IntersectionObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    constructor(_callback: any, _options?: any) {}
  } as any;
});


// Mock GSAP and ScrollTrigger
vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    fromTo: vi.fn(),
    utils: {
      toArray: vi.fn(() => []),
    },
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {},
}));

vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn((cb) => cb()),
}));

// Mock Sanity services to return fallback data
vi.mock('@/lib/sanity/services', () => ({
  fetchSanityScholarlyWorks: vi.fn().mockResolvedValue({
    success: true,
    data: [],
    isFallback: true,
  }),
  fetchSanityAcademicHonors: vi.fn().mockResolvedValue({
    success: true,
    data: [],
    isFallback: true,
  }),
}));

describe('ResearchPage', () => {
  it('renders the main heading and academic rigor badge', () => {
    render(
      <MemoryRouter>
        <ResearchPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Academic Rigor & Clinical Evidence/i)).toBeDefined();
    expect(
      screen.getByText(/Scholarly Inquiries in Contemporary Smile Artistry/i)
    ).toBeDefined();
  });

  it('renders BDS achievements and honors section', () => {
    render(
      <MemoryRouter>
        <ResearchPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/BDS Achievements & Academic Honors/i)
    ).toBeDefined();
    expect(
      screen.getByText(/Bachelor of Dental Surgery \(BDS\) - First Class Honours/i)
    ).toBeDefined();
    expect(
      screen.getByText(/Academic Gold Medal in Restorative & Aesthetic Dental Surgery/i)
    ).toBeDefined();
  });

  it('renders publication cards and allows live search filtering', () => {
    render(
      <MemoryRouter>
        <ResearchPage />
      </MemoryRouter>
    );

    // Initial papers should be rendered
    expect(
      screen.getByText(/Clinical Longevity and Marginal Adaptation of Ultra-Thin Ceramic Laminate Veneers/i)
    ).toBeDefined();

    // Type a query that matches only one paper
    const searchInput = screen.getByPlaceholderText(/Search by title, topic, co-author, or journal.../i);
    fireEvent.change(searchInput, { target: { value: 'Implant' } });

    expect(
      screen.getByText(/Digital Emergence Profile Conditioning in Anterior Dental Implants/i)
    ).toBeDefined();

    // Ceramic laminate veneer paper should be filtered out
    expect(
      screen.queryByText(/Clinical Longevity and Marginal Adaptation of Ultra-Thin Ceramic Laminate Veneers/i)
    ).toBeNull();
  });

  it('toggles abstract accordion and opens citation modal', () => {
    render(
      <MemoryRouter>
        <ResearchPage />
      </MemoryRouter>
    );

    // Find and click "Read Full Abstract"
    const abstractButtons = screen.getAllByRole('button', { name: /Read Full Abstract/i });
    expect(abstractButtons.length).toBeGreaterThan(0);
    fireEvent.click(abstractButtons[0]);
    expect(screen.getByText(/Collapse Abstract/i)).toBeDefined();

    // Click "Cite Paper" button
    const citeButtons = screen.getAllByRole('button', { name: /Cite Paper/i });
    expect(citeButtons.length).toBeGreaterThan(0);
    fireEvent.click(citeButtons[0]);

    // Modal should be visible
    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByText(/Cite This Research Paper/i)).toBeDefined();
    expect(screen.getByText(/Copy to Clipboard/i)).toBeDefined();
  });
});
