import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ServicesHero } from './ServicesHero';

beforeAll(() => {
  Object.defineProperty(HTMLVideoElement.prototype, 'play', {
    configurable: true,
    value: vi.fn().mockResolvedValue(undefined),
  });

  global.IntersectionObserver = class IntersectionObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    constructor(_callback: any, _options?: any) {}
  } as any;
});

function renderServicesHero() {
  return render(
    <MemoryRouter>
      <ServicesHero />
    </MemoryRouter>,
  );
}

describe('ServicesHero', () => {
  it('renders background video with autoplay, loop, muted, and playsinline attributes', () => {
    const { container } = renderServicesHero();
    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('autoplay');
    expect(video).toHaveAttribute('loop');
    expect((video as HTMLVideoElement).muted).toBe(true);
    expect(video).toHaveAttribute('playsinline');
    expect(video?.getAttribute('src')).toContain("Dentist_examining_patient's_teeth_1080p_20260914005225.mp4");
  });

  it('renders treatment portfolio badge and doctor attribution', () => {
    renderServicesHero();
    expect(screen.getByText(/Treatment Portfolio · Dr\. Hassan Salman/i)).toBeInTheDocument();
  });

  it('renders headline with accessible label', () => {
    renderServicesHero();
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Craft/i);
    expect(heading).toHaveTextContent(/Dentistry/i);
  });

  it('renders dual CTAs for consultation and exploration', () => {
    renderServicesHero();
    const consultLink = screen.getByRole('link', { name: /Schedule Consultation/i });
    expect(consultLink).toHaveAttribute('href', '/contact');

    const exploreLink = screen.getByRole('link', { name: /Explore Treatments/i });
    expect(exploreLink).toHaveAttribute('href', '#treatment-directory');
  });

  it('renders all three clinical stats', () => {
    renderServicesHero();
    expect(screen.getByText('3+')).toBeInTheDocument();
    expect(screen.getByText('Years Expertise')).toBeInTheDocument();
    expect(screen.getByText('500+')).toBeInTheDocument();
    expect(screen.getByText('Successful Procedures')).toBeInTheDocument();
  });

  it('renders floating preview treatment cards with anchors', () => {
    renderServicesHero();
    expect(screen.getByText('Porcelain Veneers')).toBeInTheDocument();
    expect(screen.getByText('Dental Implants')).toBeInTheDocument();
    expect(screen.getByText('Orthodontics')).toBeInTheDocument();
    expect(screen.getByText('Preventative Care')).toBeInTheDocument();
  });

  it('renders the 5-star trust badge', () => {
    renderServicesHero();
    expect(screen.getByText(/Rated 5\.0 by our patients/i)).toBeInTheDocument();
  });
});
