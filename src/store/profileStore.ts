import { create } from 'zustand';
import { Profile } from '../types';

interface ProfileState {
  profile: Profile;
  setLevel: (level: number) => void;
  setCoinsCumulative: (coins: number) => void;
  hydrate: (saved: Profile) => void;
  resetProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: {
    level: 0,
    coinsCumulative: 0,
  },
  
  setLevel: (level) => {
    set((state) => ({
      profile: {
        ...state.profile,
        level: Math.max(0, level),
      },
    }));
  },
  
  setCoinsCumulative: (coins) => {
    set((state) => ({
      profile: {
        ...state.profile,
        coinsCumulative: Math.max(0, coins),
      },
    }));
  },
  
  hydrate: (saved) => {
    set({ profile: saved });
  },
  
  resetProfile: () => {
    set({
      profile: {
        level: 0,
        coinsCumulative: 0,
      },
    });
  },
}));
