import { combineReducers } from '@reduxjs/toolkit';
import songsReducer from './songs/songsSlice';
import statsReducer from './stats/statsSlice';

const rootReducer = combineReducers({
  songs: songsReducer,
  stats: statsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;