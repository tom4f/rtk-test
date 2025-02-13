import { configureStore } from '@reduxjs/toolkit';
import playlistsReducer from './slice';

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      coursePage: playlistsReducer,
    },
  });
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
