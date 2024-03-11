import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import Toast from 'react-native-simple-toast';

const Logout = () => {
    const logoutConfirmation = async (navigation) => {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to logout?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => logoutUser(navigation) }
            ]
        );
    };

    const logoutUser = async (navigation) => {
        AsyncStorage.clear();
        AsyncStorage.setItem('Customer', 'false');
        Toast.show('You have logged out successfully', Toast.LONG);
        navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] });
    };
    return { logoutConfirmation };
};

export default Logout;