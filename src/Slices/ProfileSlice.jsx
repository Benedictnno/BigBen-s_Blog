import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Profile: {
    image: null,
    fullName: "",
    Gender: "",
    Date: "",
    Bio: "",
  },
  ProfileData: {
    image: null,
    fullName: "",
    Gender: "",
    Date: "",
    Bio: "",
  },
  author: "",
};

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
    SetProfileData: (
      state,
      { payload: { fullName, Gender, DateOfBirth, Bio, image } }
    ) => {
      state.ProfileData.Bio = Bio;
      state.ProfileData.fullName = fullName;
      state.ProfileData.Gender = Gender;
      state.ProfileData.Date = DateOfBirth;
      state.ProfileData.image = image;
    },
  },
});

export const { profileData, authorName, SetProfileData } = profileSlice.actions;
export default profileSlice.reducer;
