import { config } from "@/config";
import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  createSharedNoteFailure,
  createSharedNoteRequest,
  createSharedNoteSuccess,
  deleteSharedNoteFailure,
  deleteSharedNoteRequest,
  deleteSharedNoteSuccess,
  fetchReceivedNotesFailure,
  fetchReceivedNotesRequest,
  fetchReceivedNotesSuccess,
  fetchSharedNotesFailure,
  fetchSharedNotesRequest,
  fetchSharedNotesSuccess,
  SharedNote,
} from "../slices/share-note-slice";

const BASE_URL = `${config.server.baseUrl}/api`;

function* fetchSharedNotesSaga() {
  try {
    const response: AxiosResponse<{ sharedNotes: SharedNote[] }> = yield call(axios.get, `${BASE_URL}/shared/notes/sent`);

    yield put(fetchSharedNotesSuccess(response.data.sharedNotes));
  } catch (error: any) {
    yield put(fetchSharedNotesFailure(error?.message));
  }
}

function* fetchReceivedNotesSaga() {
  try {
    const response: AxiosResponse<{ receivedNotes: SharedNote[] }> = yield call(axios.get, `${BASE_URL}/shared/notes/received`);
    yield put(fetchReceivedNotesSuccess(response.data.receivedNotes));
  } catch (error: any) {
    yield put(fetchReceivedNotesFailure(error?.message));
  }
}

function* createSharedNoteSaga(action: PayloadAction<{ noteId: string; sharedWith: string }>) {
  try {
    const response: AxiosResponse<{ sharedNote: SharedNote }> = yield call(axios.post, `${BASE_URL}/shared/notes`, action.payload);
    yield put(createSharedNoteSuccess(response.data.sharedNote));
  } catch (error: any) {
    yield put(createSharedNoteFailure(error?.message));
  }
}

function* deleteSharedNoteSaga(action: PayloadAction<string>) {
  try {
    yield call(axios.delete, `${BASE_URL}/shared/notes/${action.payload}`);
    yield put(deleteSharedNoteSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteSharedNoteFailure(error?.message));
  }
}

export default function* watchShareNoteSagas() {
  yield takeLatest(fetchSharedNotesRequest.type, fetchSharedNotesSaga);
  yield takeLatest(fetchReceivedNotesRequest.type, fetchReceivedNotesSaga);
  yield takeLatest(createSharedNoteRequest.type, createSharedNoteSaga);
  yield takeLatest(deleteSharedNoteRequest.type, deleteSharedNoteSaga);
}
