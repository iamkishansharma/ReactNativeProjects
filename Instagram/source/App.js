import React, {useEffect} from 'react';

// important imports for navigation
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// React-redux hooks
import {useDispatch, connect} from 'react-redux';

// BRING IN ALL SCREENS
import Home from './screens/Home';
import AddPost from './screens/AddPost';
import Login from './screens/Login';
import Signup from './screens/Signup';
import CustomHeader from './components/CustomHeader';
import LoaderContainer from './components/LoaderContainer';

// Utils
import {requestPermission} from './utils/AskPermission';

// important imports for Firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

// redux
import {SET_USER, IS_AUTHENTICATED} from './redux/action/action.types';

import {StatusBar} from 'react-native';
const Stack = createNativeStackNavigator();

const App = ({authState}) => {
  const dispatch = useDispatch();

  const onAuthStateChanged = user => {
    if (user) {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: true,
      });

      console.log('App js....' + user._user.uid);

      database()
        .ref(`/users/${user._user.uid}`)
        .on('value', snapshot => {
          console.log('User details....' + snapshot.val());

          dispatch({
            type: SET_USER,
            payload: snapshot.val(),
          });
        });
    } else {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: false,
      });
    }
  };

  useEffect(() => {
    requestPermission();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // If loading show the loading screen
  if (authState.loading) {
    return <LoaderContainer />;
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#ff9999" barStyle="dark-content" />
      <Stack.Navigator
        screenOptions={{
          header: props => <CustomHeader {...props} />,
        }}>
        {authState.isAuthenticated ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddPost" component={AddPost} />
          </>
        ) : (
          /// Else
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        )}
        {/* <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: {backgroundColor: '#ff9999'},
            title: 'Instagram Home',
            headerTitleStyle: {
              fontSize: 20,
            },
            headerTintColor: '#000',
            headerTitleAlign: 'center',
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({
  authState: state.auth,
});

export default connect(mapStateToProps)(App);
