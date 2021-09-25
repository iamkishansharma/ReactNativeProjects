import React, {useState, useRef, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

const Add = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [dob, setDob] = useState(new Date('01/01/2021'));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showValue, setShowValue] = useState(false);
  const [receivedColor, setReceivedColor] = useState('');

  const ref_input2 = useRef();
  const ref_input3 = useRef();

  const addUsersToAPI = async () => {
    try {
      if (!name.trim() || !email.trim() || !dob.toString().trim()) {
        return Snackbar.show({
          duration: Snackbar.LENGTH_SHORT,
          text: 'Sorry! All fields are required. 🚨',
          backgroundColor: 'pink',
          textColor: 'red',
        });
      }

      const usersToAdd = {
        name: name,
        email: email,
        dob: dob,
        image: image,
      };

      // Saving the values to API =============== TODO

      console.log('Data saved. Navigating to Home....');

      //All data saved
      // GOTO Home Screen
      navigation.navigate('Home');
    } catch (err) {
      console.error(err);
    }
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShow(Platform.OS === 'ios');
    setDob(currentDate);
    setShowValue(true);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  useEffect(() => {
    const {color} = route.params;
    setReceivedColor(color);
  }, []);

  return (
      <View style={(styles.container, {backgroundColor: receivedColor,flex:1})}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingHorizontal: 10}}>
          <Text style={styles.heading}>Your favorite !</Text>
          <TextInput
            returnKeyType="next"
            onSubmitEditing={() => ref_input2.current.focus()}
            style={styles.input}
            value={name}
            onChangeText={text => {
              setName(text);
            }}
            placeholder="John Cena"
            keyboardType="default"
          />
          <TextInput
            returnKeyType="next"
            onSubmitEditing={() => ref_input3.current.focus()}
            ref={ref_input2}
            style={styles.input}
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
            placeholder="John@cena.com"
            keyboardType="email-address"
          />
          <TextInput
            ref={ref_input3}
            editable={true}
            style={styles.input}
            showSoftInputOnFocus={false}
            value={
              showValue
                ? `${dob.getDate()}/${dob.getMonth() + 1}/${dob.getFullYear()}`
                : ''
            }
            onChangeText={text => {
              setDob(text);
            }}
            placeholder="01/12/1998"
            // onChangeText={text => setDob(new Date(text).getDate())}
            onPressIn={showDatepicker}
            keyboardType="numbers-and-punctuation"
          />
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dob}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <TextInput
            returnKeyType="done"
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
            title="Add"
            onPress={addUsersToAPI}
            titleStyle={{color: 'pink', fontSize: 20}}
            buttonStyle={styles.buttonAdd}
          />
        </ScrollView>
      </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#2d2d2d',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#fff',
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
