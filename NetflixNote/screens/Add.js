import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import shortid from 'shortid';

const Add = ({navigation}) => {
  const [name, setName] = useState('');
  const [totalNoOfSeason, setTotalNoOfSeason] = useState('');

  const addPressHandler = async () => {
    try {
      if (!name.trim() || !totalNoOfSeason.trim()) {
        return Snackbar.show({
          duration: Snackbar.LENGTH_SHORT,
          text: 'Sorry! All fields are required. 🚨',
          backgroundColor: 'pink',
          textColor: 'red',
        });
      }

      const seriesToAdd = {
        id: shortid.generate(),
        name: name,
        totalNoOfSeason: totalNoOfSeason,
        isWatched: false,
      };

      // Saving the values
      const storedValue = await AsyncStorage.getItem('@series_list');
      const previousList = await JSON.parse(storedValue);
      if (!previousList) {
        const newList = [seriesToAdd];
        await AsyncStorage.setItem('@series_list', JSON.stringify(newList));
      } else {
        previousList.push(seriesToAdd);
        await AsyncStorage.setItem(
          '@series_list',
          JSON.stringify(previousList),
        );
      }

      console.log('Data saved. Navigating to Home....');

      //All data saved
      // GOTO Home Screen
      navigation.navigate('Home');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingHorizontal: 10}}>
          <Text style={styles.heading}>13 Reasons Why?</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={text => {
              setName(text);
            }}
            placeholder="Series Name"
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            value={totalNoOfSeason}
            onChangeText={text => {
              setTotalNoOfSeason(text);
            }}
            placeholder="No of seanons"
            keyboardType="numeric"
          />
          <Button
            onPress={addPressHandler}
            raised
            containerStyle={{borderRadius: 12}}
            icon={<Icon style={{marginRight:5}} name="check" size={25} color="pink" />}
            title="Add"
            titleStyle={{color: 'pink'}}
            buttonStyle={styles.buttonAdd}
          />
        </ScrollView>
      </View>
    </>
  );
};
export default Add;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2d2d2d',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 5,
  },
  input: {
    flexWrap: 'wrap',
    marginBottom: 20,
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    borderColor: 'pink',
    backgroundColor: '#212121',
    fontWeight: '400',
    fontSize: 18,
  },
  buttonAdd: {
    backgroundColor: '#3d3d3d',
    borderRadius: 10,
    borderColor: 'pink',
    borderWidth: 0,
    padding: 15,
    alignSelf: 'stretch',
  },
});
