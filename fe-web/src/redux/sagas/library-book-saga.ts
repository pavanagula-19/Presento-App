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
  toggleWishlistRequest,
  toggleWishlistSuccess,
  toggleWishlistFailure,
} from "../slices/library-book-slice";

const BASE_URL = "http://localhost:8000/api/library/books/";

function* fetchBooksSaga() {
  try {
    const response: AxiosResponse<any> = yield call(axios.get, BASE_URL);
    yield put(fetchBooksSuccess(response.data));
  } catch (error: any) {
    yield put(fetchBooksFailure(error?.response?.data?.message || error.message));
  }
}

function* addBookSaga(action: ReturnType<typeof addBookRequest>) {
  try {
    const response: AxiosResponse<any> = yield call(axios.post, BASE_URL, action.payload);
    yield put(addBookSuccess(response.data));
  } catch (error: any) {
    yield put(addBookFailure(error?.response?.data?.message || error.message));
  }
}

function* updateBookSaga(action: ReturnType<typeof updateBookRequest>) {
  try {
    const response: AxiosResponse<any> = yield call(axios.put, `${BASE_URL}${action.payload._id}`, action.payload);
    yield put(updateBookSuccess(response.data));
  } catch (error: any) {
    yield put(updateBookFailure(error?.response?.data?.message || error.message));
  }
}

function* deleteBookSaga(action: ReturnType<typeof deleteBookRequest>) {
  try {
    yield call(axios.delete, `${BASE_URL}${action.payload}`);
    yield put(deleteBookSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteBookFailure(error?.response?.data?.message || error.message));
  }
}

function* toggleWishlistSaga(action: ReturnType<typeof toggleWishlistRequest>) {
  try {
    const response: AxiosResponse<any> = yield call(
      axios.patch,
      `${BASE_URL}${action.payload.id}/wishlist`,
      { wishlist: action.payload.wishlist,userId:action.payload.userId }
    );
    yield put(toggleWishlistSuccess(response.data));
  } catch (error: any) {
    yield put(toggleWishlistFailure(error?.response?.data?.message || "An error occurred"));
  }
}

export default function* libraryBookSagas() {
  yield takeLatest(fetchBooksRequest.type, fetchBooksSaga);
  yield takeLatest(toggleWishlistRequest.type, toggleWishlistSaga);
  yield takeLatest(addBookRequest.type, addBookSaga);
  yield takeLatest(updateBookRequest.type, updateBookSaga);
  yield takeLatest(deleteBookRequest.type, deleteBookSaga);
}
