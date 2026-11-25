import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
    accessToken: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    handleLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setUserData, handleLoading, setAccessToken } = authSlice.actions;

export default authSlice.reducer;
