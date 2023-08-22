import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../FirebaseConfig";

export async function fetchSingleUrls(SingleImage, setImageUrls) {
  const urls = await Promise.all(
    async () => {
      const fileRef = ref(storage, SingleImage);
      const downloadUrl = await getDownloadURL(fileRef);
      return downloadUrl;
    }
  );
  setImageUrls(urls);
}
