import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Stats } from '../../types';

interface StatsState {
  data: Stats | null;
  loading: boolean;
  error: string | null;
}

const initialState: StatsState = {
  data: null,
  loading: false,
  error: null,
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    fetchStatsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStatsSuccess(state, action: PayloadAction<Stats>) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchStatsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStatsRequest, fetchStatsSuccess, fetchStatsFailure } = statsSlice.actions;
export default statsSlice.reducer;