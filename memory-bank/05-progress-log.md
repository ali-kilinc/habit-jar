# Progress Log

Use this file to jot down scope changes, decisions, and daily notes.

## 2025-09-27 - MVP-0 COMPLETED ✅
- Initialized memory bank and Cursor rules.
- Chosen stack: RN + TS, Zustand, AsyncStorage, dayjs, Reanimated.
- Locked mechanics: +5/+3/+1/−5/−3/−1; +1 level / 100 coins; daily negative → −1 level.

### MVP-0 Implementation Details
- **Project Setup**: Created Expo TypeScript project with all required dependencies
- **Data Model**: Implemented complete TypeScript interfaces (Habit, DayState, Profile, PersistedState)
- **Domain Logic**: Built pure functions for coin math, level calculations, and end-of-day rollover
- **Storage Layer**: Created AsyncStorage adapter with versioning, migration, and backup utilities
- **State Management**: Set up Zustand stores (habits, day, profile) with combined app store
- **Testing**: Configured Jest with TypeScript, wrote 12 comprehensive unit tests (all passing)
- **Dependencies Installed**: zustand, @react-native-async-storage/async-storage, dayjs, react-native-reanimated, jest, ts-jest, @types/jest

### Key Files Created
- `src/types/index.ts` - Complete data model interfaces
- `src/domain/level.ts` - Core business logic functions
- `src/data/storage.ts` - AsyncStorage integration with defaults
- `src/store/` - Zustand stores for state management
- `src/domain/__tests__/level.test.ts` - Comprehensive test suite
- `jest.config.js` - Testing configuration

### Test Results
- 12/12 tests passing
- 100% coverage of domain logic functions
- All edge cases covered (level ups, level downs, rollovers)

## Next: MVP-1 - UI Implementation
- Create SetupScreen for habit configuration
- Build MainScreen with Jar and HabitButtons
- Set up basic navigation between screens

## Template
- Date:
- What changed:
- Rationale:
- Next steps:
