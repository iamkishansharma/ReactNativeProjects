import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import Constants from '../Constants';
import randomColor from 'randomcolor';
let COLOR = randomColor({luminosity: 'light', hue: 'purple'});

const Add = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [dob, setDob] = useState(new Date('1998-12-10'));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showValue, setShowValue] = useState(false);

  const ref_input2 = useRef();
  const ref_input3 = useRef();

  const addUsersToAPI = async () => {
    if (!image.trim()) {
      setImage('Optional');
    }
    if (!name.trim() || !email.trim() || !dob.toString().trim()) {
      return Constants.SnackbarNotify('warning', null);
    }

    try {
      const usersToAdd = {
        name: name,
        email: email,
        dob: dob,
        image: image,
      };

      await Axios.post(
        `${Constants.BASE_URL}/add/${Constants.API_KEY}`,
        usersToAdd,
        {
          headers: {
            'Content-Type': 'application/json;',
          },
        },
      )
        .then(response => {
          Constants.SnackbarNotify('success', null);
        })
        .catch(error => {
          Constants.SnackbarNotify('failed', error);
        });

      // Saving the values to API
      console.log('Data saved. Navigating to Home....');

      //All data saved
      // GOTO Home Screen
      navigation.navigate('Home');
    } catch (err) {
      Constants.SnackbarNotify('failed', err);
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
  return (
    <View style={(styles.container, {backgroundColor: 'white', flex: 1})}>
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingHorizontal: 10}}>
        {/* <Card style={{borderRadius:20}} backgroundColor="red"></Card> */}
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
              ? `${dob.getFullYear()}-${dob.getMonth() + 1}-${dob.getDate()}`
              : ''
          }
          onChangeText={text => {
            setDob(text);
          }}
          placeholder="1999-11-20"
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
        <TouchableOpacity
          onPress={addUsersToAPI}
          style={{
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.buttonAdd}>
            {/* <Icon
              style={{marginRight: 5}}
              name="check"
              size={30}
              color="blue"
            /> */}
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 20}}>
              Add
            </Text>
          </View>
        </TouchableOpacity>
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
    color: '#000',
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 20,
    paddingVertical: 50,
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
  buttonAdd: {
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
