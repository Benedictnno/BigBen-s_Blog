import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLiked: 0,
  ifViewed: false,
  userView: 0,
  ifLiked: false,
};

const MainCardSlice = createSlice({
  name: "mainCard",
  initialState,
  reducers:{
    setUpInitialState:(state, {payload:{views,likes}})=>{
        state.userLiked= likes
        state.userView = views;

    }
  }
});

export const { loginAuth, setUserData, loadUser, authForm } =
  MainCardSlice.actions;

export default MainCardSlice.reducer;
