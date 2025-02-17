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
import { config } from "@/config";

const API_URL = `${config.server.baseUrl}/api/user`;

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

function* registerUser({ payload }: PayloadAction<User>) {
  try {
    const response: AxiosResponse<RegisterResponse> = yield call(
      apiClient.post,
      `/register`,
      payload
    );
    yield put(registerSuccess(response.data.user));
  } catch (error: any) {
    yield put(
      registerFailure(error.response?.data?.message || "An error occurred")
    );
  }
}

function* loginUser({ payload }: PayloadAction<User>) {
  try {
    const response: AxiosResponse<LoginResponse> = yield call(
      apiClient.post,
      `/login`,
      payload
    );
    localStorage.setItem("authToken", response.data.token);
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
      apiClient.get,
      `/`
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
      apiClient.put,
      `/${id}`,
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
    yield call(apiClient.delete, `/${payload}`);
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
