import React, {Component} from 'react';
import {Text, View, Animated, TouchableOpacity, Linking} from 'react-native';
import {Avatar, LinearProgress} from 'react-native-elements';
import randomColor from 'randomcolor';

import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import Clipboard from '@react-native-community/clipboard';
export default class Constants extends Component {
  constructor() {}
}

export const URL = 'https://api.github.com/users';
export const ITEM_SIZE = 140;
export const TEXT_COLOR = 'black';
export const LIST_TEXT_COLOR = 'black';
export const BG_COLOR = randomColor({
  luminosity: 'light',
  hue: 'blue',
});

export const ListItem = ({scale, user, color}) => (
  <Animated.View
    style={{
      transform: [{scale}],
      flex: 1,
      marginHorizontal: 20,
      borderRadius: 10,
      marginBottom: 10,
      backgroundColor: color,
      elevation: 5,
    }}>
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        padding: 16,
      }}>
      <TouchableOpacity
        style={{
          padding: 0,
          marginEnd: 5,
          justifyContent: 'center',
        }}
        onPress={() => {
          user.repo.url == null || user.repo.url == ''
            ? Snackbar.show({
                text: 'URL not available for this commit',
              })
            : Linking.openURL(
                user.repo.url.replace('api.', '').replace('/repos', ''),
              );
        }}>
        <Avatar
          icon={{name: 'web', color: 'black'}}
          rounded
          //   title="KS"
          size={100}
          source={{uri: user.actor.avatar_url}}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          ////// ON CLICK
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          flex: 1,
          alignContent: 'stretch',
        }}>
        <Text style={{color: LIST_TEXT_COLOR}}>
          Date: {user.created_at.replace('Z', ' ').replace('T', '  Time:')}
        </Text>
        <Text style={{color: LIST_TEXT_COLOR}}>Action: {user.type}</Text>
        <Text style={{color: LIST_TEXT_COLOR}}>
          SHA :
          {user.payload.ref !== null ||
          user.payload.commits !== null &&
          user.payload.commits.length !== 0 ||
          user.payload.ref !== 'main'
            ? user.payload.commits.map(a => a.sha.substring(0, 7))
            : user.payload.description}
        </Text>
        <Text style={{color: LIST_TEXT_COLOR}}>
          User: @{user.actor.display_login}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 0,
          marginStart: 5,
          justifyContent: 'center',
        }}
        onPress={() => {
          Snackbar.show({
            text: 'SHA copied to cipboard  ✅',
            duration: Snackbar.LENGTH_SHORT,
          });
          Clipboard.setString(user.payload.commits[0].sha);
        }}>
        <Icon name="clipboard" color="gray" size={30} />
      </TouchableOpacity>
      {/*Put New elements*/}
    </View>
  </Animated.View>
);
