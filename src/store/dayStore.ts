import { create } from 'zustand';
import { DayState, Habit } from '../types';
import { applyDelta } from '../domain/level';

interface DayStateStore {
  day: DayState;
  applyDelta: (habitId: Habit['id']) => void;
  hydrate: (saved: DayState) => void;
  resetDay: () => void;
}

export const useDayStore = create<DayStateStore>((set, get) => ({
  day: {
    date: new Date().toISOString().split('T')[0],
    total: 0,
    entries: [],
  },
  
  applyDelta: (habitId) => {
    const { day } = get();
    const { habits } = require('./habitsStore').useHabitsStore.getState();
    
    const habit = habits.find((h: Habit) => h.id === habitId);
    if (!habit) {
      console.warn(`Habit with id ${habitId} not found`);
      return;
    }
    
    // Create a temporary profile for the calculation
    // The actual profile update will be handled by the profile store
    const tempProfile = { level: 0, coinsCumulative: 0 };
    
    const result = applyDelta(day, tempProfile, habit.weight);
    
    // Update the day state with the new entry that includes the habitId
    const updatedEntry = {
      ...result.day.entries[result.day.entries.length - 1],
      habitId,
    };
    
    set({
      day: {
        ...result.day,
        entries: [
          ...result.day.entries.slice(0, -1),
          updatedEntry,
        ],
      },
    });
  },
  
  hydrate: (saved) => {
    set({ day: saved });
  },
  
  resetDay: () => {
    set({
      day: {
        date: new Date().toISOString().split('T')[0],
        total: 0,
        entries: [],
      },
    });
  },
}));
