import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLiked: 0,
  ifViewed: false,
  userView: 0,
  ifLiked: false,
  open: false,
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
    setUpLikes: (state, { payload: { likes } }) => {
      if (likes >= 0) {
        state.userLiked = likes + 1;
      } else {
        state.userLiked = 0;
      }
    },
    setViews: (state, { payload: { views } }) => {
      if (views >= 0) {
        state.userView = views + 1;
      } else {
        state.userView = 0;
      }
    },
    submitComment: (state, { payload: { image, name } }) => {
      state.comment.image = image;
      state.comment.name = name;
    },
    setBurger: (state, { payload }) => {
      state.open=payload
    },
    Comment: (state, { payload: { commentText, image, name } }) => {
      state.comment.commentText = commentText;
      state.comment.image = image;
      state.comment.name = name;
    },
  },
});

export const { Comment, submitComment, setViews, setBurger } = MainCardSlice.actions;

export default MainCardSlice.reducer;
