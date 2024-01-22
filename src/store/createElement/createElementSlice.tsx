import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { createElementInititalValues } from '../../constants';
 const createElementSlice = createSlice({
  name: 'createElement',
  initialState: {
    values: createElementInititalValues,
  },
  reducers: {
    setCreateElementValues: (state, action) => {
      state.values = { ...state.values, ...action.payload };
    },
  },
});

export const { setCreateElementValues } = createElementSlice.actions;

export const selectCreateElementValues = (state: RootState) => state.createElement?.values || {};
export default createElementSlice.reducer;