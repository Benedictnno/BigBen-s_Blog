import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: {
    category: "",
    paragraphs: "",
    subtitle: "",
    title: "",
    image:null
  },

  getPostDatas: [],
};
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postData: (state, { payload: { name, value } }) => {
      state.post[name] = value;
    },
    getPostData: (state, { payload }) => {
      state.getPostDatas = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { postData, getPostData } = postSlice.actions;

export default postSlice.reducer;
