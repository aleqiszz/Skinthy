// screens/HomeScreen.js
import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, SafeAreaView, Image,
} from 'react-native';
import { useUser } from '../context/UserContext';

const menuItems = [
  { label: 'Know Your\nSkin Type',        screen: 'SkinType',   emoji: '🔍' },
  { label: 'Product\nRecommendations',    screen: 'Products',   emoji: '🧴' },
  { label: "Do's &\nDon'ts",              screen: 'DosDonts',   emoji: '✅' },
  { label: 'Short Videos\nfor More Info', screen: 'Videos',     emoji: '🎬' },
  { label: 'Skincare\nSteps Tracker',     screen: 'Tracker',    emoji: '📋' },
];

export default function HomeScreen({ navigation }) {
  const { user, skinType, trackerStats } = useUser();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          {/* Profile button */}
          <TouchableOpacity
            style={styles.profileBtn}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.profileBtnText}>
              {user?.name?.charAt(0).toUpperCase() || '👤'}
            </Text>
          </TouchableOpacity>

          <Image
            source={require('../assets/SplashScreenSkinThy2-removebg.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.brand}>SKINTHY</Text>
          <Text style={styles.tagline}>Stay Skinthy, Feel Minty!</Text>
          {user && (
            <Text style={styles.welcome}>Hi, {user.name}! 👋</Text>
          )}
        </View>

        {/* Stats Bar */}
        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{trackerStats.todayCompleted}</Text>
            <Text style={styles.statLabel}>Steps Today</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{trackerStats.streak}</Text>
            <Text style={styles.statLabel}>Day Streak 🔥</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{skinType || '-'}</Text>
            <Text style={styles.statLabel}>Skin Type</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>    What would you like to do?</Text>
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
    paddingVertical: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 16,
  },
  profileBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2d5a27',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileBtnText: { color: '#fff', fontSize: 16, fontWeight: '900' },
  logoImage: { width: 110, height: 110, marginBottom: 0 },
  brand: { fontSize: 28, fontWeight: '900', color: '#2d5a27', letterSpacing: 3 },
  tagline: { fontSize: 13, color: '#4a7a44', marginTop: 4 },
  welcome: { fontSize: 13, color: '#2d5a27', marginTop: 8, fontWeight: '600' },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: { alignItems: 'center', flex: 1 },
  statNumber: { fontSize: 20, fontWeight: '900', color: '#2d5a27' },
  statLabel: { fontSize: 11, color: '#888', marginTop: 2, textAlign: 'center' },
  statDivider: { width: 1, height: 40, backgroundColor: '#eee' },
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
    gap: 10,
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