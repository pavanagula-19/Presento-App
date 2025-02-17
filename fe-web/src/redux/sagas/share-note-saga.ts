import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import apiClient from "../apiClient";
import {
  fetchSharedNotesRequest,
  fetchSharedNotesSuccess,
  fetchSharedNotesFailure,
  fetchReceivedNotesRequest,
  fetchReceivedNotesSuccess,
  fetchReceivedNotesFailure,
  createSharedNoteRequest,
  createSharedNoteSuccess,
  createSharedNoteFailure,
  deleteSharedNoteRequest,
  deleteSharedNoteSuccess,
  deleteSharedNoteFailure,
  SharedNote,
} from "../slices/share-note-slice";
import { PayloadAction } from "@reduxjs/toolkit";

function* fetchSharedNotesSaga() {
  try {
    const response: AxiosResponse<{ sharedNotes: SharedNote[] }> = yield call(apiClient.get, "shared/notes/sent");

    yield put(fetchSharedNotesSuccess(response.data.sharedNotes));
  } catch (error: any) {
    yield put(fetchSharedNotesFailure(error?.message));
  }
}

function* fetchReceivedNotesSaga() {
  try {
    const response: AxiosResponse<{ receivedNotes: SharedNote[] }> = yield call(apiClient.get, "/shared/notes/received");
    yield put(fetchReceivedNotesSuccess(response.data.receivedNotes));
  } catch (error: any) {
    yield put(fetchReceivedNotesFailure(error?.message));
  }
}

function* createSharedNoteSaga(action: PayloadAction<{ noteId: string; sharedWith: string }>) {
  try {
    const response: AxiosResponse<{ sharedNote: SharedNote }> = yield call(apiClient.post, "/shared/notes/", action.payload);
    yield put(createSharedNoteSuccess(response.data.sharedNote));
  } catch (error: any) {
    yield put(createSharedNoteFailure(error?.message));
  }
}

function* deleteSharedNoteSaga(action: PayloadAction<string>) {
  try {
    yield call(apiClient.delete, `/shared/notes/${action.payload}`);
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
