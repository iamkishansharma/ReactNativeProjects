import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';

export const signUp = data => async () => {
  console.log(data);
  const {name, email, password, instaUserName, bio, country, image} = data;

  // Signing up for new user
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response => {
      console.log('Signup Success... ' + response);
    })
    .catch(error => {
      console.log('Signup error... ' + error);
      Snackbar.show({
        text: 'Sign up failed !',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};
