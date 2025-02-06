import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import userReducer from "../redux/slices/user-slice";
import noteReducer from "../redux/slices/note-slice";
import shareNoteReducer from "../redux/slices/share-note-slice";
import libraryBookReducer from "../redux/slices/library-book-slice";
import rootSaga from "../redux/sagas/root-saga";
import logger from "redux-logger";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    note: noteReducer,
    sharedNote: shareNoteReducer,
    libraryBook: libraryBookReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(logger, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
