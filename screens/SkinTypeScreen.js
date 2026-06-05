// screens/SkinTypeScreen.js
import React, { useState, useEffect } from 'react';
import {
  View, FlatList, StyleSheet, SafeAreaView,
  ActivityIndicator, Text,
} from 'react-native';
import Header from '../components/Header';
import SkinTypeCard from '../components/SkinTypeCard';
import { skinTypes } from '../data/skinthyData';

export default function SkinTypeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(skinTypes);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <Header
        title="Know Your Skin Type"
        showBack
        onBack={() => navigation.goBack()}
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2d5a27" />
          <Text style={styles.loadingText}>Loading skin types...</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SkinTypeCard item={item} />}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <View style={styles.intro}>
              <Text style={styles.introText}>
                Tap a skin type to learn more about its characteristics. 👆
              </Text>
            </View>
          }
          ListEmptyComponent={
            <Text style={styles.empty}>No skin types found.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F0EFE1' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, fontSize: 14, color: '#666' },
  list: { paddingVertical: 12, paddingBottom: 30 },
  intro: {
    backgroundColor: '#CFE3CC',
    margin: 16,
    padding: 12,
    borderRadius: 10,
  },
  introText: { fontSize: 13, color: '#2d5a27', textAlign: 'center' },
  empty: { textAlign: 'center', marginTop: 40, color: '#999' },
});