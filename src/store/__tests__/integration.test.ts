import { useAppStore } from '../appStore';
import { useHabitsStore } from '../habitsStore';
import { useDayStore } from '../dayStore';
import { useProfileStore } from '../profileStore';
import { createInitialState } from '../../data/storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  multiRemove: jest.fn(),
}));

describe('State Integration', () => {
  beforeEach(() => {
    // Reset all stores before each test
    useAppStore.getState().resetApp();
    useHabitsStore.getState().resetHabits();
    useDayStore.getState().resetDay();
    useProfileStore.getState().resetProfile();
  });

  it('should initialize with default habits', () => {
    // Initialize with default habits
    const initialState = createInitialState();
    useHabitsStore.getState().resetHabits(initialState.habits);
    
    const habits = useHabitsStore.getState().habits;
    expect(habits).toHaveLength(6);
    expect(habits.filter(h => h.kind === 'GOOD')).toHaveLength(3);
    expect(habits.filter(h => h.kind === 'BAD')).toHaveLength(3);
  });

  it('should apply habit delta and update state correctly', () => {
    // Initialize with default state
    const initialState = createInitialState();
    useHabitsStore.getState().resetHabits(initialState.habits);
    useDayStore.getState().hydrate(initialState.day);
    useProfileStore.getState().hydrate(initialState.profile);

    // Apply a positive delta
    useAppStore.getState().applyHabitDelta('good-1'); // +5 coins

    const dayState = useDayStore.getState().day;
    expect(dayState.total).toBe(5);
    expect(dayState.entries).toHaveLength(1);
    expect(dayState.entries[0].habitId).toBe('good-1');
    expect(dayState.entries[0].delta).toBe(5);
  });

  it('should handle level progression correctly', () => {
    // Initialize with default state
    const initialState = createInitialState();
    useHabitsStore.getState().resetHabits(initialState.habits);
    useDayStore.getState().hydrate(initialState.day);
    useProfileStore.getState().hydrate(initialState.profile);

    // Apply enough deltas to trigger level up (100 coins)
    // Apply +5 coins 20 times = 100 coins = 1 level up
    for (let i = 0; i < 20; i++) {
      useAppStore.getState().applyHabitDelta('good-1');
    }

    const profile = useProfileStore.getState().profile;
    expect(profile.level).toBe(1);
    expect(profile.coinsCumulative).toBe(0); // Reset after level up
  });

  it('should handle multiple level ups in single transaction', () => {
    // Initialize with default state
    const initialState = createInitialState();
    useHabitsStore.getState().resetHabits(initialState.habits);
    useDayStore.getState().hydrate(initialState.day);
    useProfileStore.getState().hydrate(initialState.profile);

    // Apply enough deltas to trigger multiple level ups (250 coins = 2 level ups + 50 remaining)
    // Apply +5 coins 50 times = 250 coins = 2 level ups + 50 remaining
    for (let i = 0; i < 50; i++) {
      useAppStore.getState().applyHabitDelta('good-1');
    }

    const profile = useProfileStore.getState().profile;
    expect(profile.level).toBe(2);
    expect(profile.coinsCumulative).toBe(50);
  });

  it('should handle negative deltas correctly', () => {
    // Initialize with default state
    const initialState = createInitialState();
    useHabitsStore.getState().resetHabits(initialState.habits);
    useDayStore.getState().hydrate(initialState.day);
    useProfileStore.getState().hydrate(initialState.profile);

    // Apply a negative delta
    useAppStore.getState().applyHabitDelta('bad-1'); // -5 coins

    const dayState = useDayStore.getState().day;
    expect(dayState.total).toBe(-5);
    expect(dayState.entries).toHaveLength(1);
    expect(dayState.entries[0].habitId).toBe('bad-1');
    expect(dayState.entries[0].delta).toBe(-5);
  });
});
