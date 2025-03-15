import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "@/redux/user/types";
import { userApi } from "@/redux/apis/userApi";

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  users: null,
  current: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
    resetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
        state.current = action.payload;
        state.isAuthenticated = true;
      })
      .addMatcher(
        userApi.endpoints.getUserById.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
        }
      );
  },
});

export const { logout, resetUser } = userSlice.actions;
export default userSlice.reducer;
