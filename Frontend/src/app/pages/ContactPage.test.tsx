import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ContactPage from './ContactPage';

beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    constructor(_callback: any, _options?: any) {}
  } as any;
});

vi.mock('@/store/preloaderStore', () => ({
  usePreloaderStore: () => true,
}));

function renderContactPage() {
  return render(
    <MemoryRouter initialEntries={['/contact']}>
      <ContactPage />
    </MemoryRouter>
  );
}

describe('ContactPage', () => {
  it('renders the ContactHero with live telemetry badge and headline', () => {
    renderContactPage();
    expect(
      screen.getByText(/DIRECT ADMISSION • PRIVATE SURGICAL CONSULTATIONS/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText('24h')).toBeInTheDocument();
  });

  it('renders the luxury booking consultation suite and form inputs', () => {
    renderContactPage();
    expect(screen.getByLabelText(/Private Consultation Booking Form/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preferred Date/i)).toBeInTheDocument();
  });

  it('renders procedure selection options', () => {
    renderContactPage();
    expect(screen.getByText('Smile Design & Veneers')).toBeInTheDocument();
    expect(screen.getAllByText('Dental Implants').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Clear Aligners / Invisalign')).toBeInTheDocument();
  });

  it('renders VIP Concierge contact channels', () => {
    renderContactPage();
    expect(screen.getByText(/Direct VIP Concierge/i)).toBeInTheDocument();
    expect(screen.getAllByText(/WhatsApp Concierge/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Surgery Reception Call/i)).toBeInTheDocument();
  });

  it('renders the 3-step consultation process expectation cards', () => {
    renderContactPage();
    expect(screen.getByText(/What to Expect at Your Visit/i)).toBeInTheDocument();
    expect(screen.getByText(/Facial & Smile Digital Mapping/i)).toBeInTheDocument();
    expect(screen.getByText(/3D Biomimetic Smile Simulation/i)).toBeInTheDocument();
    expect(screen.getByText(/Bespoke Surgical Blueprint/i)).toBeInTheDocument();
  });

  it('renders the LocationSection with sanctuary address and map', () => {
    renderContactPage();
    const locationSection = screen.getByLabelText(/Clinic Sanctuary and Location/i);
    expect(locationSection).toBeInTheDocument();
    expect(locationSection).toHaveAttribute('id', 'location');
    expect(screen.getAllByText(/ASH Aesthetics, 2nd Floor, GS Tower/i).length).toBeGreaterThanOrEqual(1);
  });
});
