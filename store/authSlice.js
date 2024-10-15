import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { LogBox } from "react-native";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutRequest: (state) => {
      state.loading = true;
    },
    logout: (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    restoreToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  restoreToken,
  logoutRequest,
} = authSlice.actions;
export default authSlice.reducer;
