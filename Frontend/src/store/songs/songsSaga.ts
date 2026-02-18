import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../../api';
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongRequest,
  createSongSuccess,
  createSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
} from './songsSlice';
import { fetchStatsRequest } from '../stats/statsSlice'; // <-- import
import { type PayloadAction } from '@reduxjs/toolkit';
import type { Song } from '../../types';

function* fetchSongs() {
  try {
    const response: Awaited<ReturnType<typeof api.fetchSongs>> = yield call(api.fetchSongs);
    yield put(fetchSongsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* createSong(action: PayloadAction<Omit<Song, '_id'>>) {
  try {
    const response: Awaited<ReturnType<typeof api.createSong>> = yield call(api.createSong, action.payload);
    yield put(createSongSuccess(response.data));
    yield put(fetchStatsRequest()); // refresh stats
  } catch (error: any) {
    yield put(createSongFailure(error.message));
  }
}

function* updateSong(action: PayloadAction<{ id: string; data: Omit<Song, '_id'> }>) {
  try {
    const { id, data } = action.payload;
    const response: Awaited<ReturnType<typeof api.updateSong>> = yield call(api.updateSong, id, data);
    yield put(updateSongSuccess(response.data));
    yield put(fetchStatsRequest());
  } catch (error: any) {
    yield put(updateSongFailure(error.message));
  }
}

function* deleteSong(action: PayloadAction<string>) {
  try {
    yield call(api.deleteSong, action.payload);
    yield put(deleteSongSuccess(action.payload));
    yield put(fetchStatsRequest());
  } catch (error: any) {
    yield put(deleteSongFailure(error.message));
  }
}

export function* watchSongs() {
  yield takeLatest(fetchSongsRequest.type, fetchSongs);
  yield takeLatest(createSongRequest.type, createSong);
  yield takeLatest(updateSongRequest.type, updateSong);
  yield takeLatest(deleteSongRequest.type, deleteSong);
}