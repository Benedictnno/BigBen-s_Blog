import { addDoc, collection } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { toast } from "react-toastify";
import { setLoading, setPage } from "../Slices/postSlice";

export async function UploadProfile(
  dispatch,
  navigate,
  { fullName, Gender, Bio, Date ,uid,image}
) {
  const profileCollectionRef = collection(db, "User-Profile");

  try {
    // dispatch(setPage(false));

    // const bucket = await UploadImage(image, uid, dispatch);
    // fetchSingleUrls(bucket, setImageUrl);
    await addDoc(profileCollectionRef, {
      Bio,
      DateOfBirth: Date,
      Gender,
      fullName,
      uid,
      image,
    });
    toast.success("Profile Updated successfully");
    navigate("/");
    dispatch(setLoading(false));
    dispatch(setPage(true));
    // dispatch(clearValues());
  } catch (error) {
    console.log(error.message);
    toast.error("Post error");
  }
}
