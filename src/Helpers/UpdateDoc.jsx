import { arrayUnion, doc, updateDoc } from "firebase/firestore";
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
  dispatch(
    updatePostData({
      id,
      category,
      paragraphs,
      subtitle,
      title,
      imageUrls,
      likes,
    })
  );
  navigate("/CreatePost");
}

export async function updateComment(id, { comment }) {
  const postUpdateRef = doc(db, "blog-posts", id);
  try {
    await updateDoc(postUpdateRef, {
      comments: arrayUnion(comment),
      // "views": views,
    });
    toast.success("Your comment has been added successfully");
  } catch (error) {
    console.error(error);
  }
}
export async function updateLike(id, { like }) {
  const postUpdateRef = doc(db, "blog-posts", id);
  try {
    await updateDoc(postUpdateRef, {
      likes: like,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function updateViews(id, { views }) {
  const postUpdateRef = doc(db, "blog-posts", id);
  try {
    await updateDoc(postUpdateRef, {
      views,
    });
  } catch (error) {
    console.error(error);
  }
}



export async function updatePost(
  id,
  { category, paragraphs, subtitle, title, likes }
) {
  const postUpdateRef = doc(db, "blog-posts", id);
  try {
    await updateDoc(postUpdateRef, {
      category: category,

      paragraphs: paragraphs,
      subtitle: subtitle,
      title: title,
      likes: likes,
    });
  } catch (error) {
    console.error(error);
  }

  // toast.success("post updated successfully");
}
