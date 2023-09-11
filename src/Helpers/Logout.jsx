import { signOut } from "firebase/auth";
import { loginAuth } from "../Slices/authSlice";
import { auth } from "../FirebaseConfig";

export function LogOut(dispatch, navigate) {
  
  signOut(auth).then(() => {
    localStorage.clear();
    dispatch(loginAuth(false));
    navigate("/");
  });
}
