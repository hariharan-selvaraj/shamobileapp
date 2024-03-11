import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './components/page/SplashPage/Splash';
import LoginScreen from './components/page/loginpage/login';
// import home from './components/page/HomePage/home';
import { HomeDrawer } from './navigation/drawer';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Stack.Screen name='Splash' component={Splash} /> 
      <Stack.Screen name='LoginScreen' component={LoginScreen} /> 
      <Stack.Screen name='HomeDrawer' component={HomeDrawer} /> 
    </Stack.Navigator>
  );
}

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}