# Components

## Screens
### SetupScreen
- Purpose: collect 6 habit definitions (3 GOOD, 3 BAD).
- Validation: label required (single word, <=16 chars). Description optional.
- CTA: “Save & Start” → initializes state, navigates to Main.

### MainScreen
- Layout:
  - **Top**: LevelBadge (e.g., “Level 12”)
  - **Center**: Jar (displays `day.total`), coin in/out animation.
  - **Left column**: HabitButton ×3 (GOOD: +5, +3, +1 with labels).
  - **Right column**: HabitButton ×3 (BAD: −5, −3, −1 with labels).
- Interaction:
  - Tap HabitButton → dispatch `applyDelta(habitId)`
  - Triggers animation: into or out of Jar.
  - Persists immediately.

## Reusable UI
### <HabitButton/>
Props: `label`, `weight`, `onPress`, `kind`. Shows “+5 coin” etc. Accessible (a11yRole="button").

### <Jar/>
- Shows current `day.total` (big number) and optional subtle fill/shine.
- `animateIn()` / `animateOut()` triggers small coin spritely movement.

### <LevelBadge/>
- Displays `Level N`. Optionally shows progress toward next 100 coins.

## Store & Domain (✅ IMPLEMENTED)
- `useHabitsStore`: ✅ CRUD for labels (only in setup), reads weights.
- `useDayStore`: ✅ holds `DayState`, `applyDelta(habitId)` appends entry and updates totals.
- `useProfileStore`: ✅ level + cumulative coins, mutation helpers.
- `useAppStore`: ✅ combined store for complex interactions and persistence.
- `domain/level.ts`: ✅ pure functions `applyDelta`, `rolloverDay`, `computeLevelUps` with tests.

## Implementation Status
### ✅ Completed (MVP-0)
- All data models and interfaces
- Complete domain logic with 12 passing tests
- Storage layer with AsyncStorage integration
- State management with Zustand stores
- Testing infrastructure with Jest + TypeScript

### ✅ Completed (MVP-1)
- **SetupScreen**: Complete habit configuration UI with validation
- **MainScreen**: Central jar display with habit buttons layout
- **LevelBadge**: Level display with progress bar
- **Jar**: Visual coin counter with positive/negative styling
- **HabitButton**: Interactive buttons with weight indicators
- **AppProvider**: State initialization and screen management
- **Navigation**: Seamless flow between setup and main screens
- **Styling**: Consistent design system with accessibility features

### ✅ Completed (MVP-1) - Mobile Tested
- **SetupScreen**: Complete habit configuration UI with validation ✅
- **MainScreen**: Central jar display with habit buttons layout ✅
- **LevelBadge**: Level display with progress bar ✅
- **Jar**: Visual coin counter with positive/negative styling ✅
- **HabitButton**: Interactive buttons with weight indicators ✅
- **AppProvider**: State initialization and screen management ✅
- **Navigation**: Seamless flow between setup and main screens ✅
- **Styling**: Consistent design system with accessibility features ✅
- **Mobile Testing**: Successfully tested on Android device via Expo Go ✅
- **Bundle Compilation**: JavaScript bundle working perfectly (718 modules) ✅

### ✅ Completed (MVP-2 Phase 1)
- **State Integration**: UI components fully connected to state management ✅
- **Real-time Updates**: Button presses immediately update jar and level ✅
- **Persistence**: Complete state saving and loading functionality ✅
- **Setup Flow**: Habit configuration properly saves and persists ✅
- **Mobile Testing**: Successfully tested on Android device via Expo Go ✅
- **Test Coverage**: 23 tests covering all critical functionality ✅

### ✅ Completed (MVP-2)
- **State Integration**: UI components fully connected to state management ✅
- **Real-time Updates**: Button presses immediately update jar and level ✅
- **Persistence**: Complete state saving and loading functionality ✅
- **Setup Flow**: Habit configuration properly saves and persists ✅
- **Mobile Testing**: Successfully tested on Android device via Expo Go ✅
- **Test Coverage**: 23 tests covering all critical functionality ✅

### ⏳ Next (MVP-3)
- Fix keyboard covering habits in setup screen on mobile
- Remove single-word restriction, allow spaces (max 16 chars)
- Improve mobile keyboard experience
