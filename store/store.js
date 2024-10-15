import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import newsSlice from "./newsSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    news: newsSlice,
  },
});
