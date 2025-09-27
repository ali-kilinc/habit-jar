import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistedState, Habit, DayState, Profile } from '../types';

const STORAGE_KEY = 'hj:v1:state';
const BACKUP_KEY = 'hj:v1:state:backup';

/**
 * Default habits configuration (3 good, 3 bad)
 */
export const DEFAULT_HABITS: Habit[] = [
  { id: 'good-1', kind: 'GOOD', weight: 5, label: 'Exercise', description: 'Physical activity' },
  { id: 'good-2', kind: 'GOOD', weight: 3, label: 'Read', description: 'Learning time' },
  { id: 'good-3', kind: 'GOOD', weight: 1, label: 'Meditate', description: 'Mindfulness practice' },
  { id: 'bad-1', kind: 'BAD', weight: -5, label: 'Junk Food', description: 'Unhealthy eating' },
  { id: 'bad-2', kind: 'BAD', weight: -3, label: 'Social Media', description: 'Excessive scrolling' },
  { id: 'bad-3', kind: 'BAD', weight: -1, label: 'Procrastinate', description: 'Avoiding tasks' },
];

/**
 * Creates initial state for first-time users
 */
export function createInitialState(): PersistedState {
  const today = new Date().toISOString().split('T')[0];
  
  return {
    version: 1,
    habits: DEFAULT_HABITS,
    day: {
      date: today,
      total: 0,
      entries: [],
    },
    profile: {
      level: 0,
      coinsCumulative: 0,
    },
  };
}

/**
 * Loads state from AsyncStorage
 */
export async function loadState(): Promise<PersistedState | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    
    const parsed = JSON.parse(raw);
    return migrate(parsed);
  } catch (error) {
    console.error('Failed to load state:', error);
    return null;
  }
}

/**
 * Saves state to AsyncStorage
 */
export async function saveState(state: PersistedState): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state:', error);
    throw error;
  }
}

/**
 * Creates a backup of current state
 */
export async function backupState(state: PersistedState): Promise<void> {
  try {
    await AsyncStorage.setItem(BACKUP_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to backup state:', error);
  }
}

/**
 * Migrates raw data to current schema version
 * Handles unknown fields gracefully
 */
export function migrate(raw: any): PersistedState {
  // If it's already the correct version, return as-is
  if (raw?.version === 1) {
    return raw as PersistedState;
  }

  // For now, we only support version 1
  // In the future, we could add migration logic here
  console.warn('Unknown state version, creating fresh state');
  return createInitialState();
}

/**
 * Clears all stored data (for testing/reset)
 */
export async function clearAllData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([STORAGE_KEY, BACKUP_KEY]);
  } catch (error) {
    console.error('Failed to clear data:', error);
    throw error;
  }
}
