import React from 'react';

// important imports for navigation
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// BRING IN ALL SCREENS
import Home from './screens/Home'; // GET
import Edit from './screens/Edit'; // PUT
import Add from './screens/Add'; // POST
import { StatusBar } from 'react-native';
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
            title: 'UsersApi - GET',
            headerTitleStyle: {
              fontSize: 20,
            },
            headerTintColor: '#000',
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="Add"
          component={Add}
          options={{
            headerStyle: {backgroundColor: '#ff9999'},
            title: 'Add User - POST',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerTintColor: '#000',
          }}
        />

        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{
            headerStyle: {backgroundColor: '#ff9999'},
            title: 'Edit User - PUT',
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
