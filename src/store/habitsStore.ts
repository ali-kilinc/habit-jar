import { create } from 'zustand';
import { Habit } from '../types';

interface HabitsState {
  habits: Habit[];
  setHabitLabel: (id: Habit['id'], label: string) => void;
  setHabitDescription: (id: Habit['id'], description?: string) => void;
  resetHabits: (defaults?: Habit[]) => void;
  getHabitById: (id: Habit['id']) => Habit | undefined;
}

export const useHabitsStore = create<HabitsState>((set, get) => ({
  habits: [],
  
  setHabitLabel: (id, label) => {
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === id ? { ...habit, label: label.trim().slice(0, 16) } : habit
      ),
    }));
  },
  
  setHabitDescription: (id, description) => {
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === id ? { ...habit, description } : habit
      ),
    }));
  },
  
  resetHabits: (defaults) => {
    set({ habits: defaults || [] });
  },
  
  getHabitById: (id) => {
    return get().habits.find((habit) => habit.id === id);
  },
}));
