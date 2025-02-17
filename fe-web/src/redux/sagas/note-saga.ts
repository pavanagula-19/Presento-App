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
import { config } from "@/config";

const BASE_URL = `${config.server.baseUrl}/api/notes`;

function* fetchNotesSaga({ payload }: PayloadAction<string>) {
  try {
    const response: AxiosResponse<any> = yield call(
      axios.get,
      `${BASE_URL}/${payload}`
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
      `${BASE_URL}`,
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
      `${BASE_URL}/${payload.noteId}`,
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
      `${BASE_URL}/${payload._id}`,
      payload
    );
    yield put(updateWishlistSuccess(response.data.note));
  } catch (error: any) {
    yield put(updateWishlistFailure(error.message));
  }
}

function* deleteNoteSaga({ payload }: PayloadAction<string>) {
  try {
    yield call(axios.delete, `${BASE_URL}/${payload}`);
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
