import randomColor from 'randomcolor';
import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Snackbar from 'react-native-snackbar';
export const BG_COLOR = randomColor({
  luminosity: 'light',
  hue: 'pink',
});

export const STATUSBAR_COLOR = BG_COLOR;
export const HEADER_BG_COLOR = BG_COLOR;
export const TEXT_COLOR = 'black';
export const ICON_COLOR = 'red';
export const HEADER_TITLE_COLOR = 'black';

export const SNACKBAR = msg =>
  Snackbar.show({
    text: msg,
    textColor: !TEXT_COLOR,
    backgroundColor: 'red',
  });

export const BUTTON = ({
  title,
  titleSize,
  backgroundColor,
  textColor,
  margin,
  padding,
  borderRadius,
  onPress,
  marginBottom,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          margin: margin,
          borderRadius: borderRadius,
          backgroundColor: backgroundColor,
          color: textColor,
          fontSize: titleSize,
          textAlign: 'center',
          fontWeight: 'bold',
          padding: padding,
          marginBottom: marginBottom,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
