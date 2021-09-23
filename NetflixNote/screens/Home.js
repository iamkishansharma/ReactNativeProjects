import React from 'react';
import {Text, StyleSheet, StatusBar, ScrollView} from 'react-native';
import {FAB} from 'react-native-elements';

const Home = ({navigation, route}) => {
  return (
    <>
      <StatusBar backgroundColor="#9e00c5" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Welcome! HOME</Text>
        <FAB
          onPress={() => {
            navigation.navigate('Add');
            // do something
          }}
          size="small"
          placement="right"
          icon={{name: 'add', color: 'white'}}
          color="#ff5bff"
          style={styles.fabStyle}
        />
      </ScrollView>
    </>
  );
};
export default Home;

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabStyle: {
    borderColor: '#ff5bff',
    borderWidth: 10,
    borderRadius: 100,
    elevation: 10,
  },

  container: {
    backgroundColor: '#120E43',
    // backgroundColor:'#ff5bff',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    // color: '#00b7c2',
    color: 'white',
    fontSize: 30,
    marginVertical: 15,
    marginHorizontal: 5,
  },
  acationButton: {
    marginLeft: 5,
  },
  seasonName: {
    color: '#fdcb9e',
    textAlign: 'justify',
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 20,
  },
});
