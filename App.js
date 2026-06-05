// App.js — Skinthy Main Entry Point
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen     from './screens/HomeScreen';
import SkinTypeScreen from './screens/SkinTypeScreen';
import ProductsScreen from './screens/ProductsScreen';
import DosDontsScreen from './screens/DosDontsScreen';
import TrackerScreen  from './screens/TrackerScreen';
import VideosScreen   from './screens/VideosScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home"      component={HomeScreen} />
        <Stack.Screen name="SkinType"  component={SkinTypeScreen} />
        <Stack.Screen name="Products"  component={ProductsScreen} />
        <Stack.Screen name="DosDonts"  component={DosDontsScreen} />
        <Stack.Screen name="Tracker"   component={TrackerScreen} />
        <Stack.Screen name="Videos"    component={VideosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}