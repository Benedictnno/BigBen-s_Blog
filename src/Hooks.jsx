import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import moment from "moment/moment";
import { useSelector } from "react-redux";
import { storage } from "./FirebaseConfig";

const BUCKET_URL = "gs://bigbens-blog.appspot.com";

 export async function UploadImage(image, uid) {
   const formattedData = moment(new Date()).format("MMMM Do YYYY, h:mm:ss a");
   const bucket = `${BUCKET_URL}/${uid}/${formattedData}.jpg`;
   const fileRef = ref(storage, bucket);
   await uploadBytes(fileRef, image);

   alert("Image uploaded");

   return bucket;
 }



export async function getDownloadImageURL(bucket) {
    return await getDownloadURL(ref(storage,bucket))
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
