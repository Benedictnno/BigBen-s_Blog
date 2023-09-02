import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { getProfilePostData } from "../Slices/postSlice";
import { query, where } from "firebase/firestore";
import { postCollectionRef } from "../FirebaseConfig";

export async function getProfilePost(uid, dispatch) {
  const postCollectionRef = collection(db, uid);

  const data = await getDocs(postCollectionRef);
  /*
    getData iterates through the data and get a selected list of data from the request
    */
  const getData = data.docs.map((items) => ({
    ...items.data(),
    id: items.id,
  }));
  dispatch(getProfilePostData(getData));
  //   dispatch(setLoading(false));
  console.log(getData);
}

export async function profilePost(author, dispatch) {
 
  const q = query(postCollectionRef, where("author", "==", author));
  let ProfilePostData = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    // console.log(doc);

    ProfilePostData.push(doc.data());
  });
  console.log(ProfilePostData);
  dispatch(getProfilePostData(ProfilePostData));
}
