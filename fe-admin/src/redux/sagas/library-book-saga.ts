import { takeLatest, call, put } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  fetchBooksRequest,
  fetchBooksSuccess,
  fetchBooksFailure,
  addBookRequest,
  addBookSuccess,
  addBookFailure,
  updateBookRequest,
  updateBookSuccess,
  updateBookFailure,
  deleteBookRequest,
  deleteBookSuccess,
  deleteBookFailure,
} from "../slices/library-book-slice";

function* fetchBooksSaga() {
  try {
    const response: AxiosResponse<any> = yield call(axios.get, "http://localhost:8000/api/library/books/");
    yield put(fetchBooksSuccess(response.data));
  } catch (error: any) {
    yield put(fetchBooksFailure(error.message));
  }
}

function* addBookSaga(action: ReturnType<typeof addBookRequest>) {
  try {
    const response: AxiosResponse<any> = yield call(axios.post, "http://localhost:8000/api/library/books/", action.payload);
    yield put(addBookSuccess(response.data));
  } catch (error: any) {
    yield put(addBookFailure(error.message));
  }
}

function* updateBookSaga(action: ReturnType<typeof updateBookRequest>) {
  try {
    const response: AxiosResponse<any> = yield call(axios.put, `http://localhost:8000/api/library/books/${action.payload.id}`, action.payload);
    yield put(updateBookSuccess(response.data));
  } catch (error: any) {
    yield put(updateBookFailure(error.message));
  }
}

function* deleteBookSaga(action: ReturnType<typeof deleteBookRequest>) {
  try {
    yield call(axios.delete, `http://localhost:8000/api/library/books/${action.payload}`);
    yield put(deleteBookSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteBookFailure(error.message));
  }
}

export default function* libraryBookSagas() {
  yield takeLatest(fetchBooksRequest.type, fetchBooksSaga);
  yield takeLatest(addBookRequest.type, addBookSaga);
  yield takeLatest(updateBookRequest.type, updateBookSaga);
  yield takeLatest(deleteBookRequest.type, deleteBookSaga);
}