import { Image, Dimensions, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import ApiList from '../../componentfiles/ApiList';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const Splash = () => {
  const navigation = useNavigation();
  const route = useRoute();
  useEffect(() => {
    initialScreen()
  }, []);

  const initialScreen = async () => {
    const LoginStatus = await AsyncStorage.getItem('Customer')
    setTimeout(() => {
      Mainscreen(LoginStatus);
    }, 2000);
  }

  const Mainscreen = (LoginStatus) => {
    if (LoginStatus == "true") {
      navigation.replace('HomeDrawer');
    } else {
      navigation.replace('LoginScreen');
    }
    SplashScreen.hide();
  }
  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FFFFFF', '#FFFFFF', '#192f6a']}
      style={{ height: Height, width: Width, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={ApiList.splashlogo}
        style={{ width: Width, height: Height / 5, resizeMode: 'contain' }}
      />
    </LinearGradient>
  );
};

export default Splash;