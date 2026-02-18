import { combineReducers } from '@reduxjs/toolkit';
import songsReducer from './songs/songsSlice';
import statsReducer from './stats/statsSlice';
import playerReducer from './player/playerSlice';

const rootReducer = combineReducers({
  songs: songsReducer,
  stats: statsReducer,
  player: playerReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;