import { doc, updateDoc } from "firebase/firestore";
import updateSlice, { updatePostData } from "../Slices/updateSlice";
import { useNavigate } from "react-router-dom";
import { db } from "../FirebaseConfig";
import { toast } from "react-toastify";

// const washingtonRef = doc(db, "cities", "DC");

// Set the "capital" field of the city 'DC'

export function updatePostDatas(
  { category, paragraphs, subtitle, title, imageUrls, id, likes },
  dispatch,
  navigate
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
      likes
    })
  );
  navigate("/CreatePost");
}

export async function updatePost(
  id,
  { category, paragraphs, subtitle, title,likes,views }
) {
  const postUpdateRef = doc(db, "blog-posts", id);

  await updateDoc(postUpdateRef  , {
    category: category,
    //  "Sports": Sports,
    paragraphs: paragraphs,
    subtitle: subtitle,
    title: title,
    likes: likes,
    views: views,
  });
  // toast.success("post updated successfully");
}
