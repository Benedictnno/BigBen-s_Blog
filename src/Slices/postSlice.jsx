import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: {
    // author: "",
    category: "",
    paragraphs: "",
    subtitle: "",
    title: "",
  },
};
const postSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    postData: (state, { payload: { name, value } }) => {
      state.post[name] = value;
    },

  },
});

// Action creators are generated for each case reducer function
export const { postData } = postSlice.actions;

export default postSlice.reducer;
