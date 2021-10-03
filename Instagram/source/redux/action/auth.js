import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';

export const signUp = data => async dispatch => {
  console.log(data);
  const {name, email, password, userName, bio, country, image} = data;

  // Signing up for new user
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response => {
      console.log('Signup Success.... ' + response);

      database()
        .ref('/users/' + response.user.uid)
        .set({
          image,
          userName,
          name,
          email,
          password,
          country,
          bio,
        })
        .then(res => {
          console.log('Data added successfully...' + res);
          Snackbar.show({
            text: 'Data added successfully !',
            textColor: 'white',
            backgroundColor: 'green',
          });
        });
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

export const signIn = data => async dispatch => {
  console.log(data);

  const {email, password} = data;

  auth()
    .signInWithEmailAndPassword(email.password)
    .then(response => {
      //
      console.log('Sign in successful.....\n' + response);
      Snackbar.show({
        text: 'Sign in successful.',
        textColor: 'white',
        backgroundColor: 'geen',
      });
    })
    .catch(error => {
      console.log('Sign in failed....' + error);
      Snackbar.show({
        text: 'Sign in failed !',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};

export const signOut = () => async dispatch => {
  auth()
    .signOut()
    .then(res => {
      console.log('Sign out successful....\n' + res);

      Snackbar.show({
        text: 'Signed out successful.',
        textColor: 'white',
        backgroundColor: 'green',
      });
    })
    .catch(error => {
      console.log('Sign out failed....' + error);
      Snackbar.show({
        text: 'Sign out failed !',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};
