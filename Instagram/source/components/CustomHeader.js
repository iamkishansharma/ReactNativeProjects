import React from 'react';
import {StyleSheet, Text} from 'react-native';

const CustomHeader = () => {
  return (
    <>
      <Text style={styles.header}>Custom Header</Text>
    </>
  );
};
export default CustomHeader;
const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
    color: 'yellow',
  },
});
