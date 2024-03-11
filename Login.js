import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <View style={styles.container}>
            {/* Username TextInput */}
            <Text style = {{ fontSize : 20, fontWeight : 'bold', color : '#000000' }}>Username</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
            <Text style = {{ fontSize : 20, fontWeight : 'bold', color : '#000000' }}>Password</Text>
            {/* Password TextInput */}
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                value={password}
            />

            {/* Login Button */}
            <Button title="Login" onPress={handleLogin} />

        </View>
    );
};

// Styles for the components
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    input: {
        height: 45,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 12,
    },
});

// Export the component
export default LoginScreen;