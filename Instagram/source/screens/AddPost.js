import React from 'react';
import {StyleSheet,Text} from 'react-native';

const AddPost = () => {
  return (
    <>
      <Text style={styles.header}>Add post</Text>
    </>
  );
};
export default AddPost;

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
    color: 'red',
  },
});
