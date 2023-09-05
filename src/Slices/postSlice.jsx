import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: {
    category: "News",
    paragraphs: "",
    subtitle: "",
    title: "",
    views: 0,
    image: null,
  },
  isLoading: false,
  setPage: false,
  searchValue: "",
  getPostDatas: [],
  getProfilePostData: [],
  filteredPostDatas: [],
  filteredPost: [],
  singlePageData: {
    data:{},
    id:''
  },
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
    getProfilePostData: (state, { payload }) => {
      state.getProfilePostData = payload;
      // state.filteredPost = payload;
    },
    singlePage: (state, { payload:{data,id} }) => {
      console.log(data,id );
      state.singlePageData.data = data ;
      state.singlePageData.id = id;

    },
    searchValues: (state, { payload }) => {
      state.searchValue = payload;
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setPage: (state, { payload }) => {
      state.setPage = payload;
    },
    clearValues: (state) => {
      return { ...state, ...state.post };
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
  setPage,
  getProfilePostData,
} = postSlice.actions;

export default postSlice.reducer;
