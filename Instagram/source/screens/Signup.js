import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import Button from '../components/Button';
import Input from '../components/Input';
import SocialIcon from '../components/SocialIcon';

const Signup = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
      style={{backgroundColor: '#fff'}}>
      <TouchableOpacity
        style={{
          backgroundColor: '#ff9999',
          width: 180,
          height: 180,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
          borderWidth: 5,
        }}>
        {/* <Avatar size={130} source={require('../../assets/insta_logo.png')} /> */}
        <Icon name="wallpaper" color="white" size={60} />
        <Text> Upload you picture</Text>
      </TouchableOpacity>
      <Input
        placeholderText="Username"
        iconName="form"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        placeholderText="Full Name"
        iconName="user"
        keyboardType="default"
        autoCapitaliz="words"
        autoCorrect={false}
      />
      <Input
        placeholderText="Email"
        iconName="mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        placeholderText="Password"
        iconName="lock"
        secureTextEntry={true}
      />
      <Input
        placeholderText="Country"
        iconName="home"
        keyboardType="default"
        autoCapitalize="words"
        autoCorrect={false}
      />
      <Input
        placeholderText="Bio"
        iconName="idcard"
        keyboardType="default"
        noOfLines={5}
        autoCapitalize="sentences"
        autoCorrect={false}
      />
      <Button buttonTitle="Sign up" />
      <TouchableOpacity></TouchableOpacity>
      <View style={{flexDirection: 'row', marginVertical: 30}}>
        <Text style={[styles.forgotPws, {color: 'black', padding: 5}]}>
          Already have an account?{' '}
        </Text>
        <TouchableOpacity>
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

export default Signup;

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
