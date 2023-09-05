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
      console.log(views, likes);
      state.userLiked = likes;
      state.userView = views;
    },
    submitComment: (state, { payload: { image, name } }) => {
      state.comment.image = image;
      state.comment.name = name;
    },
    Comment: (state, { payload: { commentText, image, name } }) => {
      state.comment.commentText = commentText;
      state.comment.image = image;
      state.comment.name = name;
    },
  },
});

export const { Comment, submitComment } = MainCardSlice.actions;

export default MainCardSlice.reducer;
