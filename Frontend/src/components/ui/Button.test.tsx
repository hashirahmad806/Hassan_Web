import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders children and handles click', async () => {
    let clicked = false;
    render(
      <Button onClick={() => { clicked = true; }}>Book Consultation</Button>,
    );

    const button = screen.getByRole('button', { name: 'Book Consultation' });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(clicked).toBe(true);
  });

  it('applies variant classes', () => {
    render(<Button variant="secondary">Explore</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('border');
  });
});
