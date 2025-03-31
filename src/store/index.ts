import { configureStore } from '@reduxjs/toolkit';
import shoppingCartReducer from './shoppingCartSlice';

export const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
