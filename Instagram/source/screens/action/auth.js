import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';

export const signUp = data => async () => {
  console.log(data);
  const {name, email, password, instaUserName, bio, country, image} = data;
};