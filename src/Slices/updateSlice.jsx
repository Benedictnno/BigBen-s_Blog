import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  update: {
    category: "News",
    paragraphs: "",
    subtitle: "",
    title: "",
    image: null,
  },

};
const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    updatePostData: (state, { payload: { name, value } }) => {
      state.post[name] = value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updatePostData } = updateSlice.actions;

export default updateSlice.reducer;
