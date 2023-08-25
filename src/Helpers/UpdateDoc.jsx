import { doc, updateDoc } from "firebase/firestore";
import updateSlice, { updatePostData } from "../Slices/updateSlice";
import { useNavigate } from "react-router-dom";
import { db } from "../FirebaseConfig";
import { toast } from "react-toastify";

// const washingtonRef = doc(db, "cities", "DC");

// Set the "capital" field of the city 'DC'

export function updatePostDatas(
  { category, paragraphs, subtitle, title, imageUrls ,id },
  dispatch,navigate
) {
console.log(category, paragraphs, subtitle, title, imageUrls);
  
  dispatch(
    updatePostData({
      id,
      category,
      paragraphs,
      subtitle,
      title,
      imageUrls,
    })
  );
 navigate("/CreatePost");
}

export async function updatePost(id, data) {
  const postUpdateRef = doc(db, "blog-posts", id);
console.log(id,{...data});
  await updateDoc(postUpdateRef, {
    ...data,
  });
  toast.success('post updated successfully')
}
