# Internal API Documentation (No Backend)

Although no network API exists, define internal module APIs for clarity.

## domain/level.ts
```ts
export function applyDelta(day: DayState, profile: Profile, delta: number): {
  day: DayState;
  profile: Profile;
  levelUps: number;
}

export function rolloverDay(day: DayState, profile: Profile, today: string): {
  day: DayState;
  profile: Profile;
  leveledDown: boolean;
}
```

## store hooks
```ts
// useHabitsStore
setHabitLabel(id: Habit['id'], label: string): void
setHabitDescription(id: Habit['id'], description?: string): void
resetHabits(defaults?: Habit[]): void

// useDayStore
applyDelta(habitId: Habit['id']): void
hydrate(saved: PersistedState): void

// useProfileStore
setLevel(n: number): void
```

## data/storage.ts
```ts
loadState(): Promise<PersistedState | null>
saveState(state: PersistedState): Promise<void>
backupState(state: PersistedState): Promise<void>
migrate(raw: any): PersistedState
```
