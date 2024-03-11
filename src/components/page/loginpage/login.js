import React, { useState, useEffect } from 'react';
import { View, Keyboard, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { postMethod } from '../../../services/Apiservices';
import { CustomButton, CustomTextInput, validateInput } from '../../componentfiles/validate';
import NetInfo from '@react-native-community/netinfo';
import LoadingIndicator from '../../componentfiles/loadingindicator';
import ApiList from '../../componentfiles/ApiList';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setvisible] = useState(true);

    const checkNetworkConnection = async () => {
        const netInfoState = await NetInfo.fetch();
        if (netInfoState.isConnected) {
            // console.log('Connected to the internet');
        } else {
            console.warn('No internet connection');
        }
    };

    useEffect(() => {
        checkNetworkConnection();
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.isConnected) {
                // console.log('Connected to the internet');
            } else {
                console.warn('No internet connection');
            }
        });
        return () => {
            unsubscribe();
        };
    }, [])

    const handleLogin = async () => {
        Keyboard.dismiss();
        const validationMessage = validateInput(username, password)
        if (validationMessage) {
            Toast.show(validationMessage, Toast.LONG);
        } else {
            setIsLoading(true)
            let loginData = {
                "LoginName": username,
                "UserPassword": password
            }
            // await AsyncStorage.setItem('Customer', true + '');
            // navigation.navigate('HomeDrawer')
            await postMethod(ApiList.login, loginData).then(async (result) => {
                setIsLoading(false)
                // console.log("Login Success==> ", JSON.stringify(result));
                if (result.status == 200) {
                    Toast.show(result.data.message, Toast.LONG);
                    await AsyncStorage.setItem('UserID', result.data.user_id + '');
                    await AsyncStorage.setItem('Customer', true + '');
                    navigation.replace('HomeDrawer')
                }
            }).catch((error) => {
                // console.log("false----->", error)
                setIsLoading(false)
                if (error.status == 401) {
                    Toast.show(error.message, Toast.LONG);
                } else if (error.status == 500) {
                    Toast.show(error.message, Toast.LONG);
                } else {
                    Toast.show(error.message, Toast.LONG);
                }
            });
        }
    };

    return (
        <SafeAreaView>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={{ height: Height, width: Width, flex: 1 }}>
                    <View style={{ height: "20%", width: Width, flexDirection: "row", top: 60, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../../../assets/logo_login.png')}
                            style={{ width: Width, height: Height / 3, resizeMode: 'contain' }}
                        />
                    </View>
                    <View style={{
                        height: "20%", margin: 5, justifyContent: 'flex-end', alignItems: 'center', width: Width
                    }}>
                        <CustomTextInput placeholder='     Enter your Username' value={username}
                            onChangeText={setUsername}
                        />
                    </View>

                    <View style={{
                        height: "20%", margin: 5, alignItems: 'center', width: Width, marginTop: 20
                    }}>
                        <CustomTextInput placeholder='     Enter your Password' value={password} onChangeText={setPassword}
                            secureTextEntry={visible} onSubmitEditing={handleLogin}
                        />
                        <View style={{ position: "absolute", right: 50, top: 15 }}>
                            <Ionicons onPress={() => setvisible(!visible)} style={{ color: "orange" }}
                                name={visible ? "eye-off-outline" : "eye-outline"}
                                size={24}
                            />
                        </View>
                    </View>

                    <View style={{
                        height: "8%", margin: 5, alignItems: 'center', width: Width, justifyContent: 'center', top: -60
                    }}>
                        <CustomButton onPress={handleLogin} text="Login" />
                    </View>
                </LinearGradient>
            </ScrollView>
            {isLoading ? (<LoadingIndicator />) : null}
        </SafeAreaView>

    );
};
export default LoginScreen;