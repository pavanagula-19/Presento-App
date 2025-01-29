import { takeLatest, call, put } from "redux-saga/effects";
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
} from "../slices/note-slice";
import axios, { AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

interface DeleteNoteAction {
  type: string;
  payload: string;
}

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

function* createNoteSaga({ payload }: any) {
  console.log("Payload sent to server:", payload);
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

function* updateNoteSaga({ payload }: any) {
  try {
    const response: AxiosResponse<any> = yield call(
      axios.put,
      `http://localhost:8000/api/notes/${payload._id}`,
      payload
    );
    yield put(updateNoteSuccess(response.data.note));
  } catch (error: any) {
    yield put(updateNoteFailure(error.message));
  }
}

function* deleteNoteSaga(action: DeleteNoteAction): Generator<any, void, void> {
  try {
    yield call(
      axios.delete,
      `http://localhost:8000/api/notes/${action.payload}`
    );
    yield put(deleteNoteSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteNoteFailure(error.message));
  }
}

export default function* noteSagas() {
  yield takeLatest(fetchNotesRequest.type, fetchNotesSaga);
  yield takeLatest(createNoteRequest.type, createNoteSaga);
  yield takeLatest(updateNoteRequest.type, updateNoteSaga);
  yield takeLatest(deleteNoteRequest.type, deleteNoteSaga);
}
