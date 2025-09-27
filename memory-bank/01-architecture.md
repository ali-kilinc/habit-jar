# Architecture

## Stack
- **React Native** (TypeScript). Optionally with Expo; keep Android-targeted build first.
- **State**: Zustand (lightweight, predictable, testable).
- **Persistence**: AsyncStorage (with JSON schema + versioning).
- **Time**: dayjs (local midnight boundaries).
- **Animation**: react-native-reanimated (coin in/out), fallback to Animated if needed.
- **Navigation**: Single-screen MVP; optional minimal stack for Setup → Main.

## High-level Modules
- **domain/**: ✅ pure logic (coin math, level calc, EOD rollover) - COMPLETED
- **store/**: ✅ Zustand slices (habits, session/day, profile/level) - COMPLETED  
- **data/**: ✅ storage adapters (AsyncStorage), migration utilities - COMPLETED
- **ui/**: ⏳ presentational components (Jar, HabitButton, LevelBadge) - NEXT
- **app/**: ⏳ screens (SetupScreen, MainScreen), providers - NEXT

## Data Model (TypeScript)
```ts
export type HabitKind = 'GOOD' | 'BAD';
export interface Habit {
  id: string;           // 'good-1' | 'good-2' | ... 'bad-3'
  kind: HabitKind;
  weight: 5 | 3 | 1 | -5 | -3 | -1;
  label: string;        // single word, max 16 chars
  description?: string; // optional
}

export interface DayLogEntry {
  habitId: Habit['id'];
  delta: number;        // weight applied at tap time
  ts: number;           // epoch ms
}

export interface DayState {
  date: string;         // YYYY-MM-DD (device local)
  total: number;        // sum of deltas for the day
  entries: DayLogEntry[];
}

export interface Profile {
  level: number;        // >= 0
  coinsCumulative: number; // used for level ups (every 100)
  lastClosedDate?: string; // last date we ran EOD logic
}

export interface PersistedState {
  version: 1;
  habits: Habit[];      // exactly 6
  day: DayState;
  profile: Profile;
}
```

## Storage Keys
- `hj:v1:state` → PersistedState JSON

## End-of-Day Algorithm (local midnight)
1. If `day.date < today` (detected on app start/resume or hourly timer):
   - If `day.total < 0` → `profile.level = max(0, profile.level - 1)`
   - Reset `day` → new date, total=0, entries=[]
   - Persist
2. Level-up check runs at **tap** time:
   - Add `delta` to `profile.coinsCumulative`
   - While `coinsCumulative >= 100`: `level += 1`, `coinsCumulative -= 100`

## Error Handling
- Schema versioning with migrations (guard unknown fields).
- Defensive parsing; on corruption, keep a backup (`hj:v1:state:backup`) and re-init with minimal loss.

## Implementation Status (MVP-2 Phase 1 Complete)
### ✅ Completed Components
- **TypeScript Data Model**: All interfaces defined and implemented
- **Domain Logic**: Pure functions with comprehensive test coverage (12/12 tests passing)
- **Storage Layer**: AsyncStorage integration with versioning and migration
- **State Management**: Zustand stores with proper separation of concerns
- **Testing Infrastructure**: Jest + TypeScript configuration with mocks
- **UI Layer**: Complete user interface with all components
- **State Integration**: UI ↔ State ↔ Persistence fully connected
- **Real-time Updates**: Button presses immediately update jar and level
- **Mobile Testing**: Successfully tested on Android device via Expo Go
- **Bundle Compilation**: JavaScript bundle working perfectly (718 modules)

### 🔧 Key Implementation Details
- **Default Habits**: Pre-configured 6 habits (3 good, 3 bad) with sensible defaults
- **Level Math**: Handles multiple level-ups in single transaction
- **End-of-Day Logic**: Automatic rollover with level-down protection (min level 0)
- **Error Recovery**: Backup system and graceful fallbacks
- **Type Safety**: Strict TypeScript throughout with proper interfaces
- **Mobile Optimization**: Responsive design with proper touch targets
- **Accessibility**: Screen reader support and proper contrast ratios
- **Performance**: Smooth loading and interactions on mobile devices

### 📁 File Structure
```
src/
├── types/index.ts          # Data model interfaces
├── domain/
│   ├── level.ts           # Core business logic
│   └── __tests__/level.test.ts  # Domain tests
├── data/storage.ts        # AsyncStorage adapter
└── store/
    ├── habitsStore.ts     # Habit management
    ├── dayStore.ts        # Daily state
    ├── profileStore.ts    # User profile
    └── appStore.ts        # Combined interactions
```
