import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';

// React-redux hooks
import {useDispatch, connect} from 'react-redux';

import propTypes from 'prop-types';
import {signOut} from '../redux/action/auth';
import {winHeight, winWidth} from '../utils/Constants';

const CustomHeader = ({signOut, authState, navigation}) => {
  return (
    authState.isAuthenticated && (
      <Header
        backgroundColor="white"
        elevated
        placement="left"
        // centerComponent={{text: 'Instagram', style: {color: '#fff',fontSize:22}}}
        centerComponent={
          <Image
            style={{width: 200, height: 10}}
            source={require('../../assets/insta_text.png')}
            width={winWidth / 3}
            height={winHeight / 20}
          />
        }
        rightComponent={
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('AddPost');
              }}>
              <Icon name="edit" size={40} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginHorizontal: 5, alignItems: 'center'}}
              onPress={() => {
                /// Log OUT HERE
                signOut();
              }}>
              <Icon name="log-out" size={40} color="red" />
            </TouchableOpacity>
          </View>
        }
      />
    )
  );
};
// Redux
const mapStateToProps = state => ({
  authState: state.auth,
});

const mapDispatchToProps = {
  signOut,
};

CustomHeader.proptypes = {
  signOut: propTypes.object.isRequired,
  authState: propTypes.object.isRequired,
};

// REDUX style export
export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
    color: 'yellow',
  },
});
