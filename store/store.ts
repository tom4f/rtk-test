import { configureStore } from '@reduxjs/toolkit';
import { coursesReducer } from './courses';
import { playlistReducer } from './playlist';
import { videoUploadReducer } from './video/videoUploadSlice';
import { playlistApi } from './apiServices';

export const makeStore = () =>
  configureStore({
    reducer: {
      coursePage: coursesReducer,
      playlist: playlistReducer,
      videoUpload: videoUploadReducer,
      [playlistApi.reducerPath]: playlistApi.reducer, // Add the RTK Query reducer
    },
    // Adding middleware to handle RTK Query's caching and networking
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(playlistApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
