import { doc, getDoc, where } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { singlePage } from "../Slices/postSlice";

export async function get(id, dispatch) {
  const docRef = doc(db, "blog-posts", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    dispatch(singlePage(docSnap.data()));
    // console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}
