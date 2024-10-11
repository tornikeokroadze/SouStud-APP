// authActions.js
import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  restoreToken,
  logoutRequest,
} from "./authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://d5b6-91-184-122-110.ngrok-free.app/api";

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const response = await axios.post(`${API_URL}/login`, {
      personal_number: credentials.personal_number,
      password: credentials.password,
    });

    const { user, token } = response.data;

    await AsyncStorage.setItem("token", token);

    dispatch(loginSuccess({ user, token }));

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || "Login failed"));
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch(logoutRequest());
  try {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await axios.post(
        `${API_URL}/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    }
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    await AsyncStorage.removeItem("token");

    dispatch(logout());
  }
};

export const checkToken = () => async (dispatch) => {
  dispatch(loginRequest());
  const token = await AsyncStorage.getItem("token");
  if (token == null) {
    dispatch(logout());
  } else if (token) {
    const response = await axios.get(`${API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = response.data;
    dispatch(restoreToken(token));
    dispatch(loginSuccess({ user, token }));
  }
};
