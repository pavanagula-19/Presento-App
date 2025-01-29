import { all, call } from "redux-saga/effects";
import userSagas from "./user-saga";
import noteSagas from "./note-saga";
import shareNoteSagas from "./share-note-saga";

export default function* rootSaga() {
  yield all([call(userSagas), call(noteSagas), call(shareNoteSagas)]);
}
