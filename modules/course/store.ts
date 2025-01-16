import { configureStore } from '@reduxjs/toolkit'
import playlistsReducer from './reducer'
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import saga from './saga'

function* rootSaga() {
  yield all([saga()]);
}

const sagaMiddleware = createSagaMiddleware();

export const makeStore = () => {
  const store = configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
    reducer: {
      coursePage: playlistsReducer,
    },
  })
  sagaMiddleware.run(rootSaga);
  return store
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']