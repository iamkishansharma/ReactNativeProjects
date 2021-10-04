import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Home = () => {
  return (
    <>
      <Text style={styles.header}>Home</Text>
      <Text style={styles.header}>Home</Text>
      <Text style={styles.header}>Home</Text>
    </>
  );
};
export default Home;
const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
    color: 'green',
  },
});
