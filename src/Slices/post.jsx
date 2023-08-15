import { deleteDoc, getDocs, doc, collection } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { getPostData } from "./postSlice";
import { useDispatch } from "react-redux";
 const postCollectionRef = collection(db, "blog-posts");

 async function getPost() {
  const dispatch = useDispatch();

   const data = await getDocs(postCollectionRef);
   /*
    getData iterates through the data and get a selected list of data from the request
    */
   const getData = data.docs.map((items) => ({
     ...items.data(),
     id: items.id,
   }));
   dispatch(getPostData(getData));
 }
export{getPost}