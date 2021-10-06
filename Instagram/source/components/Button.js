import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {winWidth, winHeight} from '../utils/Constants';

const Button = ({buttonTitle, enableColor, bgColor, ...rest}) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        {backgroundColor: enableColor ? bgColor : '#2e64e5'},
      ]}
      {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 20,
    elevation: 8,
    shadowColor: 'blue',
    width: '100%',
    height: winHeight / 15,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
