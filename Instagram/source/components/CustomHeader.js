import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

// React-redux hooks
import {useDispatch, connect} from 'react-redux';

import propTypes from 'prop-types';
import {signIn, signOut} from '../redux/action/auth';

const CustomHeader = ({signOut, authState, navigation}) => {
  return (
    <Header
      placement="left"
      leftComponent={
        <TouchableOpacity>
          <Icon name="home" color="white" />
        </TouchableOpacity>
      }
      centerComponent={{text: 'Instagram', style: {color: '#fff'}}}
      rightComponent={
        authState.isAuthenticated && (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginHorizontal: 5, backgroundColor: 'green'}}
              onPress={() => {
                navigation.navigate('AddPost');
              }}>
              <Text style={{fontSize: 25, fontWeight: 'bold'}}>Add Post</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginHorizontal: 5, backgroundColor: 'red'}}
              onPress={() => {
                /// Log OUT HERE
                signOut();
              }}>
              <Icon name="closecircleo" color="white" />
            </TouchableOpacity>
          </View>
        )
      }
    />
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
export default connect(mapDispatchToProps, mapDispatchToProps)(CustomHeader);
const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
    color: 'yellow',
  },
});
