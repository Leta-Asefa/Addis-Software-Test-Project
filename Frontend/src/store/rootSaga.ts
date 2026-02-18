import { all } from 'redux-saga/effects';
import { watchSongs } from './songs/songsSaga';
import { watchStats } from './stats/statsSaga';

export default function* rootSaga() {
  yield all([watchSongs(), watchStats()]);
}