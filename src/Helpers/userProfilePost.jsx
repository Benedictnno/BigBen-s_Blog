import { addDoc, collection, setDoc } from "firebase/firestore";
import { UploadImage } from "../Hooks";
import { db } from "../FirebaseConfig";
import moment from "moment/moment";


export async function userProfilePost(
  image,dispatch,
  { displayName, category, paragraphs, subtitle, title, uid, photoURL }
) {
  const postCollectionRef = collection(db, uid);
  if (image) {
    try {
      const bucket = await UploadImage(image, uid, dispatch);
      await addDoc(postCollectionRef, {
        author: displayName,
        category,
        comments: [],
        likes: 0,
        paragraphs,
        subtitle,
        title,
        imageBucket: bucket,
        // author_image: photoURL,
        created_at: moment(new Date()).format("MMMM Do YYYY, h:mm:ss a"),
        uid,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
