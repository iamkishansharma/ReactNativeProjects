import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];
import {composeWithDevTools} from 'redux-devtools-extension';
// in between login user and admin

const store = createStore(
  persistedReducer,
  applyMiddleware(...middleware),
  // composeWithDevTools(applyMiddleware(...middleware)),
);

const persistor = persistStore(store)

export  {store,persistor};