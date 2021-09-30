import {ADD_NOTE, DELETE_NOTE, MARK_COMPLETED} from './action.types';

export const addNote = note => ({
  type: ADD_NOTE,
  payload: note,
});

export const deleteNote = id => ({
  type: DELETE_NOTE,
  payload: id,
});

export const markCompleted = id => ({
  type: MARK_COMPLETED,
  payload: id,
});
