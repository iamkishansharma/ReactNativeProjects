import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import ProgressBar from 'react-native-progress/Bar';
import * as ImagePicker from 'react-native-image-picker';
import {options} from '../utils/options';
import Input from '../components/Input';

// Firebase import
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

// Redux import
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import shortid from 'shortid';
import {winHeight, winWidth} from '../utils/Constants';
import Button from '../components/Button';

const AddPost = ({navigation, userState}) => {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(
    'https://icons-for-free.com/iconfiles/png/512/cloud+upload+file+storage+upload+icon-1320190558968694328.png',
  );

  const [imageUploading, setImageUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const chooseImage = async () => {
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
    // get image path from response
    setImageUploading(true);
    const userId = auth().currentUser.uid;
    const storageRefrence = storage().ref(
      `/users/${userId}/posts/${shortid.generate()}`,
    );

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
  const postPost = async () => {
    // Add post to database

    try {
      if (!location || !description) {
        return Snackbar.show({
          duration: Snackbar.LENGTH_LONG,
          text: 'All fields are required',
          textColor: 'white',
          backgroundColor: 'red',
        });
      }

      const uuid = shortid.generate();
      await database().ref(`/posts/${uuid}`).set({
        location: location,
        description: description,
        picture: image,
        by: userState.name,
        likes: 0,
        date: Date.now,
        instaId: userState.userName,
        userImage: userState.image,
        uid: uuid,
      });
      console.log('Post added....');
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      Snackbar.show({
        duration: Snackbar.LENGTH_LONG,
        text: error.message,
        textColor: 'white',
        backgroundColor: 'red',
      });
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      }}
      style={{backgroundColor: '#fff'}}>
      {imageUploading ? (
        <ProgressBar progress={uploadStatus} style={styles.progress} />
      ) : (
        <>
          <TouchableOpacity
            style={{
              backgroundColor: 'pink',
              width: '100%',
              height: winHeight / 3,
              marginVertical: 20,
              borderRadius: 10,
              elevation: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
            }}
            onPress={chooseImage}>
            <Image
              source={{uri: image}}
              width={1}
              height={1}
              style={{height: '100%', width: '100%', margin: 5}}
            />
            {/* <Icon name="wallpaper" color="white" size={60} /> */}
          </TouchableOpacity>
        </>
      )}

      <Input
        iconName="notification"
        placeholderText="Mount Valley, New York"
        returnKeyType="next"
        labelValue={location}
        onChangeText={text => {
          setLocation(text);
        }}
        autoFocus={true}
        blurOnSubmit={false}
      />
      <Input
        labelValue={description}
        onChangeText={text => {
          setDescription(text);
        }}
        noOfLines={3}
        iconName="profile"
        placeholderText="Happy Winter"
        returnKeyType="done"
        enableHeight={true}
        inputHeight={120}
        maxLength={100}
      />
      <TextInput placeholder="gggggg" />

      <Button
        onPress={postPost}
        buttonTitle="Post"
        enableColor={true}
        bgColor="red"
      />
    </ScrollView>
  );
};

// Redux setup
const mapStateToProps = state => ({
  userState: state.auth.user,
});

AddPost.proptypes = {
  userState: propTypes.object.isRequired,
};

// redux style export
export default connect(mapStateToProps)(AddPost);

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
    color: 'red',
  },
  progress: {width: '100%', marginVertical: 30, marginHorizontal: 20},
});
