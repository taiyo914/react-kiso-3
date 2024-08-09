import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  offset: 0,
};

const booksListSlice = createSlice({
  name: 'booksList',
  initialState,
  reducers: {
    updateBooks: (state, action) => ({...state, books: action.payload}),
    incrementOffset: (state) =>  ({ ...state, offset: state.offset + 10 }),
    decrementOffset: (state) => ({ ...state, offset: state.offset > 0 ? state.offset - 10 : 0}),
  },
});

export const { updateBooks, incrementOffset, decrementOffset } = booksListSlice.actions;

export default booksListSlice.reducer;
