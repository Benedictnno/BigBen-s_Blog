import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../FirebaseConfig";

export async function fetchSingleUrls(SingleImage, setImageUrl) {
  try {
    const fileRef = ref(storage, SingleImage);
    const downloadUrl = await getDownloadURL(fileRef);
  
      setImageUrl(downloadUrl);
    
  } catch (error) {
    console.error("Error fetching image URL:", error);
    // Handle the error appropriately, e.g., show an error message to the user.
  }
}
