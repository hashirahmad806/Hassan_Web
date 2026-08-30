import { create } from 'zustand';

interface PreloaderState {
  hasSeenIntro: boolean;
  setHasSeenIntro: (val: boolean) => void;
}

export const usePreloaderStore = create<PreloaderState>((set) => ({
  hasSeenIntro: false,
  setHasSeenIntro: (val) => set({ hasSeenIntro: val }),
}));
