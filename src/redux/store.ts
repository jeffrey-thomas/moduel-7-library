import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { carsReducer } from './CarsSlice';

export const store = configureStore({
  reducer: {
    carsTable: carsReducer,
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
