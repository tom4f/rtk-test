import { configureStore } from '@reduxjs/toolkit';
import { coursesReducer } from './courses';
import { playlistReducer } from './playlist/playlistSlice';

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      coursePage: coursesReducer,
      playlist: playlistReducer,
    },
  });
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
