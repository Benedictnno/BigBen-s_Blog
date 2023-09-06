import { doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db, profileCollectionRef } from "../FirebaseConfig";
import { singlePage } from "../Slices/postSlice";
import { SetProfileData } from "../Slices/ProfileSlice";

export async function getSinglePage(id, dispatch) {
  console.log(id);
  try {
    const docRef = doc(db, "blog-posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      dispatch(singlePage({ data: docSnap.data(), id: docSnap.id }));
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {
    console.error(error);
  }
}
export async function getAuthorProfile(uid, dispatch) {
  console.log(uid);
  const q = query(profileCollectionRef, where("uid", "==", uid));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.data());

    dispatch(SetProfileData(doc.data()));
  });
}
