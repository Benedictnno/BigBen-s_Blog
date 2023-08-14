import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  auth: false,
};
 const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAuth: (state, { payload }) => {
      state.auth = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginAuth } = authSlice.actions;

export default authSlice.reducer;
