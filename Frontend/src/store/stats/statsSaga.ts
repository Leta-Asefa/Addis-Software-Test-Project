import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../../api';
import { fetchStatsRequest, fetchStatsSuccess, fetchStatsFailure } from './statsSlice';

function* fetchStats() {
  try {
    const response: Awaited<ReturnType<typeof api.fetchStats>> = yield call(api.fetchStats);
    yield put(fetchStatsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchStatsFailure(error.message));
  }
}

export function* watchStats() {
  yield takeLatest(fetchStatsRequest.type, fetchStats);
}