// Header.js

import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get("window");

const Header = ({ onPress,onPress1,label }) => {
  return (
    <View style={{ width: '100%', height: height / 100 * 8, backgroundColor: '#000009', alignItems: 'center', flexDirection: 'row' }}>
      <Icons name="bars" size={25} color="orange" style={{ marginLeft: '4%' }} onPress={onPress} />
      <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold', marginLeft: 20 }}>{label}</Text>
      <TouchableOpacity onPress={onPress1}>
        <FontAwesome size={25} color="orange" name="logout" style={{ marginLeft: '74%' }} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;