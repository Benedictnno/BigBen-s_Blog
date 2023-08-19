import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import moment from "moment/moment";
import { db, storage } from "./FirebaseConfig";
import { collection } from "firebase/firestore";
import { setLoading } from "./Slices/postSlice";

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

export async function getDownloadImageURL(bucket) {
  return await getDownloadURL(ref(storage, bucket));
}

export async function fetchImageUrls(filteredPost, setImageUrls) {
  const urls = await Promise.all(
    filteredPost.map(async ({ imageBucket }) => {
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

