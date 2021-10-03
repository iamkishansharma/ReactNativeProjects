import React from 'react';
import {View, TextInput, StyleSheet, SafeAreaView} from 'react-native';
import {winWidth, winHeight} from '../utils/Constants';

import AntDesign from 'react-native-vector-icons/AntDesign';

const Input = ({labelValue, placeholderText, iconName, noOfLines, ...rest}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <AntDesign name={iconName} size={25} color="#999" />
      </View>
      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={noOfLines}
        placeholder={placeholderText}
        placeholderTextColor="#999"
        {...rest}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 8,
    width: '100%',
    height: winHeight / 15,
    borderColor: '#ccc',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: winWidth / 1.5,
    height: winHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});
