import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    constructor(_callback: any, _options?: any) {}
  } as any;
});

// Preloader store mock
vi.mock('@/store/preloaderStore', () => ({
  usePreloaderStore: () => true,
}));

function renderNotFoundPage() {
  return render(
    <MemoryRouter initialEntries={['/some-nonexistent-path']}>
      <NotFoundPage />
    </MemoryRouter>,
  );
}

describe('NotFoundPage', () => {
  it('renders 404 badge and status typography', () => {
    renderNotFoundPage();
    expect(screen.getByText(/Error 404 • Route Not Located/i)).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /This Clinical Pathway Does Not Exist/i,
    );
  });

  it('renders return to home button linking to root', () => {
    renderNotFoundPage();
    const homeLink = screen.getByRole('link', { name: /Return to Sanctuary Home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders explore treatments action linking to /services', () => {
    renderNotFoundPage();
    const treatmentsLink = screen.getByRole('link', { name: /Explore Treatments/i });
    expect(treatmentsLink).toBeInTheDocument();
    expect(treatmentsLink).toHaveAttribute('href', '/services');
  });

  it('renders recommended destinations directory', () => {
    renderNotFoundPage();
    const directory = screen.getByTestId('recommended-destinations');
    expect(directory).toBeInTheDocument();
    const { getByText } = within(directory);
    expect(getByText('Smile Artistry Gallery')).toBeInTheDocument();
    expect(getByText('Bespoke Treatments')).toBeInTheDocument();
    expect(getByText('Clinical Philosophy')).toBeInTheDocument();
    expect(getByText('Reserve Consultation')).toBeInTheDocument();
  });

  it('updates document title on render', () => {
    renderNotFoundPage();
    expect(document.title).toContain('404');
  });
});
