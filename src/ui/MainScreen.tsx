import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useHabitsStore } from '../store/habitsStore';
import { useDayStore } from '../store/dayStore';
import { useProfileStore } from '../store/profileStore';
import { useAppStore } from '../store/appStore';
import { LevelBadge } from './LevelBadge';
import { Jar } from './Jar';
import { HabitButton } from './HabitButton';

export const MainScreen: React.FC = () => {
  const habits = useHabitsStore(state => state.habits);
  const dayTotal = useDayStore(state => state.day.total);
  const profile = useProfileStore(state => state.profile);
  const applyHabitDelta = useAppStore(state => state.applyHabitDelta);

  const goodHabits = habits.filter(h => h.kind === 'GOOD');
  const badHabits = habits.filter(h => h.kind === 'BAD');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      <View style={styles.content}>
        {/* Level Badge */}
        <LevelBadge level={profile.level} progress={profile.coinsCumulative % 100} />
        
        {/* Jar Display */}
        <Jar total={dayTotal} />
        
        {/* Habit Buttons */}
        <View style={styles.habitsContainer}>
          {/* Good Habits Column */}
          <View style={styles.habitsColumn}>
            <Text style={styles.columnTitle}>Good Habits</Text>
            {goodHabits.map(habit => (
              <HabitButton
                key={habit.id}
                habit={habit}
                onPress={() => applyHabitDelta(habit.id)}
              />
            ))}
          </View>
          
          {/* Bad Habits Column */}
          <View style={styles.habitsColumn}>
            <Text style={styles.columnTitle}>Bad Habits</Text>
            {badHabits.map(habit => (
              <HabitButton
                key={habit.id}
                habit={habit}
                onPress={() => applyHabitDelta(habit.id)}
              />
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  habitsContainer: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 20,
  },
  habitsColumn: {
    flex: 1,
    paddingHorizontal: 8,
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 16,
  },
});
