import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';

describe('Header & Mega-Menu Navigation', () => {
  const renderHeader = (initialRoute = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Header />
      </MemoryRouter>
    );
  };

  it('renders brand hallmark and doctor title', () => {
    renderHeader();
    expect(screen.getByLabelText(/Dr\. Hassan Aesthetic Dental Surgery/i)).toBeInTheDocument();
    expect(screen.getAllByText('Dr. Hassan').length).toBeGreaterThan(0);
    expect(screen.getByText('Aesthetic Dental Surgery')).toBeInTheDocument();
  });

  it('renders all 6 top-level navigation items', () => {
    renderHeader();
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav).toBeInTheDocument();

    const expectedLabels = ['Home', 'About', 'Services', 'Research', 'Journal', 'Contact'];
    expectedLabels.forEach((label) => {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });
  });

  it('retains clinic phone number and gold Book Consultation CTA button', () => {
    renderHeader();
    expect(screen.getByText('+92 334 9295638')).toBeInTheDocument();
    expect(screen.getAllByText('Book Consultation').length).toBeGreaterThan(0);
  });

  it('displays dropdown items when hovering over About', async () => {
    renderHeader();
    const aboutLink = screen.getByRole('link', { name: /^About/i });
    fireEvent.mouseEnter(aboutLink);

    expect(await screen.findByText('Meet Dr. Hassan')).toBeInTheDocument();
    expect(screen.getByText('Credentials & Training')).toBeInTheDocument();
    expect(screen.getByText('Ash Aesthetics — The Clinic')).toBeInTheDocument();
    expect(screen.getByText('Patient Reviews')).toBeInTheDocument();
  });

  it('displays 4 service categories and gallery panel when hovering over Services', async () => {
    renderHeader();
    const servicesLink = screen.getByRole('link', { name: /^Services/i });
    fireEvent.mouseEnter(servicesLink);

    expect(await screen.findByText('Aesthetic')).toBeInTheDocument();
    expect(screen.getByText('Restorative')).toBeInTheDocument();
    expect(screen.getByText('Orthodontic')).toBeInTheDocument();
    expect(screen.getByText('Surgical')).toBeInTheDocument();

    // Specific services
    expect(screen.getByText('Smile Design')).toBeInTheDocument();
    expect(screen.getByText('Veneers')).toBeInTheDocument();
    expect(screen.getByText('Implants')).toBeInTheDocument();
    expect(screen.getByText('Invisalign / Clear Aligners')).toBeInTheDocument();

    // Gallery visual preview panel
    expect(screen.getByText('Clinical Gallery')).toBeInTheDocument();
    expect(screen.getByText('100+ Bespoke Cases')).toBeInTheDocument();
  });

  it('toggles mobile menu drawer on hamburger click with accordion sections', () => {
    renderHeader();
    const toggleBtn = screen.getByLabelText(/Open menu/i);
    fireEvent.click(toggleBtn);

    const mobileNav = screen.getByRole('navigation', { name: /Mobile navigation/i });
    expect(mobileNav).toBeInTheDocument();

    // Click Services accordion to expand
    const servicesAccordion = screen.getByRole('button', { name: /^Services/i });
    fireEvent.click(servicesAccordion);

    expect(screen.getByText('Explore All Services')).toBeInTheDocument();
    expect(screen.getByText('View Clinical Before/After Cases')).toBeInTheDocument();
  });
});
