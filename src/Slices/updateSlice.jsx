import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  update: {
    category: "News",
    paragraphs: "",
    subtitle: "",
    title: "",
    image: null,
    id: '',
  },
  isEditing: false,
};
const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    updatePostData: (
      state,
      { payload: { category, paragraphs, subtitle, title, imageUrls,id } }
    ) => {
      state.update.category = category;
      state.update.paragraphs = paragraphs;
      state.update.subtitle = subtitle;
      state.update.title = title;
      state.update.image = imageUrls;
      state.update.id = id;
      state.isEditing = true;
    },
    updatePostDataEdit: (state, { payload: { name, value } }) => {
      state.update[name] = value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updatePostData, updatePostDataEdit } = updateSlice.actions;

export default updateSlice.reducer;
