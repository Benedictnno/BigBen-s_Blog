import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import moment from "moment/moment";
import { auth, db, storage } from "./FirebaseConfig";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { setLoading } from "./Slices/postSlice";
import { toast } from "react-toastify";

const BUCKET_URL = "gs://bigbens-blog.appspot.com";
const postCollectionRef = collection(db, "blog-posts");

export async function UploadImage(image, uid, dispatch) {
  const formattedData = moment(new Date()).format("MMMM Do YYYY, h:mm:ss a");
  const bucket = `${BUCKET_URL}/${uid}/${formattedData}.jpg`;
  const fileRef = ref(storage, bucket);
  await uploadBytes(fileRef, image);
  dispatch(setLoading(true));
  alert("Image uploaded");

  return bucket;
}

export function DeletePostImage(imageUrl) {
  const desertRef = ref(storage, imageUrl);
  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      alert("post deleted");
      toast.done("Post deleted");
      // File deleted successfully
    })
    .catch((error) => {
      console.error(error);
      // Uh-oh, an error occurred!
    });
}

export async function getDownloadImageURL(bucket) {
  return await getDownloadURL(ref(storage, bucket));
}

export async function fetchImageUrls(getProfilePostData, setImageUrls) {
  const urls = await Promise.all(
    getProfilePostData.map(async ({ imageBucket }) => {
      const fileRef = ref(storage, imageBucket);
      const downloadUrl = await getDownloadURL(fileRef);
      return downloadUrl;
    })
  );
  setImageUrls(urls);
}

export async function CreatePost() {
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
      uid,
    });
    navigate("/");
  } catch (error) {
    console.log(error.message);
  }
}

export async function deletePost(id, path) {
  const postDoc = doc(db, path, id);
  await deleteDoc(postDoc);
}
