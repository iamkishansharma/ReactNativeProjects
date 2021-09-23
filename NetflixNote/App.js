import React from 'react';
import {Text, StyleSheet, StatusBar} from 'react-native';

// important imports for navigation
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// BRING IN ALL SCREENS
import Home from './screens/Home';
import Edit from './screens/Edit';
import Add from './screens/Add';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: {backgroundColor: '#d500f9'},
            title: 'NetFlix Note',
            headerTitleStyle: {textAlign: 'center', color: '#0b7c2'},
            // headerTitleStyle: {textAlign: 'center', color: '#0b7c2'},
          }}
        />

        <Stack.Screen
          name="Add"
          component={Add}
          options={{
            headerStyle: {backgroundColor: '#0f4c75'},
            title: 'NetFlix Note',
            headerTitleStyle: {textAlign: 'center', color: '#0b7c2'},
          }}
        />

        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{
            headerStyle: {backgroundColor: '#0f4c75'},
            title: 'NetFlix Note',
            headerTitleStyle: {textAlign: 'center', color: '#0b7c2'},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
