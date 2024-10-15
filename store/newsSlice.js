import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newsData: [],
  loadingNews: false,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    loadingRequest: (state) => {
      state.loadingNews = true;
    },
    responseData: (state, action) => {
      state.newsData = action.payload.newsData;
      state.loadingNews = false;
    },
  },
});

export const { loadingRequest, responseData } = newsSlice.actions;
export default newsSlice.reducer;
