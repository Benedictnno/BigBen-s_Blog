import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"; // chooses the the mode at which google authetification happens
import { setUserData, loginAuth, authForm } from "../Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMail } from "react-icons/ai";
import { LoginStyle } from "../Styles/LoginStyle";
import { sendEmail } from "../utils";

const SignUp = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    form: { password, email },
  } = useSelector((store) => store.auth);

  // handles the google authentication process
  // if signInWithPopup returns positive after passing the auth and the provider as arguments ; sets setIsAuth to true and create a storage space in the localstorage
  function googleSignIn() {
    signInWithPopup(auth, provider).then(({ user }) => {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("userData", JSON.stringify(user));

      dispatch(setUserData(user));
      dispatch(loginAuth(true));
      navigate("/");
    });
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(authForm({ name, value }));
  }

  function SignUp() {
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // localStorage.setItem("userData", JSON.stringify(user));
        // sendEmail();
        // dispatch(setUserData(user));
        // dispatch(loginAuth(true));
        // navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  }
  return (
    <LoginStyle>
      <form action="" method="post">
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
        <button type="button" onClick={() => SignUp()}>
          Submit
        </button>
      </form>
    </LoginStyle>
  );
};

export default SignUp;
