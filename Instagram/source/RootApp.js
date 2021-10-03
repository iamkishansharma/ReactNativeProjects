import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import store from './redux/store/store';
import App from './App';

const RootApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default RootApp;
