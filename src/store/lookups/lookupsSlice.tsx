import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchLookupValues = createAsyncThunk('lookups/fetchLookupValues', async (id, thunkAPI) => {
  try {
    const response = await fetch(`https://650af6bedfd73d1fab094cf7.mockapi.io/lookups/${id}/lookupvalues`);
    const data = await response.json();
    const lookupValues = data.map((item) => {
        return { value: item.id, label: item.name, lookupId: item.lookupId};
    })
    return lookupValues;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const lookupsSlice = createSlice({
  name: 'lookups',
  initialState: {
    lookupValues: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLookupValues.fulfilled, (state, action) => {
      state.lookupValues = action.payload;
    });
  },
});

export const selectLookupValues = (state) => state.lookups?.lookupValues;
export default lookupsSlice.reducer;