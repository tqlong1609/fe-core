import { combineReducers } from '@reduxjs/toolkit';
import { exampleSlice } from './example.slice';

const rootReducer = combineReducers({
  [exampleSlice.name]: exampleSlice.reducer,
});

export default rootReducer;
