import React from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';

const Add = () => {
  return (
    <>
      <StatusBar backgroundColor="red" />
      <View style={styles.container}>
        <Text style={styles.heading}>ADD Screen</Text>
      </View>
    </>
  );
};
export default Add;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    fontSize:30,
    marginTop: 50,
    marginBottom: 20,
    marginHorizontal: 5,
  },
  formItem: {
    marginBottom: 20,
  },
});
