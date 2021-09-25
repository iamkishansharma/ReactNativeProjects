import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {Button} from 'react-native-elements';
import Snackbar from 'react-native-snackbar';

import Icon from 'react-native-vector-icons/FontAwesome';

const Edit = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [image, setImage] = useState('');
  const [color, setColor] = useState('');

  const updateDetails = async () => {
    //kl   😏😥🚩
    try {
      if (!name.trim() || !email.trim() || !dob.trim()) {
        return Snackbar.show({
          duration: Snackbar.LENGTH_SHORT,
          text: ' Sorry! All fields are required. 🚨',
          backgroundColor: 'pinnk',
          textColor: 'red',
        });
      }

      const userToUpdate = {
        name: name,
        email: email,
        dob: dob,
        image: image,
      };

      // Saving the values

      //All data saved ============== TODO
      console.log('Data updated. Navigating to Home....');

      // GOTO Home Screen
      navigation.navigate('Home');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const {user, color} = route.params;
    const {id, name, email, dob, image} = user;
    setColor(color);

    setName(name);
    setEmail(email);
    setDob(dob);
    setImage(image);
  }, []);

  return (
    <>
      <View style={(styles.container , {backgroundColor: color})}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingHorizontal: 10}}>
          <Text style={styles.heading}>
            Edit:{'\n'}
            {name}
          </Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={text => {
              setName(text);
            }}
            placeholder="John Cena"
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
            placeholder="john@cena.com"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            value={dob}
            onChangeText={text => {
              setDob(text);
            }}
            placeholder="09/24/2021"
            keyboardType="numbers-and-punctuation"
          />
          <TextInput
            style={styles.input}
            value={image}
            onChangeText={text => {
              setImage(text);
            }}
            placeholder="https://ecample.com/image.jpg"
            keyboardType="url"
          />
          <Button
            icon={
              <Icon
                style={{marginRight: 5}}
                name="check"
                size={25}
                color="pink"
              />
            }
            title="Save"
            onPress={updateDetails}
            titleStyle={{color: 'pink', fontSize: 20}}
            buttonStyle={styles.buttonSave}
          />
          <Image source={require('../assets/doge.png')} />
        </ScrollView>
      </View>
    </>
  );
};
export default Edit;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: 'white',
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
  buttonSave: {
    backgroundColor: '#3d3d3d',
    borderRadius: 10,
    borderColor: 'pink',
    borderWidth: 0,
    padding: 15,
    alignSelf: 'stretch',
  },
});
