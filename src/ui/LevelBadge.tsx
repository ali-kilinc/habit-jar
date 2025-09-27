import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LevelBadgeProps {
  level: number;
  progress: number;
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({ level, progress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.levelContainer}>
        <Text style={styles.levelText}>Level {level}</Text>
      </View>
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[styles.progressFill, { width: `${progress}%` }]} 
          />
        </View>
        <Text style={styles.progressText}>
          {progress}/100 coins to next level
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  levelContainer: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },
  levelText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressContainer: {
    alignItems: 'center',
    width: '100%',
  },
  progressBar: {
    width: '80%',
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#28a745',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#6c757d',
    fontWeight: '500',
  },
});
