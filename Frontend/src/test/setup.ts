import '@testing-library/jest-dom';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

global.IntersectionObserver = class IntersectionObserver {
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
  constructor() {}
} as any;

global.ResizeObserver = class ResizeObserver {
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
  constructor() {}
} as any;
