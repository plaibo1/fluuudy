import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import holeySocksSlice from './holeySocksSlice';
import { wsLocalhostConnect } from './middleware/createMySocketMiddleware';

export const store = configureStore({
  reducer: {
    chat: holeySocksSlice
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wsLocalhostConnect)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
