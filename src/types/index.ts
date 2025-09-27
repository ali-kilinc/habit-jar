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

// Store action types
export interface ApplyDeltaResult {
  day: DayState;
  profile: Profile;
  levelUps: number;
}

export interface RolloverResult {
  day: DayState;
  profile: Profile;
  leveledDown: boolean;
}
