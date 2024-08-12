import { configureStore } from '@reduxjs/toolkit';
import offsetReducer from './features/booksList/offsetSlice';

export const store = configureStore({
  reducer: {
    offset: offsetReducer,
  },
});