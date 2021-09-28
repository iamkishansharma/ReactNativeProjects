import React from 'react';

// important imports for navigation
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// BRING IN ALL SCREENS
import Home from './screens/Home'; // GET
import Details from './screens/Details'; // GET

import {StatusBar} from 'react-native';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#ff9999" barStyle="dark-content" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: {backgroundColor: '#ff9999'},
            title: 'GitHub Users',
            headerTitleStyle: {
              fontSize: 20,
            },
            headerTintColor: '#000',
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerStyle: {backgroundColor: '#ff9999'},
            title: 'Profile',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerTintColor: '#000',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
