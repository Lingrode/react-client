import { RootState } from "../store";

export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const selectCurrent = (state: RootState) => state.user.current;
export const selectUser = (state: RootState) => state.user.user;
