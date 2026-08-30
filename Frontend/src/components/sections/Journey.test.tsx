import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Journey } from '@/components/sections/Journey';
import { journeyContent } from '@/content';

describe('Journey', () => {
  it('renders all journey steps', () => {
    render(<Journey />);

    journeyContent.steps.forEach((step) => {
      expect(screen.getByText(step.title)).toBeInTheDocument();
      expect(screen.getByText(step.description)).toBeInTheDocument();
    });
  });

  it('renders section heading', () => {
    render(<Journey />);
    expect(screen.getByText(journeyContent.heading)).toBeInTheDocument();
  });
});
