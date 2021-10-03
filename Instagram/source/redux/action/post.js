import database from '@react-native-firebase/database';
import {SET_POST, ERROR_POST} from './action.types';
export const getPosts = () => async dispatch => {
  try {
    database()
      .ref('/posts/')
      .on('value', snapshot => {
        console.log('User posts..' + snapshot.val());

        // checking database for posts if available
        if (snapshot.val()) {
          dispatch({
            type: SET_POST,
            payload: Object.values(snapshot.val()),
          });
        }
        // no posts are not available
        else {
          dispatch({
            type: SET_POST,
            payload: [],
          });
        }
      });
  } catch (error) {
    dispatch({
      type: ERROR_POST,
    });
  }
};
