import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useHabitsStore } from '../store/habitsStore';
import { useAppStore } from '../store/appStore';
import { Habit } from '../types';

interface SetupScreenProps {
  onComplete: () => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({ onComplete }) => {
  const { habits, setHabitLabel, setHabitDescription, resetHabits } = useHabitsStore();
  const { applyHabitDelta } = useAppStore();
  const [isValid, setIsValid] = useState(false);

  // Validate all habits have labels
  useEffect(() => {
    const allValid = habits.every(habit => 
      habit.label.trim().length > 0 && 
      habit.label.trim().length <= 16 &&
      /^\S+$/.test(habit.label.trim()) // Single word, no spaces
    );
    setIsValid(allValid);
  }, [habits]);

  const handleLabelChange = (habitId: string, label: string) => {
    // Enforce single word, max 16 chars
    const cleanLabel = label.trim().split(' ')[0].substring(0, 16);
    setHabitLabel(habitId, cleanLabel);
  };

  const handleDescriptionChange = (habitId: string, description: string) => {
    setHabitDescription(habitId, description);
  };

  const handleSave = async () => {
    if (!isValid) {
      Alert.alert('Invalid Input', 'All habits must have a single-word label (1-16 characters)');
      return;
    }

    try {
      // Save the current state to persistence
      const { saveState } = await import('../data/storage');
      const currentState = {
        version: 1,
        habits: habits,
        day: {
          date: new Date().toISOString().split('T')[0],
          total: 0,
          entries: [],
        },
        profile: {
          level: 0,
          coinsCumulative: 0,
        },
      };
      
      await saveState(currentState);
      
      // Complete setup
      onComplete();
    } catch (error) {
      console.error('Failed to save setup:', error);
      Alert.alert('Error', 'Failed to save your habits. Please try again.');
    }
  };

  const goodHabits = habits.filter(h => h.kind === 'GOOD');
  const badHabits = habits.filter(h => h.kind === 'BAD');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Set Up Your Habits</Text>
      <Text style={styles.subtitle}>
        Define 6 habits: 3 good ones (+5, +3, +1 coins) and 3 bad ones (-5, -3, -1 coins)
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Good Habits (+Coins)</Text>
        {goodHabits.map((habit, index) => (
          <HabitInput
            key={habit.id}
            habit={habit}
            weight={habit.weight}
            index={index + 1}
            onLabelChange={handleLabelChange}
            onDescriptionChange={handleDescriptionChange}
          />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bad Habits (-Coins)</Text>
        {badHabits.map((habit, index) => (
          <HabitInput
            key={habit.id}
            habit={habit}
            weight={habit.weight}
            index={index + 1}
            onLabelChange={handleLabelChange}
            onDescriptionChange={handleDescriptionChange}
          />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.saveButton, !isValid && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={!isValid}
      >
        <Text style={[styles.saveButtonText, !isValid && styles.saveButtonTextDisabled]}>
          Save & Start
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

interface HabitInputProps {
  habit: Habit;
  weight: number;
  index: number;
  onLabelChange: (habitId: string, label: string) => void;
  onDescriptionChange: (habitId: string, description: string) => void;
}

const HabitInput: React.FC<HabitInputProps> = ({
  habit,
  weight,
  index,
  onLabelChange,
  onDescriptionChange,
}) => {
  const isGood = weight > 0;
  const weightText = isGood ? `+${weight}` : `${weight}`;
  const isValid = habit.label.trim().length > 0 && 
                  habit.label.trim().length <= 16 &&
                  /^\S+$/.test(habit.label.trim());

  return (
    <View style={styles.habitInput}>
      <View style={styles.habitHeader}>
        <Text style={styles.habitNumber}>{index}.</Text>
        <Text style={[styles.weightBadge, isGood ? styles.goodWeight : styles.badWeight]}>
          {weightText} coin{weight !== 1 && weight !== -1 ? 's' : ''}
        </Text>
      </View>
      
      <TextInput
        style={[styles.labelInput, !isValid && styles.labelInputInvalid]}
        value={habit.label}
        onChangeText={(text) => onLabelChange(habit.id, text)}
        placeholder="Enter habit name (single word)"
        maxLength={16}
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      <TextInput
        style={styles.descriptionInput}
        value={habit.description || ''}
        onChangeText={(text) => onDescriptionChange(habit.id, text)}
        placeholder="Optional description"
        multiline
        numberOfLines={2}
        maxLength={100}
      />
      
      {!isValid && habit.label.length > 0 && (
        <Text style={styles.validationError}>
          Must be a single word, 1-16 characters
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
  },
  habitInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  habitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  habitNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginRight: 12,
  },
  weightBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '600',
  },
  goodWeight: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  badWeight: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  labelInput: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    marginBottom: 8,
  },
  labelInputInvalid: {
    borderColor: '#dc3545',
    backgroundColor: '#fff5f5',
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#f8f9fa',
    minHeight: 60,
    textAlignVertical: 'top',
  },
  validationError: {
    color: '#dc3545',
    fontSize: 12,
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonDisabled: {
    backgroundColor: '#6c757d',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  saveButtonTextDisabled: {
    color: '#adb5bd',
  },
});
