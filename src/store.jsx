import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import postSlice from "./Slices/postSlice";
import ProfileSlice from "./Slices/ProfileSlice";
import updateSlice from "./Slices/updateSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    profile: ProfileSlice,
    update: updateSlice,
  },
});
