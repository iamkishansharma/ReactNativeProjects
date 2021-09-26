import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import Constants from '../Constants';
import randomColor from 'randomcolor';

let COLOR = randomColor({luminosity: 'light', hue: 'purple'});
const Edit = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [image, setImage] = useState('');
  const [color, setColor] = useState('');
  const [id, setId] = useState();

  const updateDetails = async () => {
    if (!name.trim() || !email.trim() || !dob.trim()) {
      return Constants.SnackbarNotify('warning', null);
    }

    try {
      // Saving the values
      //All data saved
      await Axios.put(
        `${Constants.BASE_URL}/update/${id}/${Constants.API_KEY}`,
        null,
        {
          headers: {
            'Content-Type': 'text/plain;',
          },
          params: {
            name: name,
            email: email,
            dob: dob,
            image: image,
          },
        },
      )
        .then(response => {
          Constants.SnackbarNotify('success', null);
        })
        .catch(error => {
          Constants.SnackbarNotify('failed', error);
        });
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

    setId(id);
    setName(name);
    setEmail(email);
    setDob(dob);
    setImage(image);
  }, []);

  return (
    <View style={(styles.container, {backgroundColor: 'white',flex:1})}>
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingHorizontal: 10}}>
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
        <TouchableOpacity
          onPress={updateDetails}
          style={{
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.buttonSave}>
            {/* <Icon
              style={{marginRight: 5}}
              name="check"
              size={30}
              color="blue"
            /> */}
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 20}}>
              Save
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
    color: 'black',
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 5,
  },
  input: {
    flexWrap: 'wrap',
    marginBottom: 20,
    borderWidth: 0.9,
    padding: 15,
    borderRadius: 10,
    borderColor: 'pink',
    backgroundColor: '#ff9999',
    fontWeight: '400',
    fontSize: 18,
    elevation: 10,
  },
  buttonSave: {
    backgroundColor: COLOR,
    borderRadius: 10,
    flexDirection: 'row',
    paddingVertical: 15,
    elevation: 10,
    marginTop: 50,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
