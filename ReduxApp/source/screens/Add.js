import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, ScrollView, SafeAreaView} from 'react-native';
import {Button} from 'react-native-elements';
import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/FontAwesome';

import shortid from 'shortid';

// For Redux
import propTypes from 'prop-types';
import {addNote} from '../action/list';
import {connect} from 'react-redux';

import {BG_COLOR,BUTTON, TEXT_COLOR, ICON_COLOR} from '../../Constants';

const Add = ({navigation, addNote}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const addPressHandler = async () => {
    try {
      if (!name.trim() || !description.trim()) {
        return Snackbar.show({
          duration: Snackbar.LENGTH_SHORT,
          text: 'Sorry! All fields are required. 🚨',
          backgroundColor: 'pink',
          textColor: 'red',
        });
      }

      const noteToAdd = {
        id: shortid.generate(),
        name: name,
        description: description,
        isCompleted: false,
      };
      console.log(noteToAdd);

      addNote(noteToAdd);

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
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingHorizontal: 10}}>
          <Text style={styles.heading}>Please write something</Text>
          <TextInput
            style={styles.input}
            value={name}
            maxLength={40}
            onChangeText={text => {
              setName(text);
            }}
            placeholder="Title"
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => {
              setDescription(text);
            }}
            placeholder="Description"
            keyboardType="default"
          />
          <BUTTON
            title="Add"
            textColor="white"
            titleSize={20}
            backgroundColor="green"
            padding={10}
            marginBottom={20}
            borderRadius={10}
            onPress={() => addPressHandler()}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

//////// REDUX CONFIG ////////

const mapDispatchToProps = {
  addNote: data => addNote(data),
};
Add.propTypes = {
  addNote: propTypes.func.isRequired,
};

//////// REDUX EXPORT ////////
export default connect(null, mapDispatchToProps)(Add);

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#2d2d2d',
    backgroundColor: BG_COLOR,
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: TEXT_COLOR,
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
