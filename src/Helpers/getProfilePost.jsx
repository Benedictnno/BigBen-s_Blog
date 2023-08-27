import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { getProfilePostData } from "../Slices/postSlice";

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
