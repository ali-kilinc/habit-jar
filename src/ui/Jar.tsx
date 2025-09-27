import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface JarProps {
  total: number;
}

export const Jar: React.FC<JarProps> = ({ total }) => {
  const isPositive = total >= 0;
  const displayTotal = Math.abs(total);
  
  return (
    <View style={styles.container}>
      <View style={[styles.jar, isPositive ? styles.jarPositive : styles.jarNegative]}>
        <View style={styles.jarContent}>
          <Text style={[styles.coinCount, isPositive ? styles.coinCountPositive : styles.coinCountNegative]}>
            {displayTotal}
          </Text>
          <Text style={styles.coinLabel}>
            coin{displayTotal !== 1 ? 's' : ''}
          </Text>
        </View>
        
        {/* Jar shine effect */}
        <View style={styles.shine} />
        
        {/* Jar rim */}
        <View style={styles.rim} />
      </View>
      
      <Text style={styles.dailyTotal}>
        Daily Total: {isPositive ? '+' : ''}{total}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  jar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#6c757d',
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  jarPositive: {
    borderColor: '#28a745',
    backgroundColor: '#d4edda',
  },
  jarNegative: {
    borderColor: '#dc3545',
    backgroundColor: '#f8d7da',
  },
  jarContent: {
    alignItems: 'center',
    zIndex: 2,
  },
  coinCount: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  coinCountPositive: {
    color: '#155724',
  },
  coinCountNegative: {
    color: '#721c24',
  },
  coinLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6c757d',
  },
  shine: {
    position: 'absolute',
    top: 20,
    left: 30,
    width: 60,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 30,
    zIndex: 1,
  },
  rim: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    height: 8,
    backgroundColor: '#495057',
    borderRadius: 100,
    zIndex: 3,
  },
  dailyTotal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginTop: 16,
  },
});
