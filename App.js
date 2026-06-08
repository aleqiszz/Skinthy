// App.js — Skinthy Main Entry Point
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './context/UserContext';

// Screens
import SplashScreen   from './screens/SplashScreen';
import LoginScreen    from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen     from './screens/HomeScreen';
import SkinTypeScreen from './screens/SkinTypeScreen';
import ProductsScreen from './screens/ProductsScreen';
import DosDontsScreen from './screens/DosDontsScreen';
import TrackerScreen  from './screens/TrackerScreen';
import VideosScreen   from './screens/VideosScreen';
import ProfileScreen  from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splash"    component={SplashScreen} />
          <Stack.Screen name="Login"     component={LoginScreen} />
          <Stack.Screen name="Register"  component={RegisterScreen} />
          <Stack.Screen name="Home"      component={HomeScreen} />
          <Stack.Screen name="SkinType"  component={SkinTypeScreen} />
          <Stack.Screen name="Products"  component={ProductsScreen} />
          <Stack.Screen name="DosDonts"  component={DosDontsScreen} />
          <Stack.Screen name="Tracker"   component={TrackerScreen} />
          <Stack.Screen name="Videos"    component={VideosScreen} />
          <Stack.Screen name="Profile"   component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}