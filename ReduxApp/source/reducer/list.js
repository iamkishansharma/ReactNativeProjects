import {ADD_NOTE, DELETE_NOTE, MARK_COMPLETED} from '../action/action.types';
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return [...state, action.payload];

    case DELETE_NOTE:
      return state.filter(note => note.id !== action.payload);

    case MARK_COMPLETED:
      return state.map(note => {
        if (note.id == action.payload) {
          note.isCompleted = !note.isCompleted;
        }
        return note;
      });
    default:
      return state;
  }
};
