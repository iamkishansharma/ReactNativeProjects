import React, {useState} from 'react';
import {
  Text,
  Image,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import SocialIcon from '../components/SocialIcon';

import ProgressBar from 'react-native-progress/Bar';
import * as ImagePicker from 'react-native-image-picker';
import {options} from '../utils/options';

// Firebase
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

// React-redux hooks
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {signUp} from '../redux/action/auth';
import Snackbar from 'react-native-snackbar';

const Signup = ({navigation, signUp}) => {
  const [userName, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png',
  );

  const [imageUploading, setImageUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const chooseImage = async () => {
    console.log('Image picker called....');
    ///CE22484879
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Image picker response.....' + response);
      if (response.didCancel) {
        console.log('User cancled ImagePicker..>' + response);
      } else {
        console.log('ImagePicker Not error.....' + response);
        uploadImage(response);
      }
    });
  };

  const uploadImage = async response => {
    console.log('Image upload called....');
    // get image path from response
    setImageUploading(true);
    const userId = auth().currentUser().uid;
    const storageRefrence = storage().ref(`/users/${userId}/profile`);

    const task = storageRefrence.putFile(response.assets[0].uri);
    task.on('state_changed', taskSnapshot => {
      const percentage =
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 1000;
      // setting upload status
      setUploadStatus(percentage);
    });

    task.then(async () => {
      const url = await storageRefrence.getDownloadURL();
      setImage(url);
      setImageUploading(false);
    });
  };
  const doSignUp = async () => {
    //
    if (!userName || !email || !name || !country || !image || !bio) {
      Snackbar.show({
        text: 'All fields are required.',
        textColor: 'white',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_LONG,
      });
    } else {
      signUp({image, userName, name, password, email, country, bio});
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
      style={{backgroundColor: '#fff'}}>
      {imageUploading ? (
        <ProgressBar progress={uploadStatus} style={styles.progress} />
      ) : (
        <>
          <TouchableOpacity
            style={{
              backgroundColor: '#ff9999',
              width: 180,
              height: 180,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
              borderWidth: 5,
            }}
            onPress={chooseImage}>
            {/* <Avatar size={130} source={{uri: image}} /> */}
            <Image
              source={{uri: image}}
              width={1}
              height={1}
              style={{height: '100%', width: '100%', margin: 5}}
            />
          </TouchableOpacity>
        </>
      )}
      <Input
        placeholderText="Username"
        iconName="form"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
        value={userName}
        onChangeText={text => setUsername(text)}
      />
      <Input
        placeholderText="Full Name"
        iconName="user"
        keyboardType="default"
        autoCapitaliz="words"
        autoCorrect={false}
        value={name}
        onChangeText={text => setName(text)}
      />
      <Input
        placeholderText="Email"
        iconName="mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        placeholderText="Password"
        iconName="lock"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Input
        placeholderText="Country"
        iconName="home"
        keyboardType="default"
        autoCapitalize="words"
        autoCorrect={false}
        value={country}
        onChangeText={text => setCountry(text)}
      />
      <Input
        placeholderText="Bio"
        iconName="idcard"
        keyboardType="default"
        noOfLines={5}
        autoCapitalize="sentences"
        autoCorrect={false}
        value={bio}
        onChangeText={text => setBio(text)}
      />
      <Button buttonTitle="Sign up" onPress={doSignUp} />

      <View style={{flexDirection: 'row', marginVertical: 30}}>
        <Text style={[styles.forgotPws, {color: 'black', padding: 5}]}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text
            style={[
              styles.forgotPws,
              {color: '#2e64e5', padding: 5, fontWeight: 'bold'},
            ]}>
            Log in
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{marginTop: 30}}>Continue with </Text>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <SocialIcon name="facebook" color="#2e64e5" />
        <SocialIcon name="github" color="black" />
        <SocialIcon name="google" color="red" />
      </View>
    </ScrollView>
  );
};
// Redux setup

const mapDispatchToProps = {
  signUp: data => signUp(data),
};

Signup.proptypes = {
  signUp: propTypes.func.isRequired,
};

// Redux style export
export default connect(null, mapDispatchToProps)(Signup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 120,
    width: '80%',
    resizeMode: 'cover',
  },
  forgotPws: {
    fontSize: 16,
  },
  progress: {width: '100%', marginBottom: 20},
  formItem: {
    marginBottom: 20,
  },
});
