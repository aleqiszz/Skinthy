// screens/RegisterScreen.js
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, Alert, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Image,
} from 'react-native';
import { addUser, emailExists } from '../data/userData';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegister = () => {
    // Check kosong
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Oops!', 'Please fill in all fields.', [{ text: 'Okay' }]);
      return;
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.', [{ text: 'Okay' }]);
      return;
    }

    // Check email dah wujud
    if (emailExists(email)) {
      Alert.alert('Account Exists', 'This email is already registered. Please log in.', [{ text: 'Okay' }]);
      return;
    }

    // Check password length
    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.', [{ text: 'Okay' }]);
      return;
    }

    // Check password match
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match. Please try again.', [{ text: 'Okay' }]);
      return;
    }

    // Add user baru
    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    };

    addUser(newUser);

    Alert.alert(
      '🎉 Success!',
      'Your account has been created. Please log in.',
      [{ text: 'Log In', onPress: () => navigation.replace('Login') }]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.header}>
            <Image
              source={require('../assets/SplashScreenSkinThy2-removebg.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.brand}>SKINTHY</Text>
            <Text style={styles.tagline}>Stay Skinthy, Feel Minty!</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.title}>REGISTER</Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#aaa"
              value={name}
              onChangeText={setName}
            />

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

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirm Password"
                placeholderTextColor="#aaa"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
              />
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                <Text style={styles.eyeIcon}>{showConfirm ? '🙈' : '👁'}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.hint}>Password must be at least 6 characters</Text>

            <TouchableOpacity style={styles.btn} onPress={handleRegister}>
              <Text style={styles.btnText}>REGISTER</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>
                Already have an account?{' '}
                <Text style={styles.loginLink}>Log In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#CFE3CC' },
  container: { flex: 1 },
  scroll: { flexGrow: 1 },
  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 24,
  },
  logoImage: { width: 120, height: 120, marginBottom: 8 },
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
    marginBottom: 12,
  },
  passwordInput: { flex: 1, paddingVertical: 14, fontSize: 14, color: '#333' },
  eyeIcon: { fontSize: 18, paddingLeft: 8 },
  hint: { fontSize: 11, color: '#aaa', marginBottom: 20, marginLeft: 4 },
  btn: {
    backgroundColor: '#2d5a27',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 1 },
  loginText: { textAlign: 'center', fontSize: 13, color: '#888' },
  loginLink: { color: '#2d5a27', fontWeight: '700' },
});