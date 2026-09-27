import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LocationSection } from './LocationSection';
import { locationSectionContent } from '@/content';

describe('LocationSection Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock navigator.clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  it('renders section with correct accessibility label and default id', () => {
    render(<LocationSection />);
    const section = screen.getByLabelText('Clinic Sanctuary and Location');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'location');
  });

  it('renders custom id when provided', () => {
    render(<LocationSection id="clinic" />);
    const section = screen.getByLabelText('Clinic Sanctuary and Location');
    expect(section).toHaveAttribute('id', 'clinic');
  });

  it('renders the clinic name and physical address', () => {
    render(<LocationSection />);
    expect(screen.getByText(locationSectionContent.residence.name)).toBeInTheDocument();
    expect(screen.getByText(locationSectionContent.residence.address)).toBeInTheDocument();
    expect(screen.getByText(locationSectionContent.residence.badge)).toBeInTheDocument();
  });

  it('renders all building specs chips', () => {
    render(<LocationSection />);
    locationSectionContent.residence.specs.forEach((spec) => {
      expect(screen.getByText(spec.label)).toBeInTheDocument();
    });
  });

  it('renders all 3 exclusive sanctuary amenities', () => {
    render(<LocationSection />);
    expect(screen.getByText(locationSectionContent.amenitiesHeading)).toBeInTheDocument();
    locationSectionContent.amenities.forEach((amenity) => {
      expect(screen.getByText(amenity.title)).toBeInTheDocument();
      expect(screen.getByText(amenity.description)).toBeInTheDocument();
    });
  });

  it('renders consultation hours ledger', () => {
    render(<LocationSection />);
    expect(screen.getByText(locationSectionContent.hoursTitle)).toBeInTheDocument();
    expect(screen.getByText(locationSectionContent.hoursBadge)).toBeInTheDocument();
    locationSectionContent.hours.forEach((slot) => {
      expect(screen.getByText(slot.day)).toBeInTheDocument();
      expect(screen.getByText(slot.time)).toBeInTheDocument();
    });
  });

  it('renders action dock links for Google Maps, WhatsApp, and Phone', () => {
    render(<LocationSection />);
    const mapsLink = screen.getByText(locationSectionContent.actions.googleMapsLabel).closest('a');
    expect(mapsLink).toHaveAttribute('href', locationSectionContent.actions.googleMapsUrl);
    expect(mapsLink).toHaveAttribute('target', '_blank');

    const whatsappLink = screen.getByText(locationSectionContent.actions.whatsappLabel).closest('a');
    expect(whatsappLink).toHaveAttribute('target', '_blank');

    const phoneLink = screen.getByText(locationSectionContent.actions.phoneLabel).closest('a');
    expect(phoneLink).toHaveAttribute('href', expect.stringContaining('tel:'));
  });

  it('copies coordinates to clipboard on click', async () => {
    render(<LocationSection />);
    const copyButton = screen.getByLabelText('Copy GPS coordinates');
    expect(copyButton).toBeInTheDocument();

    fireEvent.click(copyButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      locationSectionContent.residence.coordinates
    );
    expect(await screen.findByText('Copied!')).toBeInTheDocument();
  });

  it('supports map zoom in, zoom out, and reset controls', () => {
    render(<LocationSection />);
    const zoomInBtn = screen.getByLabelText('Zoom in map');
    const zoomOutBtn = screen.getByLabelText('Zoom out map');
    const resetZoomBtn = screen.getByLabelText('Reset map zoom');

    expect(zoomInBtn).toBeInTheDocument();
    expect(zoomOutBtn).toBeInTheDocument();
    expect(resetZoomBtn).toBeInTheDocument();

    // Click zoom in and reset
    fireEvent.click(zoomInBtn);
    fireEvent.click(resetZoomBtn);
  });

  it('renders transit guidance cards', () => {
    render(<LocationSection />);
    expect(screen.getByText(locationSectionContent.transitsHeading)).toBeInTheDocument();
    locationSectionContent.transits.forEach((transit) => {
      expect(screen.getByText(transit.title)).toBeInTheDocument();
      expect(screen.getByText(transit.duration)).toBeInTheDocument();
    });
  });
});
