import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { booksReducer } from './BooksSlice';

export const store = configureStore({
  reducer: {
    booksTable: booksReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
