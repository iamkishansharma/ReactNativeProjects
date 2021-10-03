import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SocialIcon = ({name, color}) => {
  return (
    <TouchableOpacity>
      <Icon
        size={55}
        name={name}
        color={color}
        style={{paddingHorizontal: 10}}
      />
    </TouchableOpacity>
  );
};

export default SocialIcon;
