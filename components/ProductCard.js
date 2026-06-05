// components/ProductCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProductCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)} activeOpacity={0.85}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <View style={styles.tagRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.skinType}</Text>
          </View>
          <View style={[styles.tag, styles.tagSecondary]}>
            <Text style={styles.tagText}>{item.productType}</Text>
          </View>
        </View>
        <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 4,
  },
  tag: {
    backgroundColor: '#CFE3CC',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tagSecondary: {
    backgroundColor: '#F0F0F0',
  },
  tagText: {
    fontSize: 10,
    color: '#2d5a27',
    fontWeight: '600',
  },
  desc: {
    fontSize: 11,
    color: '#777',
  },
  arrow: {
    fontSize: 22,
    color: '#ccc',
    marginLeft: 8,
  },
});