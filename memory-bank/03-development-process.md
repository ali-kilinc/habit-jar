# Development Process

## Conventions
- TypeScript strict mode, ESLint + Prettier.
- Absolute imports via tsconfig paths.
- Small, pure domain functions with unit tests (Jest).
- UI snapshot tests for critical components.

## Setup
1. `npm i` (or `pnpm i`): react-native, react-native-reanimated, zustand, @react-native-async-storage/async-storage, dayjs.
2. Android dev setup (SDK/NDK as per RN docs).

## Milestones (Simplified Phases)
1. **MVP-0**: Data model, stores, storage adapter, domain math, unit tests. ✅
2. **MVP-1**: SetupScreen, MainScreen static UI. ✅
3. **MVP-2**: Hook up state, persistence, and real-time updates. ✅
4. **MVP-3**: Keyboard & Input Improvements (keyboard covering, input validation)
5. **MVP-4**: Visual Button Enhancement (coin images, fancy graphics)
6. **MVP-5**: Jar Visual Enhancement (jar image, coin filling)
7. **MVP-6**: Haptic Feedback (tactile feedback on button presses)
8. **MVP-7**: Smooth Transitions & Micro-interactions
9. **MVP-8**: Coin Animations (coins jumping between buttons and jar)
10. **MVP-9**: Visual Polish & Feedback (final enhancements)

## Testing Strategy
- **Unit Tests**: Domain math (level up, daily negative → level down) ✅
- **Integration Tests**: Store + persistence (mock AsyncStorage) ✅
- **Mobile Testing**: Real Android device with Expo Go after each MVP phase
- **Manual Testing**: Change device date/time to verify rollover
- **Performance Testing**: Ensure smooth interactions on mobile devices

## Release
- Android debug build → internal test.
- Capture performance (press latency) and fix regressions.
