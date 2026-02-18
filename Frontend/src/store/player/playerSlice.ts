import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Song } from '../../types';

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
}

const initialState: PlayerState = {
  currentSong: null,
  isPlaying: false,
  volume: 0.7,
  progress: 0,
  duration: 0,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playSong: (state, action: PayloadAction<Song>) => {
      if (state.currentSong?._id !== action.payload._id) {
        state.currentSong = action.payload;
        state.isPlaying = true;
        state.progress = 0;
        state.duration = 0;
      } else {
        state.isPlaying = true;
      }
    },
    pauseSong: (state) => {
      state.isPlaying = false;
    },
    resumeSong: (state) => {
      state.isPlaying = true;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    stopSong: (state) => {
      state.currentSong = null;
      state.isPlaying = false;
      state.progress = 0;
    },
  },
});

export const {
  playSong,
  pauseSong,
  resumeSong,
  setVolume,
  setProgress,
  setDuration,
  stopSong,
} = playerSlice.actions;
export default playerSlice.reducer;