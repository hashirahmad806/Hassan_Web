import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ClinicalExperiences } from './ClinicalExperiences';
import { clinicalExperiencesContent } from '@/content';

beforeAll(() => {
  Object.defineProperty(HTMLVideoElement.prototype, 'play', {
    configurable: true,
    value: vi.fn().mockResolvedValue(undefined),
  });
  Object.defineProperty(HTMLVideoElement.prototype, 'pause', {
    configurable: true,
    value: vi.fn(),
  });
});

function renderSection() {
  return render(
    <MemoryRouter>
      <ClinicalExperiences />
    </MemoryRouter>,
  );
}

describe('ClinicalExperiences Section', () => {
  it('renders section label and main heading', () => {
    renderSection();
    expect(screen.getByText(clinicalExperiencesContent.label)).toBeInTheDocument();
    expect(screen.getByText(/Surgical Artistry/i)).toBeInTheDocument();
    expect(screen.getByText(/In-Practice Care/i)).toBeInTheDocument();
  });

  it('renders all 3 clinical showcase cards with accurate case titles and badges', () => {
    renderSection();
    const items = clinicalExperiencesContent.items;
    expect(items.length).toBe(3);

    items.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.badge)).toBeInTheDocument();
      expect(screen.getByText(item.caseNumber)).toBeInTheDocument();
    });

    const locationElements = screen.getAllByText('ASH Aesthetics, 2nd Floor, GS Tower, Peshawar');
    expect(locationElements.length).toBe(3);
  });

  it('renders procedure tags for each clinical item', () => {
    renderSection();
    clinicalExperiencesContent.items.forEach((item) => {
      item.tags.forEach((tag) => {
        expect(screen.getAllByText(tag).length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  it('renders consultation and WhatsApp action buttons for all 3 cards', () => {
    renderSection();
    const consultationButtons = screen.getAllByRole('link', { name: /book consultation/i });
    expect(consultationButtons.length).toBe(3);

    const whatsappLinks = screen.getAllByRole('link', { name: /whatsapp/i });
    expect(whatsappLinks.length).toBe(3);
    whatsappLinks.forEach((link) => {
      expect(link.getAttribute('href')).toContain('https://wa.me/923349295638');
    });
  });

  it('renders 3 video elements with autoplay and loop attributes', () => {
    const { container } = renderSection();
    const videos = container.querySelectorAll('video');
    expect(videos.length).toBe(3);

    videos.forEach((video) => {
      expect(video).toHaveAttribute('autoplay');
      expect(video).toHaveAttribute('loop');
      expect(video).toHaveAttribute('playsinline');
    });
  });

  it('toggles audio on/off when audio button is clicked', () => {
    renderSection();
    const audioButtons = screen.getAllByLabelText(/unmute audio/i);
    expect(audioButtons.length).toBe(3);

    // Click to unmute first card
    fireEvent.click(audioButtons[0]);
    expect(screen.getByLabelText(/mute audio for.*smile design/i)).toBeInTheDocument();

    // Click again to mute
    const muteBtn = screen.getByLabelText(/mute audio for.*smile design/i);
    fireEvent.click(muteBtn);
    expect(screen.getAllByLabelText(/unmute audio/i).length).toBe(3);
  });

  it('opens cinematic lightbox when expand button is clicked and closes on close button', () => {
    renderSection();
    const expandButtons = screen.getAllByLabelText(/expand.*to full screen/i);
    expect(expandButtons.length).toBe(3);

    // Click expand on card 1
    fireEvent.click(expandButtons[0]);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close cinematic lightbox/i })).toBeInTheDocument();

    // Close modal
    fireEvent.click(screen.getByRole('button', { name: /close cinematic lightbox/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
