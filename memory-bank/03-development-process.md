# Development Process

## Conventions
- TypeScript strict mode, ESLint + Prettier.
- Absolute imports via tsconfig paths.
- Small, pure domain functions with unit tests (Jest).
- UI snapshot tests for critical components.

## Setup
1. `npm i` (or `pnpm i`): react-native, react-native-reanimated, zustand, @react-native-async-storage/async-storage, dayjs.
2. Android dev setup (SDK/NDK as per RN docs).

## Milestones
1. **MVP-0**: Data model, stores, storage adapter, domain math, unit tests.
2. **MVP-1**: SetupScreen, MainScreen static UI.
3. **MVP-2**: Hook up state, persistence, and animations.
4. **MVP-3**: EOD rollover logic (on resume + midnight timer).
5. **Polish**: a11y labels, haptics on press (optional), minimal empty/error states.

## Testing
- Unit: domain math (level up, daily negative → level down).
- Integration: store + persistence (mock AsyncStorage).
- Manual: change device date/time to verify rollover.

## Release
- Android debug build → internal test.
- Capture performance (press latency) and fix regressions.
