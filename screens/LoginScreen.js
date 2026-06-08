// screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, Alert, SafeAreaView, KeyboardAvoidingView, Platform, Image,
} from 'react-native';
import { findUser } from '../data/userData';
import { useUser } from '../context/UserContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useUser();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Oops!', 'Please fill in all fields.', [{ text: 'Okay' }]);
      return;
    }

    const user = findUser(email, password);

    if (user) {
      setUser(user);
      navigation.replace('Home');
    } else {
      Alert.alert(
        'Login Failed',
        'Wrong email or password. Please try again.',
        [{ text: 'Try Again' }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require('../assets/SplashScreenSkinThy2-removebg.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.brand}>SKINTHY</Text>
          <Text style={styles.tagline}>Stay Skinthy, Feel Minty!</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.title}>LOG IN</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btnText}>LOG IN</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>
              Don't have an account?{' '}
              <Text style={styles.registerLink}>Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#CFE3CC' },
  container: { flex: 1 },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
  },
  logoImage: {
    width: 120,
    height: 120,
    marginBottom: 8,
  },
  brand: { fontSize: 28, fontWeight: '900', color: '#2d5a27', letterSpacing: 3 },
  tagline: { fontSize: 12, color: '#4a7a44', marginTop: 4 },
  form: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2d5a27',
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: 2,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 14,
    color: '#333',
  },
  eyeIcon: { fontSize: 18, paddingLeft: 8 },
  btn: {
    backgroundColor: '#2d5a27',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 1 },
  registerText: { textAlign: 'center', fontSize: 13, color: '#888' },
  registerLink: { color: '#2d5a27', fontWeight: '700' },
});