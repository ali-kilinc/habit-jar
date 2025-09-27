import { create } from 'zustand';
import { DayState, Profile, Habit, PersistedState } from '../types';
import { applyDelta, rolloverDay } from '../domain/level';
import { useHabitsStore } from './habitsStore';
import { useDayStore } from './dayStore';
import { useProfileStore } from './profileStore';
import { loadState, saveState, createInitialState } from '../data/storage';

interface AppState {
  isInitialized: boolean;
  initialize: () => Promise<void>;
  applyHabitDelta: (habitId: Habit['id']) => void;
  checkEndOfDay: () => void;
  resetApp: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  isInitialized: false,
  
  initialize: async () => {
    try {
      const savedState = await loadState();
      
      if (savedState) {
        // Restore from saved state
        useHabitsStore.getState().resetHabits(savedState.habits);
        useDayStore.getState().hydrate(savedState.day);
        useProfileStore.getState().hydrate(savedState.profile);
      } else {
        // First time user - create initial state
        const initialState = createInitialState();
        useHabitsStore.getState().resetHabits(initialState.habits);
        useDayStore.getState().hydrate(initialState.day);
        useProfileStore.getState().hydrate(initialState.profile);
      }
      
      // Check for end-of-day rollover
      get().checkEndOfDay();
      
      set({ isInitialized: true });
    } catch (error) {
      console.error('Failed to initialize app:', error);
      // Fallback to initial state
      const initialState = createInitialState();
      useHabitsStore.getState().resetHabits(initialState.habits);
      useDayStore.getState().hydrate(initialState.day);
      useProfileStore.getState().hydrate(initialState.profile);
      set({ isInitialized: true });
    }
  },
  
  applyHabitDelta: (habitId) => {
    const habits = useHabitsStore.getState().habits;
    const habit = habits.find((h) => h.id === habitId);
    
    if (!habit) {
      console.warn(`Habit with id ${habitId} not found`);
      return;
    }
    
    const dayState = useDayStore.getState().day;
    const profileState = useProfileStore.getState().profile;
    
    // Apply the delta using domain logic
    const result = applyDelta(dayState, profileState, habit.weight);
    
    // Update the day store with the new entry that includes the habitId
    const updatedEntry = {
      ...result.day.entries[result.day.entries.length - 1],
      habitId,
    };
    
    const updatedDay = {
      ...result.day,
      entries: [
        ...result.day.entries.slice(0, -1),
        updatedEntry,
      ],
    };
    
    // Update both stores
    useDayStore.getState().hydrate(updatedDay);
    useProfileStore.getState().hydrate(result.profile);
    
    // Save to storage
    const currentState: PersistedState = {
      version: 1,
      habits: useHabitsStore.getState().habits,
      day: updatedDay,
      profile: result.profile,
    };
    
    saveState(currentState).catch((error) => {
      console.error('Failed to save state after delta:', error);
    });
  },
  
  checkEndOfDay: () => {
    const today = new Date().toISOString().split('T')[0];
    const dayState = useDayStore.getState().day;
    const profileState = useProfileStore.getState().profile;
    
    // Only check if it's a new day
    if (dayState.date < today) {
      const result = rolloverDay(dayState, profileState, today);
      
      // Update stores
      useDayStore.getState().hydrate(result.day);
      useProfileStore.getState().hydrate(result.profile);
      
      // Save to storage
      const currentState: PersistedState = {
        version: 1,
        habits: useHabitsStore.getState().habits,
        day: result.day,
        profile: result.profile,
      };
      
      saveState(currentState).catch((error) => {
        console.error('Failed to save state after rollover:', error);
      });
    }
  },
  
  resetApp: async () => {
    const initialState = createInitialState();
    useHabitsStore.getState().resetHabits(initialState.habits);
    useDayStore.getState().hydrate(initialState.day);
    useProfileStore.getState().hydrate(initialState.profile);
    
    await saveState(initialState);
  },
}));
