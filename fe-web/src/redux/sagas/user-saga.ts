import { call, put, takeLatest } from "redux-saga/effects";
import {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
} from "../slices/user-slice";
import axios, { AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

const API_URL = "http://localhost:8000/api/user";

interface User {
  id: string;
  name: string;
  email: string;
}

interface RegisterResponse {
  user: User;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface FetchUsersResponse {
  users: User[];
}

interface UpdateUserResponse {
  user: User;
}

function* registerUser({payload}: PayloadAction<User>) {
  try {
    const response: AxiosResponse<RegisterResponse> = yield call(
      axios.post,
      `${API_URL}/register`,
      payload
    );
    yield put(registerSuccess(response.data.user));
  } catch (error: any) {
    yield put(
      registerFailure(error.response?.data?.message || "An error occurred")
    );
  }
}

function* loginUser({payload}: PayloadAction<User>) {
  try {
    const response: AxiosResponse<LoginResponse> = yield call(
      axios.post,
      `${API_URL}/login`,
      payload
    );
    yield put(loginSuccess(response.data));
  } catch (error: any) {
    yield put(
      loginFailure(error.response?.data?.message || "An error occurred")
    );
  }
}

function* fetchUsers() {
  try {
    const response: AxiosResponse<FetchUsersResponse> = yield call(
      axios.get,
      API_URL
    );
    yield put(fetchUsersSuccess(response.data.users));
  } catch (error: any) {
    yield put(
      fetchUsersFailure(error.response?.data?.message || "An error occurred")
    );
  }
}

function* updateUser({ payload }: PayloadAction<User>) {
  try {
    const { id, ...data } = payload;
    const response: AxiosResponse<UpdateUserResponse> = yield call(
      axios.put,
      `${API_URL}/${id}`,
      data
    );
    yield put(updateUserSuccess(response.data.user));
  } catch (error: any) {
    yield put(
      updateUserFailure(error.response?.data?.message || "An error occurred")
    );
  }
}

function* deleteUser({ payload }: PayloadAction<string>) {
  try {
    yield call(axios.delete, `${API_URL}/${payload}`);
    yield put(deleteUserSuccess(payload));
  } catch (error: any) {
    yield put(
      deleteUserFailure(error.response?.data?.message || "An error occurred")
    );
  }
}

export default function* userSagas() {
  yield takeLatest(registerRequest.type, registerUser);
  yield takeLatest(loginRequest.type, loginUser);
  yield takeLatest(fetchUsersRequest.type, fetchUsers);
  yield takeLatest(updateUserRequest.type, updateUser);
  yield takeLatest(deleteUserRequest.type, deleteUser);
}
