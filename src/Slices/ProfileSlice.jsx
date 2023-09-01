import { createSlice } from "@reduxjs/toolkit";

const initialState={
    Profile :{
        image:null,
        fullName: '',
        PhoneNumber:'',
        Gender: '',
        Date: '',
        Bio:''
    },
    author: '',
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profileData: (state, { payload: { name, value } }) => {
      state.Profile[name] = value;
    },
    authorName: (state, { payload }) => {
      state.author = payload;
    },
  },
});

export const { profileData, authorName } = profileSlice.actions;
export default profileSlice.reducer