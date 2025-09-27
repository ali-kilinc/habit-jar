import { applyDelta, rolloverDay, computeLevelUps, getLevelProgress } from '../level';
import { DayState, Profile } from '../../types';

describe('level domain functions', () => {
  describe('applyDelta', () => {
    it('should apply positive delta and update day total', () => {
      const day: DayState = {
        date: '2024-01-01',
        total: 10,
        entries: [],
      };
      const profile: Profile = {
        level: 0,
        coinsCumulative: 50,
      };

      const result = applyDelta(day, profile, 5);

      expect(result.day.total).toBe(15);
      expect(result.day.entries).toHaveLength(1);
      expect(result.day.entries[0].delta).toBe(5);
      expect(result.profile.coinsCumulative).toBe(55);
      expect(result.levelUps).toBe(0);
    });

    it('should apply negative delta and update day total', () => {
      const day: DayState = {
        date: '2024-01-01',
        total: 10,
        entries: [],
      };
      const profile: Profile = {
        level: 0,
        coinsCumulative: 50,
      };

      const result = applyDelta(day, profile, -3);

      expect(result.day.total).toBe(7);
      expect(result.day.entries).toHaveLength(1);
      expect(result.day.entries[0].delta).toBe(-3);
      expect(result.profile.coinsCumulative).toBe(47);
      expect(result.levelUps).toBe(0);
    });

    it('should trigger level up when reaching 100 coins', () => {
      const day: DayState = {
        date: '2024-01-01',
        total: 0,
        entries: [],
      };
      const profile: Profile = {
        level: 0,
        coinsCumulative: 95,
      };

      const result = applyDelta(day, profile, 10);

      expect(result.profile.level).toBe(1);
      expect(result.profile.coinsCumulative).toBe(5);
      expect(result.levelUps).toBe(1);
    });

    it('should trigger multiple level ups', () => {
      const day: DayState = {
        date: '2024-01-01',
        total: 0,
        entries: [],
      };
      const profile: Profile = {
        level: 0,
        coinsCumulative: 50,
      };

      const result = applyDelta(day, profile, 250);

      expect(result.profile.level).toBe(3);
      expect(result.profile.coinsCumulative).toBe(0);
      expect(result.levelUps).toBe(3);
    });
  });

  describe('rolloverDay', () => {
    it('should not change anything for same day', () => {
      const day: DayState = {
        date: '2024-01-01',
        total: 10,
        entries: [],
      };
      const profile: Profile = {
        level: 5,
        coinsCumulative: 100,
      };

      const result = rolloverDay(day, profile, '2024-01-01');

      expect(result.day).toEqual(day);
      expect(result.profile).toEqual(profile);
      expect(result.leveledDown).toBe(false);
    });

    it('should reset day for new day with positive total', () => {
      const day: DayState = {
        date: '2024-01-01',
        total: 10,
        entries: [{ habitId: 'good-1', delta: 10, ts: Date.now() }],
      };
      const profile: Profile = {
        level: 5,
        coinsCumulative: 100,
      };

      const result = rolloverDay(day, profile, '2024-01-02');

      expect(result.day.date).toBe('2024-01-02');
      expect(result.day.total).toBe(0);
      expect(result.day.entries).toHaveLength(0);
      expect(result.profile.level).toBe(5);
      expect(result.leveledDown).toBe(false);
    });

    it('should level down for negative day total', () => {
      const day: DayState = {
        date: '2024-01-01',
        total: -5,
        entries: [{ habitId: 'bad-1', delta: -5, ts: Date.now() }],
      };
      const profile: Profile = {
        level: 3,
        coinsCumulative: 100,
      };

      const result = rolloverDay(day, profile, '2024-01-02');

      expect(result.day.date).toBe('2024-01-02');
      expect(result.day.total).toBe(0);
      expect(result.day.entries).toHaveLength(0);
      expect(result.profile.level).toBe(2);
      expect(result.leveledDown).toBe(true);
    });

    it('should not level down below 0', () => {
      const day: DayState = {
        date: '2024-01-01',
        total: -5,
        entries: [{ habitId: 'bad-1', delta: -5, ts: Date.now() }],
      };
      const profile: Profile = {
        level: 0,
        coinsCumulative: 100,
      };

      const result = rolloverDay(day, profile, '2024-01-02');

      expect(result.profile.level).toBe(0);
      expect(result.leveledDown).toBe(true);
    });
  });

  describe('computeLevelUps', () => {
    it('should return 0 for coins less than 100', () => {
      expect(computeLevelUps(50)).toBe(0);
      expect(computeLevelUps(99)).toBe(0);
    });

    it('should return correct level ups for multiples of 100', () => {
      expect(computeLevelUps(100)).toBe(1);
      expect(computeLevelUps(200)).toBe(2);
      expect(computeLevelUps(500)).toBe(5);
    });

    it('should return correct level ups for non-multiples', () => {
      expect(computeLevelUps(150)).toBe(1);
      expect(computeLevelUps(250)).toBe(2);
      expect(computeLevelUps(999)).toBe(9);
    });
  });

  describe('getLevelProgress', () => {
    it('should return correct progress toward next level', () => {
      expect(getLevelProgress(0)).toBe(0);
      expect(getLevelProgress(50)).toBe(50);
      expect(getLevelProgress(99)).toBe(99);
      expect(getLevelProgress(100)).toBe(0);
      expect(getLevelProgress(150)).toBe(50);
      expect(getLevelProgress(250)).toBe(50);
    });
  });
});
