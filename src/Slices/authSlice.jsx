import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAuth: localStorage.getItem("isAuth"),
  userData: {},
  form: { password: "", email: "" },
};
let saved = localStorage.getItem("userData");
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
      state.userData = JSON.parse(saved);
    },
    authForm: (state, { payload: { name,value } }) => {
      state.form[name] = value
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginAuth, setUserData, loadUser, authForm } = authSlice.actions;

export default authSlice.reducer;
