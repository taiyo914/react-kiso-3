import { createSlice } from '@reduxjs/toolkit';

const initialState = 0

const offsetSlice = createSlice({
  name: 'offset',
  initialState,
  reducers: {
    incrementOffset: (state) =>  state + 10,
    decrementOffset: (state) => state > 0 ? state - 10 : 0,
  },
});

export const { incrementOffset, decrementOffset } = offsetSlice.actions;

export default offsetSlice.reducer;
