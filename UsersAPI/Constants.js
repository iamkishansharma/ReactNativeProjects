import {Component} from 'react';
import Snackbar from 'react-native-snackbar';
export default class Constants extends Component {
  constructor() {
    super();
  }
  static BASE_URL = 'https://kishanapi.herokuapp.com/api/v1/students';
  static API_KEY = 'kishanra';

  static SnackbarNotify(type, msg) {
    //TEXT ICONS   😏😥🚩
    switch (type) {
      case 'success':
        return Snackbar.show({
          duration: Snackbar.LENGTH_SHORT,
          text: '✅ Successful 👍',
          backgroundColor: '#ff6363',
          textColor: 'white',
        });
      case 'failed':
        Snackbar.show({
          duration: Snackbar.LENGTH_LONG,
          text: '🛑' + msg + ' 😥',
          backgroundColor: 'pink',
          textColor: 'red',
        });

      case 'warning':
        return Snackbar.show({
          duration: Snackbar.LENGTH_LONG,
          text: `Something went wrong!  Please check your inputs.. 😥`,
          backgroundColor: '#ff6363',
          textColor: 'black',
        });

      default:
        return Snackbar.show({
          duration: Snackbar.LENGTH_LONG,
          text: '🚨 Email is not valid 😥',
          backgroundColor: '#ff6363',
          textColor: 'black',
        });
        break;
    }
  }
}
