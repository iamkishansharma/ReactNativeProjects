import React from 'react';
import {FAB, LinearProgress} from 'react-native-elements';

import {Text, StyleSheet, View, StatusBar} from 'react-native';
import {createStore, applyMiddleware} from 'redux';

// For navigation
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

/// IMPORTANT FOR REDUX
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '../source/store/store';
// Screens
import Home from '../source/screens/Home';
import Add from '../source/screens/Add';

const Stack = createNativeStackNavigator();

// CONSTANTS
import {
  STATUSBAR_COLOR,
  HEADER_BG_COLOR,
  BG_COLOR,
  HEADER_TITLE_COLOR,
} from '../Constants';
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <StatusBar backgroundColor={STATUSBAR_COLOR} barStyle="dark-content" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerStyle: {backgroundColor: HEADER_BG_COLOR},
                title: 'YOUR NOTES',
                headerTitleStyle: {
                  fontSize: 22,
                },
                headerTintColor: HEADER_TITLE_COLOR,
                headerTitleAlign: 'center',
              }}
            />

            <Stack.Screen
              name="Add"
              component={Add}
              options={{
                headerStyle: {backgroundColor: HEADER_BG_COLOR},
                title: 'ADD NOTE',
                headerTitleStyle: {
                  fontSize: 22,
                },
                headerTitleAlign: 'center',
                headerTintColor: HEADER_TITLE_COLOR,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
