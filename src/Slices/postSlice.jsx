import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: {
    category: "News",
    paragraphs: "",
    subtitle: "",
    title: "",
    image: null,
  },

  getPostDatas: [],
  filteredPostDatas: [],
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
    filterPostData: (state, { payload }) => {
      let filterPostData;
      if (payload === "Entertainment") {
        filterPostData = state.getPostDatas.filter(
          (data) => data.category === "Entertainment"
        );
      }
      if (payload === "news") {
        filterPostData = state.getPostDatas.filter(
          (data) => data.category === "News"
        );
      }
      if (payload === "Sports") {
        filterPostData = state.getPostDatas.filter(
          (data) => data.category === "Sports"
        );
      }
      if (payload === "Music") {
        filterPostData = state.getPostDatas.filter(
          (data) => data.category === "Music"
        );
      }
      if (payload === "Movies") {
        filterPostData = state.getPostDatas.filter(
          (data) => data.category === "Movies"
        );
      }
      state.filteredPostDatas = filterPostData;
    },
  },
});

// Action creators are generated for each case reducer function
export const { postData, getPostData, filterPostData } = postSlice.actions;

export default postSlice.reducer;
