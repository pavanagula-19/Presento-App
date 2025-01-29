import { call, put, takeLatest } from "redux-saga/effects";
import apiClient from "../apiClient";
import {
  fetchSharedNotesRequest,
  fetchSharedNotesSuccess,
  fetchSharedNotesFailure,
  createSharedNoteRequest,
  createSharedNoteSuccess,
  createSharedNoteFailure,
  deleteSharedNoteRequest,
  deleteSharedNoteSuccess,
  deleteSharedNoteFailure,
} from "../slices/share-note-slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

interface CreateSharedNotePayload {
  noteId: string;
  sharedWith: string;
}

interface SharedNote {
  id: string;
  noteId: string;
  sharedWith: string;
  sharedBy: string;
  createdAt: Date;
}

function* fetchSharedNotesSaga(action: PayloadAction<string>) {
  try {
    const userId = action.payload;
    const response: AxiosResponse<{ sharedNotes: SharedNote[] }> = yield call(
      apiClient.get,
      `/shared/notes/${userId}`
    );
    yield put(fetchSharedNotesSuccess(response.data.sharedNotes));
  } catch (error: any) {
    yield put(fetchSharedNotesFailure(error?.message));
  }
}

function* createSharedNoteSaga({
  payload,
}: PayloadAction<CreateSharedNotePayload>) {
  try {
    const response: AxiosResponse<SharedNote> = yield call(
      apiClient.post,
      "/shared/notes",
      payload
    );
    yield put(createSharedNoteSuccess(response.data));
  } catch (error: any) {
    yield put(createSharedNoteFailure(error?.message));
  }
}

function* deleteSharedNoteSaga({ payload }: PayloadAction<string>) {
  try {
    yield call(apiClient.delete, `/shared/notes/${payload}`);
    yield put(deleteSharedNoteSuccess(payload));
  } catch (error: any) {
    yield put(deleteSharedNoteFailure(error?.message));
  }
}

export default function* shareNoteSagas() {
  yield takeLatest(fetchSharedNotesRequest.type, fetchSharedNotesSaga);
  yield takeLatest(createSharedNoteRequest.type, createSharedNoteSaga);
  yield takeLatest(deleteSharedNoteRequest.type, deleteSharedNoteSaga);
}
