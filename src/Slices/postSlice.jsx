import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: {
    category: "News",
    paragraphs: "",
    subtitle: "",
    title: "",
    image: null,
  },
  isLoading: false,
  searchValue: "",
  getPostDatas: [],
  filteredPostDatas: [],
  filteredPost: [],
  singlePageData: {},
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
      state.filteredPost = payload;
    },
    singlePage: (state, { payload }) => {
      state.singlePageData = { ...payload };
    },
    searchValues: (state, { payload }) => {
      state.searchValue = payload;
    },
    setLoading : (state, { payload }) => {
      state.isLoading = payload;
    },
    clearValues: (state) => {
      return { ...state, ...post };
    },
    search: (state) => {
      const Filtered = state.filteredPost.filter((item) => {
        const itemName = item.title.toLowerCase();
        return itemName.includes(state.searchValue);
      });

      state.filteredPost = Filtered;
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
      state.filteredPost = filterPostData;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  postData,
  searchValues,
  clearValues,
  search,
  getPostData,
  singlePage,
  filterPostData,
  setLoading,
} = postSlice.actions;

export default postSlice.reducer;
