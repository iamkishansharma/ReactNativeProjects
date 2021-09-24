import React from 'react';

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
            headerStyle: {backgroundColor: '#363636'},
            title: 'NetFlix Note',
            headerTitleStyle: {
              fontSize: 20,
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="Add"
          component={Add}
          options={{
            headerStyle: {backgroundColor: '#363636'},
            title: 'Add Note',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
          }}
        />

        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{
            headerStyle: {backgroundColor: '#363636'},
            title: 'Edit Note',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
