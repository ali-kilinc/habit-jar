# Project Overview — Six-Button Habit Jar (Android, React Native)

## One-liner
A hyper-simple habit tracker: 3 good and 3 bad habit buttons around a glass coin jar. Tapping buttons adds or removes coins with fixed weights. Every 100 coins = +1 level. Ending a day negative = −1 level.

## Goals (MVP)
- Single-screen Android app (React Native + TypeScript).
- First-run setup to define 6 habits: 3 good, 3 bad.
  - Each habit has: single-word label (max 16 chars), optional description.
- Main screen:
  - Center glass **Jar** (shows day total coins).
  - Left column: **Good** buttons (+5, +3, +1) with user labels.
  - Right column: **Bad** buttons (−5, −3, −1) with user labels.
  - Level indicator above the Jar.
  - One animation: coin moves **into** jar on good taps, **out of** jar on bad taps.
- Mechanics:
  - Unlimited taps per habit.
  - Every **100 cumulative coins → +1 level**.
  - If **daily total < 0 at local midnight → −1 level** (min 0).
- Persistence: on-device with AsyncStorage. No backend.

## Non‑Goals (MVP)
No streaks, social, charts, notifications, multi-device sync, themes, or history editing.

## Constraints & Rationale
- **Simplicity first**: frictionless taps, single main screen.
- **Deterministic math**: fixed weights (+5/+3/+1/−5/−3/−1) to avoid overthinking.
- **Daily closure**: level down on negative days makes “one bad day” visible without punitive grind.
- **Local time**: day ends at device local midnight (no timezone UI).

## Success Criteria
- TTI < 2s on mid‑range Android.
- Tap → animation → persistence in < 150ms.
- App resumes with correct day rollovers and level math.
