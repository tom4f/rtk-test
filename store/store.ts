import { configureStore } from '@reduxjs/toolkit';
import { coursesReducer } from './courses';
import { playlistReducer } from './playlist';
import { videoUploadReducer } from './video/videoUploadSlice';
import { playlistApi, videoApi } from './apiServices';

export const makeStore = () =>
  configureStore({
    reducer: {
      coursePage: coursesReducer,
      playlist: playlistReducer,
      videoUpload: videoUploadReducer,
      [playlistApi.reducerPath]: playlistApi.reducer,
      [videoApi.reducerPath]: videoApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(playlistApi.middleware)
        .concat(videoApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
