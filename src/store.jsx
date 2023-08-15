import { configureStore } from "@reduxjs/toolkit";
import  authSlice  from "./Slices/authSlice";
import postSlice from "./Slices/postSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
  },
});
