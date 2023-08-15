import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAuth: localStorage.getItem("isAuth"),
  userData:{},
};
const saved = localStorage.getItem("userData");
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAuth: (state, { payload }) => {
      state.userAuth = payload;
    },
    setUserData: (state, { payload }) => {
      state.userData = payload;
    },
    loadUser: (state) => {
      state.userData = JSON.parse(saved)
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginAuth, setUserData, loadUser } = authSlice.actions;

export default authSlice.reducer;
