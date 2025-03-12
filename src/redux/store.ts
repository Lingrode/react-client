import { api } from "@/redux/apis/api";
import { configureStore } from "@reduxjs/toolkit";
import { listenerMiddleware } from "@/middlewares/auth";
import userSlice from "./user/slice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
