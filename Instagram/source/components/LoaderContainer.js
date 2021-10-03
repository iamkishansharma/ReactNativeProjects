import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LinearProgress} from 'react-native-elements';

const LoaderContainer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Loding....</Text>
      <LinearProgress />
    </View>
  );
};
export default LoaderContainer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignContent: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
    color: 'red',
  },
});
