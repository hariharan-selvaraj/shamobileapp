// LoadingIndicator.js
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingIndicator = () => (
    <View
        style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            justifyContent: "center",
            alignSelf: "center",
            backgroundColor: 'transparent',
            top: 50
        }}
    >
        <ActivityIndicator
            size={40}
            color={"red"}
            backgroundColor={"transparent"}
        />
    </View>
);

export default LoadingIndicator;