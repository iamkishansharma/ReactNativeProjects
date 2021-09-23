import React from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';

const Edit = () => {
  return (
    <>
      <StatusBar backgroundColor="yellow" />
      <View style={styles.container}>
        <Text style={styles.heading}>EDIT Screen</Text>
      </View>
    </>
  );
};
export default Edit;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    fontSize: 30,
    marginTop: 50,
    marginBottom: 20,
    marginHorizontal: 5,
  },
  formItem: {
    marginBottom: 20,
  },
});
