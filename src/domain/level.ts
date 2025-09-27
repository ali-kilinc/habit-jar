import { DayState, Profile, ApplyDeltaResult, RolloverResult } from '../types';

/**
 * Applies a delta (coin change) to the current day and profile
 * Handles level-up calculations
 */
export function applyDelta(
  day: DayState,
  profile: Profile,
  delta: number
): ApplyDeltaResult {
  // Create new day state with the delta applied
  const newDay: DayState = {
    ...day,
    total: day.total + delta,
    entries: [
      ...day.entries,
      {
        habitId: '', // Will be set by the caller
        delta,
        ts: Date.now(),
      },
    ],
  };

  // Update profile with cumulative coins
  let newProfile = { ...profile };
  newProfile.coinsCumulative += delta;

  // Calculate level ups
  let levelUps = 0;
  while (newProfile.coinsCumulative >= 100) {
    newProfile.level += 1;
    newProfile.coinsCumulative -= 100;
    levelUps += 1;
  }

  return {
    day: newDay,
    profile: newProfile,
    levelUps,
  };
}

/**
 * Handles end-of-day rollover logic
 * Checks if we need to level down due to negative daily total
 */
export function rolloverDay(
  day: DayState,
  profile: Profile,
  today: string
): RolloverResult {
  // If it's a new day, check if we need to level down
  if (day.date < today) {
    let newProfile = { ...profile };
    let leveledDown = false;

    // If yesterday was negative, level down (minimum 0)
    if (day.total < 0) {
      newProfile.level = Math.max(0, newProfile.level - 1);
      leveledDown = true;
    }

    // Reset day state for new day
    const newDay: DayState = {
      date: today,
      total: 0,
      entries: [],
    };

    return {
      day: newDay,
      profile: newProfile,
      leveledDown,
    };
  }

  // Same day, no changes needed
  return {
    day,
    profile,
    leveledDown: false,
  };
}

/**
 * Computes the number of level ups that would occur from a given coin amount
 */
export function computeLevelUps(coinsCumulative: number): number {
  return Math.floor(coinsCumulative / 100);
}

/**
 * Gets the progress toward the next level (0-99)
 */
export function getLevelProgress(coinsCumulative: number): number {
  return coinsCumulative % 100;
}
