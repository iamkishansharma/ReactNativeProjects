import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducer';

const middleware = [thunk];
import {composeWithDevTools} from 'redux-devtools-extension';
// in between login user and admin

const store = createStore( rootReducer,
  applyMiddleware(...middleware),
  // composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
