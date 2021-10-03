import React from 'react';
import {StatusBar, StyleSheet, Text} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="red" />
      <Text style={styles.header}>App</Text>
    </>
  );
};
export default App;

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'red',
  },
});
