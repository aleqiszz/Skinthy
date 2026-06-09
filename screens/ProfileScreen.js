// screens/ProfileScreen.js
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, Alert, ScrollView, FlatList, TextInput,
} from 'react-native';
import Header from '../components/Header';
import { useUser } from '../context/UserContext';

const SKIN_TYPES = ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive', 'Acne-Prone'];

export default function ProfileScreen({ navigation }) {
  const {
    user, setUser,
    skinType, setSkinType,
    favourites,
    trackerStats,
    skinNotes, setSkinNotes,
  } = useUser();

  const [showSkinPicker, setShowSkinPicker] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            setUser(null);
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header
        title="Your Account"
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.container}>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || '?'}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email || ''}</Text>
        </View>

        {/* Skincare Stats */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 SKINCARE STATS</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{trackerStats.todayCompleted}</Text>
              <Text style={styles.statLbl}>Steps Today</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{trackerStats.streak}</Text>
              <Text style={styles.statLbl}>Day Streak 🔥</Text>
            </View>
          </View>
        </View>

        {/* Skin Type Badge */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🏷️ MY SKIN TYPE</Text>
          {skinType ? (
            <View style={styles.badgeRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{skinType}</Text>
              </View>
              <TouchableOpacity onPress={() => setShowSkinPicker(!showSkinPicker)}>
                <Text style={styles.changeBtn}>Change</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.setSkinBtn}
              onPress={() => setShowSkinPicker(!showSkinPicker)}
            >
              <Text style={styles.setSkinBtnText}>+ Set My Skin Type</Text>
            </TouchableOpacity>
          )}

          {showSkinPicker && (
            <View style={styles.skinPicker}>
              {SKIN_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.skinOption,
                    skinType === type && styles.skinOptionActive,
                  ]}
                  onPress={() => {
                    setSkinType(type);
                    setShowSkinPicker(false);
                    Alert.alert('✅ Updated!', `Your skin type is set to ${type}.`, [{ text: 'Okay' }]);
                  }}
                >
                  <Text style={[
                    styles.skinOptionText,
                    skinType === type && styles.skinOptionTextActive,
                  ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Favourite Products */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>❤️ FAVOURITE PRODUCTS</Text>
          {favourites.length === 0 ? (
            <Text style={styles.emptyFav}>
              No favourites yet. Tap 🤍 on any product to save it!
            </Text>
          ) : (
            <FlatList
              data={favourites}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.favItem}>
                  <View style={styles.favInfo}>
                    <Text style={styles.favName}>{item.name}</Text>
                    <Text style={styles.favType}>{item.skinType} • {item.productType}</Text>
                  </View>
                  <Text style={styles.favHeart}>❤️</Text>
                </View>
              )}
            />
          )}
        </View>

        {/* Skin Notes — Multiline Input */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📝 MY SKIN NOTES</Text>
          <Text style={styles.notesLabel}>
            Write anything about your skin condition, concerns, or routine tips:
          </Text>
          <TextInput
            style={styles.notesInput}
            value={skinNotes}
            onChangeText={setSkinNotes}
            placeholder="e.g. My skin gets oily in the afternoon. Sensitive to fragrance..."
            placeholderTextColor="#bbb"
            multiline
            numberOfLines={4}
            maxLength={300}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>{skinNotes.length}/300</Text>
        </View>

        {/* Profile Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>👤 PROFILE INFO</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>👤</Text>
            <View>
              <Text style={styles.infoLabel}>NAME</Text>
              <Text style={styles.infoValue}>{user?.name || '-'}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>✉️</Text>
            <View>
              <Text style={styles.infoLabel}>EMAIL</Text>
              <Text style={styles.infoValue}>{user?.email || '-'}</Text>
            </View>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>LOG OUT</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F0EFE1' },
  container: { padding: 16, paddingBottom: 40 },
  avatarContainer: { alignItems: 'center', marginVertical: 20 },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#CFE3CC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#2d5a27',
  },
  avatarText: { fontSize: 36, fontWeight: '900', color: '#2d5a27' },
  userName: { fontSize: 20, fontWeight: '700', color: '#222' },
  userEmail: { fontSize: 13, color: '#888', marginTop: 4 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 1.5,
    marginBottom: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statBox: { alignItems: 'center', flex: 1 },
  statNum: { fontSize: 28, fontWeight: '900', color: '#2d5a27' },
  statLbl: { fontSize: 12, color: '#888', marginTop: 2 },
  statDivider: { width: 1, height: 40, backgroundColor: '#eee' },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  badge: {
    backgroundColor: '#CFE3CC',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  badgeText: { fontSize: 14, fontWeight: '700', color: '#2d5a27' },
  changeBtn: { fontSize: 13, color: '#2d5a27', fontWeight: '600' },
  setSkinBtn: {
    borderWidth: 2,
    borderColor: '#CFE3CC',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderStyle: 'dashed',
  },
  setSkinBtnText: { fontSize: 14, color: '#2d5a27', fontWeight: '600' },
  skinPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  skinOption: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  skinOptionActive: { backgroundColor: '#2d5a27', borderColor: '#2d5a27' },
  skinOptionText: { fontSize: 13, color: '#555' },
  skinOptionTextActive: { color: '#fff', fontWeight: '700' },
  emptyFav: { fontSize: 13, color: '#aaa', textAlign: 'center', paddingVertical: 8 },
  favItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  favInfo: { flex: 1 },
  favName: { fontSize: 13, fontWeight: '700', color: '#222' },
  favType: { fontSize: 11, color: '#888', marginTop: 2 },
  favHeart: { fontSize: 18 },
  notesLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  notesInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#333',
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#eee',
  },
  charCount: {
    fontSize: 11,
    color: '#aaa',
    textAlign: 'right',
    marginTop: 6,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  infoIcon: { fontSize: 24 },
  infoLabel: { fontSize: 11, color: '#999', fontWeight: '600', marginBottom: 2 },
  infoValue: { fontSize: 15, color: '#222', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 16 },
  logoutBtn: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 2,
    borderColor: '#e53935',
  },
  logoutText: { color: '#e53935', fontSize: 15, fontWeight: '800', letterSpacing: 1 },
});