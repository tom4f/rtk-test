import { configureStore } from '@reduxjs/toolkit';
import { coursesReducer } from './courses';
import { playlistReducer } from './playlist';
import { videoUploadReducer } from './video/videoUploadSlice';
import { playlistsApi, videoApi, playlistApi } from './apiServices';

export const makeStore = () =>
  configureStore({
    reducer: {
      coursePage: coursesReducer,
      playlist: playlistReducer,
      videoUpload: videoUploadReducer,
      [playlistsApi.reducerPath]: playlistsApi.reducer,
      [videoApi.reducerPath]: videoApi.reducer,
      [playlistApi.reducerPath]: playlistApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(playlistsApi.middleware)
        .concat(videoApi.middleware)
        .concat(playlistApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
