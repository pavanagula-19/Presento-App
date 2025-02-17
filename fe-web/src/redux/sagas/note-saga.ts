import { takeLatest, call, put } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchNotesRequest,
  fetchNotesSuccess,
  fetchNotesFailure,
  createNoteRequest,
  createNoteSuccess,
  createNoteFailure,
  updateNoteRequest,
  updateNoteSuccess,
  updateNoteFailure,
  deleteNoteRequest,
  deleteNoteSuccess,
  deleteNoteFailure,
  updateWishlistRequest,
  updateWishlistSuccess,
  updateWishlistFailure,
} from "../slices/note-slice";

function* fetchNotesSaga({ payload }: PayloadAction<string>) {
  try {
    const response: AxiosResponse<any> = yield call(
      axios.get,
      `http://localhost:8000/api/notes/${payload}`
    );
    yield put(fetchNotesSuccess(response.data.notes));
  } catch (error: any) {
    yield put(fetchNotesFailure(error.message));
  }
}

function* createNoteSaga({ payload }: PayloadAction<any>) {
  try {
    const response: AxiosResponse<any> = yield call(
      axios.post,
      "http://localhost:8000/api/notes",
      payload
    );
    yield put(createNoteSuccess(response.data.note));
  } catch (error: any) {
    yield put(createNoteFailure(error.message));
  }
}

function* updateNoteSaga({ payload }: PayloadAction<{ noteId: string; content: string }>) {
  try {
    const response: AxiosResponse<any> = yield call(
      axios.put,
      `http://localhost:8000/api/notes/${payload.noteId}`,
      payload
    );
    yield put(updateNoteSuccess(response.data.note));
  } catch (error: any) {
    yield put(updateNoteFailure(error.message));
  }
}

function* updateWishlistSaga({ payload }: PayloadAction<any>) {
  try {
    const response: AxiosResponse<any> = yield call(
      axios.put,
      `http://localhost:8000/api/notes/${payload._id}`,
      payload
    );
    yield put(updateWishlistSuccess(response.data.note));
  } catch (error: any) {
    yield put(updateWishlistFailure(error.message));
  }
}

function* deleteNoteSaga({ payload }: PayloadAction<string>) {
  try {
    yield call(axios.delete, `http://localhost:8000/api/notes/${payload}`);
    yield put(deleteNoteSuccess(payload));
  } catch (error: any) {
    yield put(deleteNoteFailure(error.message));
  }
}

export default function* noteSagas() {
  yield takeLatest(fetchNotesRequest.type, fetchNotesSaga);
  yield takeLatest(createNoteRequest.type, createNoteSaga);
  yield takeLatest(updateNoteRequest.type, updateNoteSaga);
  yield takeLatest(updateWishlistRequest.type, updateWishlistSaga);
  yield takeLatest(deleteNoteRequest.type, deleteNoteSaga);
}
