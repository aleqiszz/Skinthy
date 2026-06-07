// components/Header.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Header({ title, showBack, onBack }) {
  return (
    <View style={styles.headerContainer}>
      {/* Butang Back diletakkan secara absolute supaya tidak mengganggu ruang tajuk */}
      {showBack && (
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      )}

      {/* Tajuk Utama kini bebas menggunakan 100% ruang tengah skrin */}
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Memastikan tajuk sentiasa berada di tengah-tengah skrin
    backgroundColor: '#C2D7C1',
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 60,
    position: 'relative',
  },
  backButton: {
    position: 'absolute', // Duduk secara terapung di atas latar belakang
    left: 16,             // Ditolak ke paling kiri skrin
    paddingVertical: 8,
    paddingRight: 12,
    zIndex: 10,           // Sentiasa berada di lapisan paling atas untuk boleh diklik
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d5a27',
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // Memberikan ruang padding kiri & kanan supaya tulisan tajuk tidak bertembung dengan butang back
    paddingHorizontal: 55, 
  },
  headerTitle: {
    fontSize: 15, // Dikecilkan sedikit sebanyak 1pt supaya ngam-ngam muat pada kebanyakan skrin telefon
    fontWeight: '700',
    color: '#2d5a27',
    textTransform: 'uppercase',
    textAlign: 'center',
    lineHeight: 20, // Memberikan penjarakan baris yang cantik sekiranya tulisan turun ke bawah
  },
});