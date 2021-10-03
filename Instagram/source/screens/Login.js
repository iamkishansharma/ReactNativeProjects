import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {winHeight} from '../../Constants';
import Button from '../components/Button';
import Input from '../components/Input';
import SocialIcon from '../components/SocialIcon';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
      style={{backgroundColor: '#fff'}}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Image
        style={{
          height: winHeight / 5,
          resizeMode: 'center',
        }}
        source={require('../../assets/insta_logo.png')}
      />
      <Image
        style={{
          height: winHeight / 5,
          resizeMode: 'center',
        }}
        source={require('../../assets/insta_text.png')}
      />

      <Input
        placeholderText="Email"
        iconName="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        placeholderText="Password"
        iconName="lock"
        secureTextEntry={true}
      />
      <Button buttonTitle="Log in" />
      <TouchableOpacity>
        <Text style={styles.forgotPws}>Forgot password?</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', marginVertical: 30}}>
        <Text style={[styles.forgotPws, {color: 'black', padding: 5}]}>
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity>
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

export default Login;
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
});
