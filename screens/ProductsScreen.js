// screens/ProductsScreen.js
import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  FlatList, TouchableOpacity, ActivityIndicator, Alert,
} from 'react-native';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { products } from '../data/skinthyData';

const SKIN_FILTERS = ['All', 'Normal', 'Dry', 'Oily', 'Combination', 'Sensitive', 'Acne-Prone'];

export default function ProductsScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(products);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filtered = selectedFilter === 'All'
    ? data
    : data.filter((p) => p.skinType === selectedFilter);

  const handleProductPress = (item) => {
    Alert.alert(
      item.name,
      `Skin Type: ${item.skinType}\nType: ${item.productType}\n\nKey Ingredients:\n${item.ingredients.join(', ')}`,
      [{ text: 'Got it!', style: 'default' }]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header
        title="Product Recommendations"
        showBack
        onBack={() => navigation.goBack()}
      />

      <FlatList
        horizontal
        data={SKIN_FILTERS}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.chip, selectedFilter === item && styles.chipActive]}
            onPress={() => setSelectedFilter(item)}
          >
            <Text style={[styles.chipText, selectedFilter === item && styles.chipTextActive]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2d5a27" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard item={item} onPress={handleProductPress} />
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={styles.emptyText}>No products found for this skin type.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F0EFE1' },
  filterContainer: { paddingHorizontal: 12, paddingVertical: 10, gap: 8 },
  chip: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  chipActive: { backgroundColor: '#2d5a27', borderColor: '#2d5a27' },
  chipText: { fontSize: 13, color: '#555' },
  chipTextActive: { color: '#fff', fontWeight: '700' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, fontSize: 14, color: '#666' },
  list: { paddingBottom: 30 },
  emptyContainer: { flex: 1, alignItems: 'center', marginTop: 60 },
  emptyEmoji: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 14, color: '#999', textAlign: 'center' },
});