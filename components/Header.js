// components/Header.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Header({ title, showBack = false, onBack }) {
  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CFE3CC',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#b5d0b2',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d5a27',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    top: 52,
  },
  backText: {
    color: '#2d5a27',
    fontSize: 14,
    fontWeight: '600',
  },
});