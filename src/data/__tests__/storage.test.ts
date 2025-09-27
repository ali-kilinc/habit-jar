import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadState, saveState, createInitialState, clearAllData } from '../storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  multiRemove: jest.fn(),
}));

const mockAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe('Storage Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create initial state with default habits', () => {
    const initialState = createInitialState();
    
    expect(initialState.version).toBe(1);
    expect(initialState.habits).toHaveLength(6);
    expect(initialState.habits.filter(h => h.kind === 'GOOD')).toHaveLength(3);
    expect(initialState.habits.filter(h => h.kind === 'BAD')).toHaveLength(3);
    expect(initialState.day.total).toBe(0);
    expect(initialState.day.entries).toHaveLength(0);
    expect(initialState.profile.level).toBe(0);
    expect(initialState.profile.coinsCumulative).toBe(0);
  });

  it('should save and load state correctly', async () => {
    const testState = createInitialState();
    testState.day.total = 10;
    testState.profile.level = 1;
    
    // Mock successful save
    mockAsyncStorage.setItem.mockResolvedValue(undefined);
    
    await saveState(testState);
    
    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
      'hj:v1:state',
      JSON.stringify(testState)
    );
  });

  it('should load state from storage', async () => {
    const testState = createInitialState();
    testState.day.total = 15;
    testState.profile.level = 2;
    
    // Mock successful load
    mockAsyncStorage.getItem.mockResolvedValue(JSON.stringify(testState));
    
    const loadedState = await loadState();
    
    expect(mockAsyncStorage.getItem).toHaveBeenCalledWith('hj:v1:state');
    expect(loadedState).toEqual(testState);
  });

  it('should return null when no saved state exists', async () => {
    // Mock no saved state
    mockAsyncStorage.getItem.mockResolvedValue(null);
    
    const loadedState = await loadState();
    
    expect(loadedState).toBeNull();
  });

  it('should handle storage errors gracefully', async () => {
    // Mock storage error
    mockAsyncStorage.getItem.mockRejectedValue(new Error('Storage error'));
    
    const loadedState = await loadState();
    
    expect(loadedState).toBeNull();
  });

  it('should clear all data', async () => {
    mockAsyncStorage.multiRemove.mockResolvedValue(undefined);
    
    await clearAllData();
    
    expect(mockAsyncStorage.multiRemove).toHaveBeenCalledWith([
      'hj:v1:state',
      'hj:v1:state:backup'
    ]);
  });
});
