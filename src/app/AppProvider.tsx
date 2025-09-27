import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useAppStore } from '../store/appStore';
import { useHabitsStore } from '../store/habitsStore';
import { SetupScreen } from '../ui/SetupScreen';
import { MainScreen } from '../ui/MainScreen';

export const AppProvider: React.FC = () => {
  const { isInitialized, initialize } = useAppStore();
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (isInitialized) {
      // Check if this is first time user (no habits configured)
      // For MVP-2, we'll check if habits have been customized from defaults
      const habits = useHabitsStore.getState().habits;
      const hasCustomHabits = habits.some(habit => 
        habit.label !== 'Exercise' && habit.label !== 'Read' && habit.label !== 'Meditate' &&
        habit.label !== 'Junk Food' && habit.label !== 'Social Media' && habit.label !== 'Procrastinate'
      );
      setShowSetup(!hasCustomHabits);
    }
  }, [isInitialized]);

  if (!isInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (showSetup) {
    return (
      <SetupScreen 
        onComplete={() => setShowSetup(false)} 
      />
    );
  }

  return <MainScreen />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
});
