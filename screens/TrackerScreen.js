// screens/TrackerScreen.js
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, Alert, ScrollView,
} from 'react-native';
import Header from '../components/Header';
import { dayTasks, nightTasks } from '../data/skinthyData';
import { useUser } from '../context/UserContext';

export default function TrackerScreen({ navigation }) {
  const [day, setDay] = useState(dayTasks);
  const [night, setNight] = useState(nightTasks);
  const { updateTrackerStats } = useUser();

  const toggle = (id, isDay) => {
    if (isDay) {
      setDay((prev) =>
        prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
      );
    } else {
      setNight((prev) =>
        prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
      );
    }
  };

  const handleSubmit = () => {
    const dayDone = day.filter((t) => t.done).length;
    const nightDone = night.filter((t) => t.done).length;
    const total = dayDone + nightDone;

    // Update context stats
    updateTrackerStats(total);

    Alert.alert(
      total >= 5 ? '🎉 Well Done!' : '📋 Keep It Up!',
      total >= 5
        ? `You completed ${dayDone} day steps and ${nightDone} night steps. Amazing skincare routine today!`
        : `You've done ${dayDone} day steps and ${nightDone} night steps. Try to be more consistent tomorrow!`,
      [
        { text: 'Reset', style: 'destructive', onPress: resetAll },
        { text: 'Okay!', style: 'default' },
      ]
    );
  };

  const resetAll = () => {
    setDay(dayTasks.map((t) => ({ ...t, done: false })));
    setNight(nightTasks.map((t) => ({ ...t, done: false })));
  };

  const renderTask = (task, isDay) => (
    <TouchableOpacity
      key={task.id}
      style={styles.taskRow}
      onPress={() => toggle(task.id, isDay)}
    >
      <View style={[styles.checkbox, task.done && styles.checkboxDone]}>
        {task.done && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={[styles.taskLabel, task.done && styles.taskLabelDone]}>
        {task.label}
      </Text>
    </TouchableOpacity>
  );

  const totalDone = day.filter((t) => t.done).length + night.filter((t) => t.done).length;
  const totalTasks = day.length + night.length;

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Skinthy Tracker" showBack onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.question}>Have you taken care of your skin today?</Text>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(totalDone / totalTasks) * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>{totalDone}/{totalTasks} steps completed</Text>
        </View>

        <View style={styles.columnsRow}>
          <View style={styles.column}>
            <Text style={styles.columnTitle}>☀️ Day</Text>
            {day.map((task) => renderTask(task, true))}
          </View>

          <View style={styles.column}>
            <Text style={styles.columnTitle}>🌙 Night</Text>
            {night.map((task) => renderTask(task, false))}
          </View>
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>SUBMIT</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F0EFE1' },
  container: { padding: 16, paddingBottom: 40 },
  question: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2d5a27',
    textAlign: 'center',
    marginBottom: 12,
  },
  progressContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2d5a27',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 12,
    color: '#888',
  },
  columnsRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
  column: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2,
  },
  columnTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: { backgroundColor: '#2d5a27', borderColor: '#2d5a27' },
  checkmark: { color: '#fff', fontSize: 12, fontWeight: '900' },
  taskLabel: { fontSize: 12, color: '#333' },
  taskLabelDone: { textDecorationLine: 'line-through', color: '#aaa' },
  submitBtn: {
    backgroundColor: '#2d5a27',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 1 },
});