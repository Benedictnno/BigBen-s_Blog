import { createSlice } from "@reduxjs/toolkit";

const initialState={
    Profile :{
        image:null,
        fullName: '',
        PhoneNumber:'',
        Gender: '',
        Date: '',
        Bio:''
    }
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profileData: (state, { payload: { name, value } }) => {
      state.Profile[name] = value;
    },
  },
});

export const {profileData}= profileSlice.actions
export default profileSlice.reducer