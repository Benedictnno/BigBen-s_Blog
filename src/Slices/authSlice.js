import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: false,
  },

  reducers: {
    loginAuth: (state, { payload }) => {
      state.auth = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginAuth } = authSlice.actions;

export default authSlice.reducer;
