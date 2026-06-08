// screens/ProductsScreen.js
import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  FlatList, TouchableOpacity, ActivityIndicator, Alert, TextInput,
} from 'react-native';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { products } from '../data/skinthyData';
import { useUser } from '../context/UserContext';

const SKIN_FILTERS = ['All', 'Normal', 'Dry', 'Oily', 'Combination', 'Sensitive', 'Acne-Prone'];

const TYPE_OPTIONS = [
  { label: 'All Categories', value: 'All' },
  { label: 'Cleanser', value: 'Cleanser' },
  { label: 'Moisturiser', value: 'Moisturiser' },
  { label: 'Toner', value: 'Toner' },
  { label: 'Serum / Essence', value: 'Serum_Essence' },
];

export default function ProductsScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { toggleFavourite, isFavourite } = useUser();

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(products);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filtered = data.filter((p) => {
    const matchesSkin = selectedFilter === 'All' || p.skinType === selectedFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchText.toLowerCase());

    let matchesType = false;
    if (typeFilter === 'All') {
      matchesType = true;
    } else if (typeFilter === 'Serum_Essence') {
      matchesType = p.productType === 'Serum' || p.productType === 'Essence';
    } else {
      matchesType = p.productType === typeFilter;
    }

    return matchesSkin && matchesType && matchesSearch;
  });

  const handleProductPress = (item) => {
    Alert.alert(
      item.name,
      `Skin Type: ${item.skinType}\nType: ${item.productType}\n\nKey Ingredients:\n${item.ingredients.join(', ')}`,
      [{ text: 'Got it!', style: 'default' }]
    );
  };

  const handleFavourite = (item) => {
    toggleFavourite(item);
    Alert.alert(
      isFavourite(item.id) ? '💔 Removed' : '❤️ Saved!',
      isFavourite(item.id)
        ? `${item.name} removed from favourites.`
        : `${item.name} added to favourites!`,
      [{ text: 'Okay' }]
    );
  };

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

      {/* SEARCH BAR */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#aaa"
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* DROPDOWN */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          activeOpacity={0.8}
        >
          <Text style={styles.dropdownButtonText}>{currentTypeLabel}</Text>
          <Text style={styles.dropdownArrow}>{isDropdownOpen ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {isDropdownOpen && (
          <View style={styles.dropdownMenu}>
            <Text style={styles.dropdownMenuTitle}>Filter By Category</Text>
            {TYPE_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.checkboxRow}
                onPress={() => {
                  setTypeFilter(option.value);
                  setIsDropdownOpen(false);
                }}
              >
                <View style={[styles.checkbox, typeFilter === option.value && styles.checkboxChecked]}>
                  {typeFilter === option.value && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={[styles.checkboxLabel, typeFilter === option.value && styles.checkboxLabelActive]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* SKIN TYPE FILTER CHIPS */}
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
            <View style={styles.productRow}>
              <View style={styles.productCardWrapper}>
                <ProductCard item={item} onPress={handleProductPress} />
              </View>
              <TouchableOpacity
                style={styles.favBtn}
                onPress={() => handleFavourite(item)}
              >
                <Text style={styles.favIcon}>
                  {isFavourite(item.id) ? '❤️' : '🤍'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={styles.emptyText}>No products found.</Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    borderRadius: 25,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
  },
  searchIcon: { fontSize: 14, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
  clearBtn: { fontSize: 14, color: '#aaa', paddingHorizontal: 4 },
  dropdownContainer: {
    marginHorizontal: 16,
    marginTop: 8,
    zIndex: 10,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
  },
  dropdownButtonText: { flex: 1, fontSize: 14, color: '#555', fontWeight: '500' },
  dropdownArrow: { fontSize: 10, color: '#2d5a27' },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#eee',
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
  checkboxRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
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
  checkboxChecked: { backgroundColor: '#2d5a27', borderColor: '#2d5a27' },
  checkmark: { color: '#fff', fontSize: 12, fontWeight: '700' },
  checkboxLabel: { fontSize: 14, color: '#555' },
  checkboxLabelActive: { color: '#2d5a27', fontWeight: '600' },
  horizontalList: { flexGrow: 0, maxHeight: 60, marginTop: 4 },
  filterContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    alignItems: 'center',
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
  list: { paddingBottom: 30 },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },
  productCardWrapper: { flex: 1 },
  favBtn: { padding: 8 },
  favIcon: { fontSize: 22 },
  emptyContainer: { flex: 1, alignItems: 'center', marginTop: 60 },
  emptyEmoji: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 14, color: '#999', textAlign: 'center' },
});