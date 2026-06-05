// screens/HomeScreen.js
import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, SafeAreaView,
} from 'react-native';

const menuItems = [
  { label: 'Know Your\nSkin Type',        screen: 'SkinType',   emoji: '🔍' },
  { label: 'Product\nRecommendations',    screen: 'Products',   emoji: '🧴' },
  { label: "Do's &\nDon'ts",              screen: 'DosDonts',   emoji: '✅' },
  { label: 'Short Videos\nfor More Info', screen: 'Videos',     emoji: '🎬' },
  { label: 'Skincare\nSteps Tracker',     screen: 'Tracker',    emoji: '📋' },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>🐸</Text>
          <Text style={styles.brand}>SKINTHY</Text>
          <Text style={styles.tagline}>Stay Skinthy, Feel Minty!</Text>
        </View>

        <Text style={styles.sectionTitle}>What would you like to do?</Text>
        <View style={styles.grid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.screen}
              style={styles.menuCard}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.8}
            >
              <Text style={styles.menuEmoji}>{item.emoji}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F0EFE1' },
  container: { paddingBottom: 30 },
  header: {
    backgroundColor: '#CFE3CC',
    alignItems: 'center',
    paddingVertical: 36,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: 24,
  },
  logo: { fontSize: 60, marginBottom: 8 },
  brand: { fontSize: 28, fontWeight: '900', color: '#2d5a27', letterSpacing: 3 },
  tagline: { fontSize: 13, color: '#4a7a44', marginTop: 4 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 12,
    justifyContent: 'center',
  },
  menuCard: {
    backgroundColor: '#fff',
    width: '44%',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  menuEmoji: { fontSize: 32, marginBottom: 8 },
  menuLabel: { fontSize: 13, fontWeight: '600', color: '#333', textAlign: 'center' },
});