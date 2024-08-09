import { configureStore } from '@reduxjs/toolkit';
import booksListReducer from './features/booksList/booksListSlice';

export const store = configureStore({
  reducer: {
    booksList: booksListReducer,
  },
});