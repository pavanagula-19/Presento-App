import { RootState } from "../store";

export const selectUserInfo = (state: RootState) => state.user.userInfo;
export const selectToken = (state: RootState) => state.user.token;
export const selectUsers = (state: RootState) => state.user.users;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;
