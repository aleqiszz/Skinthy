// screens/VideosScreen.js
import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  FlatList, TouchableOpacity, Alert, Linking,
} from 'react-native';
import Header from '../components/Header';

const videos = [
  { id: '1', title: 'How To Use Face Sunscreen', channel: 'NEOGEN DermaTV', url: 'https://youtu.be/7rAOLvHX_-8?si=UXRjGlA5lxxA6az8', emoji: '☀️' },
  { id: '2', title: 'How To Patch Test a Product', channel: 'Cassandra Bankson', url: 'https://youtu.be/9Nka_l4-vcY?si=j_ppMo_1ueckqV_1', emoji: '🧪' },
  { id: '3', title: 'Morning Skincare Routine for Beginners', channel: 'blueyoobin', url: 'https://youtu.be/vYgCCoavJ38?si=-6Tm673IxByzery3', emoji: '🌅' },
  { id: '4', title: 'Night Skincare Routine Explained', channel: 'Doctor Youn', url: 'https://youtu.be/pwuFbihJkoI?si=0UJbrSVt_LjXolId', emoji: '🌙' },
  { id: '5', title: 'Best Ingredients for Acne-Prone Skin', channel: 'Cassandra Bankson', url: 'https://youtu.be/EezMccbTYKM?si=bVbA9B9Qdf_8uYiO', emoji: '💊' },
  { id: '6', title: 'How to Layer Skincare Products Correctly', channel: 'Dr. Sam Ellis', url: 'https://youtu.be/v-lltVXwfkI?si=bVApPOuQoBsFPmDA', emoji: '📚' },
];

export default function VideosScreen({ navigation }) {
  const handleWatch = (item) => {
    Alert.alert(
      '▶ Watch Video',
      `"${item.title}" by ${item.channel}\n\nThis will open YouTube in your browser.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Watch Now', onPress: () => Linking.openURL(item.url) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Short Videos" showBack onBack={() => navigation.goBack()} />
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleWatch(item)}>
            <View style={styles.thumb}>
              <Text style={styles.thumbEmoji}>{item.emoji}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.channel}>{item.channel}</Text>
            </View>
            <Text style={styles.play}>▶</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No videos available.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F0EFE1' },
  list: { padding: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#CFE3CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbEmoji: { fontSize: 26 },
  info: { flex: 1, marginLeft: 12 },
  title: { fontSize: 13, fontWeight: '700', color: '#222', marginBottom: 3 },
  channel: { fontSize: 11, color: '#888' },
  play: { fontSize: 20, color: '#2d5a27', marginLeft: 8 },
  empty: { textAlign: 'center', marginTop: 40, color: '#999' },
});