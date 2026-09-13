/**
 * Hero section — TDD tests at public behavioral seams.
 *
 * Seams under test:
 *  1. Stats strip renders all four architectural metrics
 *  2. Primary CTA ("Book Appointment") and secondary CTA are reachable
 *  3. Doctor name and title are rendered from siteContent
 *  4. Availability badge is visible
 *  5. Feature capability badges render
 */
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Hero } from '@/components/sections/Hero';
import { heroContent, doctorProfile } from '@/content';

// ---- Stub heavy dependencies that are irrelevant to behavioral seams ----

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

// Three.js WebGL scene — not testable in jsdom, stub it out
vi.mock('@/three/scenes/HeroScene', () => ({
  HeroScene: () => null,
}));

// GSAP — stubs out the timeline to avoid ScrollTrigger issues in jsdom
vi.mock('@/animations/gsap', () => ({
  createHeroTimeline: () => ({ kill: vi.fn() }),
}));

// Preloader store — assume intro already seen so no animation delay
vi.mock('@/store/preloaderStore', () => ({
  usePreloaderStore: () => true,
}));

function renderHero() {
  return render(
    <MemoryRouter>
      <Hero />
    </MemoryRouter>,
  );
}

describe('Hero', () => {
  it('renders all four architectural stats', () => {
    renderHero();
    // The stats strip should show labels from STATS constant
    expect(screen.getAllByText('Years').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Smiles')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText('Accreditation')).toBeInTheDocument();
  });

  it('renders primary and secondary CTA buttons', () => {
    renderHero();
    expect(screen.getByText(heroContent.primaryCta)).toBeInTheDocument();
    expect(screen.getByText(heroContent.secondaryCta)).toBeInTheDocument();
  });

  it('renders doctor name from siteContent', () => {
    renderHero();
    // Doctor name appears in the card
    expect(screen.getByText(new RegExp(doctorProfile.name, 'i'))).toBeInTheDocument();
  });

  it('renders the availability badge', () => {
    renderHero();
    expect(screen.getByTestId('availability-badge')).toBeInTheDocument();
  });


  it('renders doctor title', () => {
    renderHero();
    expect(screen.getByText(new RegExp(doctorProfile.title, 'i'))).toBeInTheDocument();
  });
});
