import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLiked: 0,
  ifViewed: false,
  userView: 0,
  ifLiked: false,

  comment: {
    image: "",
    name: "",
    commentText: "",
  },
};

const MainCardSlice = createSlice({
  name: "mainCard",
  initialState,
  reducers: {
    setUpInitialState: (state, { payload: { views, likes } }) => {
      state.userLiked = likes;
      state.userView = views;
    },
    Comment: (state, { payload }) => {
      state.comment.commentText = payload;
    },
    submitComment: (state, { payload: { image, name } }) => {
      state.comment.image = image;
      state.comment.name = name;
    },
  },
});

export const { Comment, submitComment } = MainCardSlice.actions;

export default MainCardSlice.reducer;
