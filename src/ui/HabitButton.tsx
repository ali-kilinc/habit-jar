import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Habit } from '../types';

interface HabitButtonProps {
  habit: Habit;
  onPress: () => void;
}

export const HabitButton: React.FC<HabitButtonProps> = ({ habit, onPress }) => {
  const isGood = habit.weight > 0;
  const weightText = isGood ? `+${habit.weight}` : `${habit.weight}`;
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isGood ? styles.goodButton : styles.badButton,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`${habit.label} habit, ${weightText} coins`}
      accessibilityHint={`Tap to ${isGood ? 'add' : 'remove'} ${Math.abs(habit.weight)} coins`}
    >
      <View style={styles.buttonContent}>
        <Text style={[
          styles.weightText,
          isGood ? styles.goodWeightText : styles.badWeightText,
        ]}>
          {weightText}
        </Text>
        <Text style={[
          styles.labelText,
          isGood ? styles.goodLabelText : styles.badLabelText,
        ]}>
          {habit.label}
        </Text>
        <Text style={[
          styles.coinText,
          isGood ? styles.goodCoinText : styles.badCoinText,
        ]}>
          coin{habit.weight !== 1 && habit.weight !== -1 ? 's' : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 80,
    justifyContent: 'center',
  },
  goodButton: {
    backgroundColor: '#d4edda',
    borderWidth: 2,
    borderColor: '#c3e6cb',
  },
  badButton: {
    backgroundColor: '#f8d7da',
    borderWidth: 2,
    borderColor: '#f5c6cb',
  },
  buttonContent: {
    alignItems: 'center',
  },
  weightText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  goodWeightText: {
    color: '#155724',
  },
  badWeightText: {
    color: '#721c24',
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
    textAlign: 'center',
  },
  goodLabelText: {
    color: '#155724',
  },
  badLabelText: {
    color: '#721c24',
  },
  coinText: {
    fontSize: 12,
    fontWeight: '500',
  },
  goodCoinText: {
    color: '#28a745',
  },
  badCoinText: {
    color: '#dc3545',
  },
});
