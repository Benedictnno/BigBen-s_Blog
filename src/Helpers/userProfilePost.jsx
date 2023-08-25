import { addDoc, collection } from "firebase/firestore";
import { UploadImage } from "../Hooks";
import { db } from "../FirebaseConfig";

export async function userProfilePost(
  image,
  { displayName, category, paragraphs, subtitle, title, uid, photoURL }
) {
  const postCollectionRef = collection(db, uid);
  console.log({ displayName, category, paragraphs, subtitle, title, uid });
  if (image) {
    try {
      const bucket = await UploadImage(image, uid);
      await addDoc(postCollectionRef, {
        author: displayName,
        category,
        comments: [],
        likes: 0,
        paragraphs,
        subtitle,
        title,
        imageBucket: bucket,
        author_image: photoURL,
        created_at: moment(new Date()).format("MMMM Do YYYY, h:mm:ss a"),
        uid,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
