import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducer';
import thunk from 'redux-thunk';

const middleware = [thunk];

import {composeWithDevTools} from 'redux-devtools-extension';
const store = createStore(
  rootReducer,
  //   composeWithDevTools(applyMiddleware(...middleware)),
  applyMiddleware(...middleware),
);

export default store;
