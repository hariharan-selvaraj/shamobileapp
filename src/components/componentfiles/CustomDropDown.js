// CustomDropDown.js

import React from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const CustomDropDown = ({
  open,
  value,
  items,
  setOpen,
  setValue,
  setItems,
  placeholder,
  onSelectItem,
  zIndex,
  zIndexInverse
}) => {
  return (
    <View style={{ width: '90%', marginTop: '2%', marginLeft: 20 }}>
      <DropDownPicker
        listMode="SCROLLVIEW"
        style={{ width: '100%', marginLeft: 0 }}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={placeholder}
        onSelectItem={onSelectItem}
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
      />
    </View>
  );
};

export default CustomDropDown;