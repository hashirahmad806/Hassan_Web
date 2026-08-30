import { create } from 'zustand';

interface UIState {
  mobileMenuOpen: boolean;
  navScrolled: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setNavScrolled: (scrolled: boolean) => void;
}

/** Global UI state for navigation and overlays. */
export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  navScrolled: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  setNavScrolled: (scrolled) => set({ navScrolled: scrolled }),
}));

interface GalleryState {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  activeCategory: 'All',
  setActiveCategory: (category) => set({ activeCategory: category }),
}));
