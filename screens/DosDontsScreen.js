// screens/DosDontsScreen.js
import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  SectionList, ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import { dosAndDonts } from '../data/skinthyData';

export default function DosDontsScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const dos = dosAndDonts.filter((d) => d.category === "Do's");
      const donts = dosAndDonts.filter((d) => d.category === "Don'ts");
      setSections([
        { title: "✅ Do's", data: dos },
        { title: "❌ Don'ts", data: donts },
      ]);
      setLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  const renderItem = ({ item, section }) => {
    const isDo = section.title.includes("Do's");
    return (
      <View style={[styles.card, isDo ? styles.cardDo : styles.cardDont]}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDesc}>{item.description}</Text>
      </View>
    );
  };

  const renderSectionHeader = ({ section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <Header
        title="Do's & Don'ts"
        showBack
        onBack={() => navigation.goBack()}
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2d5a27" />
          <Text style={styles.loadingText}>Loading tips...</Text>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.empty}>No tips available.</Text>
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
  list: { paddingBottom: 30 },
  sectionHeader: {
    backgroundColor: '#CFE3CC',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 8,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2d5a27',
  },
  card: {
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 5,
  },
  cardDo: { backgroundColor: '#e8f5e9', borderLeftWidth: 4, borderLeftColor: '#4CAF50' },
  cardDont: { backgroundColor: '#fdecea', borderLeftWidth: 4, borderLeftColor: '#e53935' },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#222', marginBottom: 4 },
  cardDesc: { fontSize: 12, color: '#555', lineHeight: 17 },
  empty: { textAlign: 'center', marginTop: 40, color: '#999' },
});