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
          console.log('Data added successfully...\\n' + res);
          Snackbar.show({
            text: 'Data added successfully !',
            textColor: 'white',
            backgroundColor: 'green',
          });
        });
    })
    .catch(error => {
      console.log('Signup error... ' + error.message);
      Snackbar.show({
        duration: Snackbar.LENGTH_LONG,
        text: error.message,
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};

export const signIn = data => async dispatch => {
  console.log(data);

  const {email, password} = data;

  if (email.length >= 5 && password.length >= 5) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        //
        console.log('Sign in successful.....\n' + response);
        Snackbar.show({
          text: 'Sign in successful.',
          textColor: 'white',
          backgroundColor: 'green',
        });
      })
      .catch(error => {
        console.log('Sign in failed....' + error.message);
        Snackbar.show({
          duration: Snackbar.LENGTH_LONG,
          text: error.message,
          textColor: 'white',
          backgroundColor: 'red',
        });
      });
  } else {
    Snackbar.show({
      text: '🤷‍♂️ Invalid email or password. Please check your inputs.',
      textColor: 'white',
      backgroundColor: 'red',
      duration: Snackbar.LENGTH_LONG,
    });
  }
};

export const signOut = () => async dispatch => {
  auth()
    .signOut()
    .then(res => {
      console.log('Sign out successful....\n' + res);

      Snackbar.show({
        text: 'Sign out successful.',
        textColor: 'white',
        backgroundColor: 'green',
      });
    })
    .catch(error => {
      console.log('Sign out failed....' + error);
      Snackbar.show({
        text: error.message,
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};
