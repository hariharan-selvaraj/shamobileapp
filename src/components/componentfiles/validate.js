import React from 'react';
import { TextInput, TouchableOpacity, Text } from 'react-native';
import variables from '../utils/Constants';

export const validateInput = (username, password) => {
    if (username === "") {
        return variables.USERNAME_MSG;
    } else if (password === "") {
        return variables.PWD_MSG;
    }
    return null; // Return null if validation passes
};

export const validateInputHome = (workID, category, avatarSource, title) => {
    if (workID == '') {
        return variables.WORKID_MSG;
    } else if (category == '') {
        return variables.CATEGORY_MSG;
    } else if (avatarSource.length == 0 || avatarSource == [] || avatarSource == undefined) {
        return variables.IMAGE_MSG;
    } else if (title == '') {
        return variables.CATEGORY_MSG;
    }
    return null; // Return null if validation passes
};

//Dashboard inputs
export const validateInputDashboard = (nameValue, nameValue1, inputText, avatarSource) => {
    if (nameValue == '' || nameValue == null || nameValue == undefined) {
        return variables.PROJTYPE_MSG;
    } else if (nameValue1 == '' || nameValue1 == null || nameValue1 == undefined) {
        return variables.PHOTYPE_MSG;
    } else if (inputText == '') {
        return variables.PROJNAME_MSG;
    } else if (avatarSource.length == 0 || avatarSource == [] || avatarSource == undefined) {
        return variables.IMAGE_MSG;
    }
    return null; // Return null if validation passes
};

export const CustomTextInput = ({ placeholder, value, onChangeText, secureTextEntry, onSubmitEditing }) => (
    <TextInput
        style={{ height: "35%", width: "80%", backgroundColor: "#F7F8F9", borderRadius: 5, borderColor: "#E8ECF4", borderWidth: 1, paddingLeft: 10 }}
        placeholder={placeholder}
        placeholderTextColor="#8391A1"
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={onSubmitEditing}
    />
);

export const CustomButton = ({ onPress, text }) => (
    <TouchableOpacity onPress={onPress} style={{ width: '80%', height: '80%', backgroundColor: '#00FFFF', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#000000', fontSize: 18, fontWeight: 'bold' }}>{text}</Text>
    </TouchableOpacity>
);

export const CustomHomeTextInput = ({ placeholder, value, onChangeText, keyboardType }) => (
    <TextInput
        style={{
            height: 50,
            width: '90%',
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 16,
            marginHorizontal: 20,
            marginTop: 10,
            backgroundColor: '#FFFFFF',
            borderRadius : 12
        }}
        placeholder={placeholder}
        placeholderTextColor="#8391A1"
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
    />
);