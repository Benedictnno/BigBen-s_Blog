import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../FirebaseConfig";

export function SignUpContainer( email, password,dispatch ) {
 

  function SignUp() {
console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("userData", JSON.stringify(user));

        dispatch(setUserData(user));
        dispatch(loginAuth(true));
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

   SignUp();
}
