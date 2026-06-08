// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/SplashScreenSkinThy2-removebg.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />
      <Text style={styles.brand}>SKINTHY</Text>
      <Text style={styles.tagline}>Stay Skinthy, Feel Minty!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CFE3CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  brand: {
    fontSize: 36,
    fontWeight: '900',
    color: '#2d5a27',
    letterSpacing: 4,
  },
  tagline: {
    fontSize: 14,
    color: '#4a7a44',
    marginTop: 8,
  },
});