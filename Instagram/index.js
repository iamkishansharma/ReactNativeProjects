/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './source/App';
import RootApp from './source/RootApp';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => RootApp);
