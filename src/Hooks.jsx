import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import { storage } from "./FirebaseConfig";

const BUCKET_URL = "gs://bigbens-blog.appspot.com";

export async function UploadImage() {
  const {
    userData: { uid },
  } = useSelector((store) => store.auth);
  const {
    post: { image },
  } = useSelector((store) => store.post);

  const formattedData = moment(new Date()).format("MMMM d, YYYY");
  const bucket = `${BUCKET_URL}/${uid}/${formattedData}.jpg`;
  const fileRef = ref(storage, bucket);
  await uploadBytes(fileRef, image);
  alert("Image uploaded");
  
  return bucket;
}



export async function getDownloadImageURL(bucket) {
    return await getDownloadURL(ref(storage,bucket))
}