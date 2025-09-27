import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useAppStore } from '../store/appStore';
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
      // For now, we'll show setup screen if habits are empty
      // In a real app, you might check a "hasCompletedSetup" flag
      setShowSetup(true); // Always show setup for MVP-1
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
