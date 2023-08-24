import { doc, updateDoc } from "firebase/firestore";
import updateSlice from "../Slices/updateSlice";

// const washingtonRef = doc(db, "cities", "DC");

// Set the "capital" field of the city 'DC'
export function updatePostData({
  category,
  paragraphs,
  subtitle,
  title,
  image,
}) {
  dispatch(updateSlice({ name: "category", value: category ,name}));
}

export async function updatePost(id, data) {
  const postUpdateRef = doc(db, "blog-posts", id);

  await updateDoc(postUpdateRef, {
    ...data,
  });
}
