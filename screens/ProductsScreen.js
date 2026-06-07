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

// Pilihan baharu untuk Dropdown Menu mengikut jenis produk
const TYPE_OPTIONS = [
  { label: 'All Categories', value: 'All' },
  { label: 'Cleanser', value: 'Cleanser' },
  { label: 'Moisturiser', value: 'Moisturiser' },
  { label: 'Toner', value: 'Toner' },
  { label: 'Serum / Essence', value: 'Serum_Essence' }, // Nilai gabungan
];

export default function ProductsScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  
  // State untuk menyimpan jenis produk yang dipilih
  const [typeFilter, setTypeFilter] = useState('All');
  // State kawalan buka/tutup dropdown (konsep image_4b9025.png)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(products);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Logik tapisan produk: Jenis Kulit + Jenis Kategori Skincare
  const filtered = data.filter((p) => {
    const matchesSkin = selectedFilter === 'All' || p.skinType === selectedFilter;
    
    let matchesType = false;
    if (typeFilter === 'All') {
      matchesType = true;
    } else if (typeFilter === 'Serum_Essence') {
      // Memastikan kedua-dua 'Serum' atau 'Essence' akan dipaparkan sekali
      matchesType = p.productType === 'Serum' || p.productType === 'Essence';
    } else {
      matchesType = p.productType === typeFilter;
    }

    return matchesSkin && matchesType;
  });

  const handleProductPress = (item) => {
    Alert.alert(
      item.name,
      `Skin Type: ${item.skinType}\nType: ${item.productType}\n\nKey Ingredients:\n${item.ingredients.join(', ')}`,
      [{ text: 'Got it!', style: 'default' }]
    );
  };

  // Mendapatkan teks label semasa untuk butang dropdown
  const currentTypeLabel = TYPE_OPTIONS.find(o => o.value === typeFilter)?.label;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerWrapper}>
        <Header
          title="Product Recommendations"
          showBack
          onBack={() => navigation.goBack()}
        />
      </View>

      {/* DROPDOWN COMPONENT (Gaya Reka Bentuk image_4b9025.png) */}
      <View style={styles.dropdownContainer}>
        {/* Butang Utama Dropdown */}
        <TouchableOpacity 
          style={styles.dropdownButton} 
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          activeOpacity={0.8}
        >
          <Text style={styles.dropdownButtonText}>
            {currentTypeLabel}
          </Text>
          <Text style={styles.dropdownArrow}>{isDropdownOpen ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {/* Menu Pilihan Lungsur */}
        {isDropdownOpen && (
          <View style={styles.dropdownMenu}>
            <Text style={styles.dropdownMenuTitle}>Filter By Category</Text>
            {TYPE_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.checkboxRow}
                onPress={() => {
                  setTypeFilter(option.value);
                  setIsDropdownOpen(false); // Tutup automatik selepas pilih
                }}
              >
                {/* Kotak Semak / Checkbox */}
                <View style={[styles.checkbox, typeFilter === option.value && styles.checkboxChecked]}>
                  {typeFilter === option.value && <Text style={styles.checkmark}>✓</Text>}
                </View>
                {/* Teks Label Kategori */}
                <Text style={[styles.checkboxLabel, typeFilter === option.value && styles.checkboxLabelActive]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Penapis Jenis Kulit (Skin Type Chips) */}
      <FlatList
        horizontal
        data={SKIN_FILTERS}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
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
              <Text style={styles.emptyText}>No products found for this category.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F0EFE1' },
  headerWrapper: {
    backgroundColor: '#C2D7C1',
    paddingTop: 10,
    paddingBottom: 5,
  },
  dropdownContainer: {
    marginHorizontal: 16,
    marginTop: 12,
    zIndex: 10,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  dropdownButtonText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  dropdownArrow: {
    fontSize: 10,
    color: '#2d5a27',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 20,
  },
  dropdownMenuTitle: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#2d5a27',
    borderColor: '#2d5a27',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#555',
  },
  checkboxLabelActive: {
    color: '#2d5a27',
    fontWeight: '600',
  },
  horizontalList: {
    flexGrow: 0, 
    maxHeight: 60,
    marginTop: 4,
  },
  filterContainer: { 
    paddingHorizontal: 12, 
    paddingVertical: 10, 
    gap: 8,
    alignItems: 'center'
  },
  chip: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    height: 36, 
  },
  chipActive: { backgroundColor: '#2d5a27', borderColor: '#2d5a27' },
  chipText: { fontSize: 13, color: '#555' },
  chipTextActive: { color: '#fff', fontWeight: '700' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, fontSize: 14, color: '#666' },
  list: { paddingBottom: 30, paddingHorizontal: 16 },
  emptyContainer: { flex: 1, alignItems: 'center', marginTop: 60 },
  emptyEmoji: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 14, color: '#999', textAlign: 'center' },
});