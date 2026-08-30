import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

describe('useMediaQuery', () => {
  let listeners: Map<string, (event: MediaQueryListEvent) => void>;

  beforeEach(() => {
    listeners = new Map();
    vi.spyOn(window, 'matchMedia').mockImplementation(
      (query: string) =>
        ({
          matches: query.includes('768'),
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: (
            _event: string,
            handler: EventListenerOrEventListenerObject,
          ) => {
            if (typeof handler === 'function') {
              listeners.set(query, handler as (event: MediaQueryListEvent) => void);
            }
          },
          removeEventListener: (
            _event: string,
            _handler: EventListenerOrEventListenerObject,
          ) => {
            listeners.delete(query);
          },
          dispatchEvent: vi.fn(),
        }) as unknown as MediaQueryList,
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns true when media query matches', () => {
    const { result } = renderHook(() => useMediaQuery('md'));
    expect(result.current).toBe(true);
  });

  it('updates when media query changes', () => {
    const { result } = renderHook(() => useMediaQuery('md'));

    act(() => {
      const handler = listeners.get('(min-width: 768px)');
      handler?.({ matches: false } as MediaQueryListEvent);
    });

    expect(result.current).toBe(false);
  });
});
