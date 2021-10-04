import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {winHeight, winWidth} from '../utils/Constants';
import Button from '../components/Button';
import Input from '../components/Input';
import SocialIcon from '../components/SocialIcon';
import Snackbar from 'react-native-snackbar';

// Firebase
import auth from '@react-native-firebase/auth';

// React-redux hooks
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {signIn} from '../redux/action/auth';

const Login = ({navigation, signIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doSignIn = () => {
    if (email.trim().length == 0 || email.trim().length == 0) {
      console.log('LOGIN: Please check inputs');
      Snackbar.show({
        text: '🤷‍♂️ Invalid email or password. Please check your inputs.',
        textColor: 'white',
        backgroundColor: 'red',
        duration: Snackbar.LENGTH_LONG,
      });
    } else {
      console.log('LOGIN: successful.....');
      signIn({email, password});
    }
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{backgroundColor: '#fff'}}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Image
        style={{
          height: winHeight / 4,
          resizeMode: 'center',
        }}
        source={require('../../assets/login.png')}
      />
      <Image
        style={{
          height: winHeight / 10,
          resizeMode: 'center',
          marginBottom: 50,
        }}
        source={require('../../assets/insta_text.png')}
      />

      <Input
        placeholderText="Email"
        iconName="user"
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
      <Button buttonTitle="Log in" onPress={doSignIn} />
      <TouchableOpacity
        onPress={() => {
          Snackbar.show({
            text: 'COMING SOON...',
            textColor: 'white',
            backgroundColor:'purple',
            duration: Snackbar.LENGTH_LONG,
          });
        }}>
        <Text style={styles.forgotPws}>Forgot password?</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', marginVertical: '10%'}}>
        <Text style={[styles.forgotPws, {color: 'black', padding: 5}]}>
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigator.navigate('Signup')}>
          <Text
            style={[
              styles.forgotPws,
              {color: 'blue', padding: 5, fontWeight: 'bold'},
            ]}>
            Sign up
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
/// Redux setup

const mapDispatchToProps = {
  signIn: data => signIn(data),
};

Login.proptypes = {
  signIn: propTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: '10%',
    width: '50%',
    resizeMode: 'cover',
  },
  forgotPws: {
    fontSize: 16,
  },
});
