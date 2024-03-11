import React from 'react';
import { Text } from 'react-native';

const CustomText = ({ style, children }) => {
  return <Text style={[{ fontSize: 18, color: 'white', fontWeight: 'bold', marginLeft: 20, marginTop: 8 }, style]}>{children}</Text>;
}

export default CustomText;