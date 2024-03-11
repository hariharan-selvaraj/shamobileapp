// UploadPhotoButton.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';

const UploadPhotoButton = ({ avatarSource, openCamera }) => {
  return (
    <TouchableOpacity onPress={avatarSource.length !== 0 ? null : openCamera} style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 20 }}>
      <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 18 }}>Upload Photo</Text>
      <Icons size={30} color="white" name="camera-retro" style={{ marginLeft: '5%' }} />
    </TouchableOpacity>
  );
};

export default UploadPhotoButton;