import React from 'react';
import {StyleSheet,Text} from 'react-native';

const PostItem = () => {
  return (
    <>
      <Text style={styles.header}>POST Image</Text>
      <Text style={styles.header}>POST Icons</Text>
      <Text style={styles.header}>POST comments</Text>
    </>
  );
};
export default PostItem;
const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
    color: 'yellow',
  },
});
