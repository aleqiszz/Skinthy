// components/SkinTypeCard.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SkinTypeCard({ item }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: item.color, borderLeftWidth: 5 }]}
      onPress={() => setExpanded(!expanded)}
      activeOpacity={0.85}
    >
      <View style={styles.row}>
        <View style={[styles.dot, { backgroundColor: item.color }]} />
        <Text style={styles.type}>{item.type} Skin</Text>
        <Text style={styles.chevron}>{expanded ? '▲' : '▼'}</Text>
      </View>
      <Text style={styles.desc}>{item.description}</Text>

      {expanded && (
        <View style={styles.charContainer}>
          <Text style={styles.charTitle}>Characteristics:</Text>
          {item.characteristics.map((c, i) => (
            <Text key={i} style={styles.charItem}>• {c}</Text>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  type: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    flex: 1,
  },
  chevron: {
    fontSize: 12,
    color: '#999',
  },
  desc: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  charContainer: {
    marginTop: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
  },
  charTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2d5a27',
    marginBottom: 4,
  },
  charItem: {
    fontSize: 12,
    color: '#444',
    marginBottom: 2,
  },
});