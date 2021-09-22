import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Icons = ({name}) => {
  switch (name) {
    case `circle`:
      return <Icon name="circle-thin" size={45} color="#0D0D0D" />;

    case `cross`:
      return <Icon name="times" size={45} color="red" />;

    default:
      return <Icon name="pencil" size={45} color="#303030" />;
  }
};

export default Icons;
