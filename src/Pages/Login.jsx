import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../FirebaseConfig";
import { signInWithPopup } from "firebase/auth"; // chooses the the mode at which google authetification happens
import { loginAuth } from "../Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

useDispatch;
const Login = ({ setIsAuth, isAuth }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  //   const { loginAuth } = useSelector((store) => store.auth);
  //   console.log(loginAuth);
  // handles the google authentication process
  // if signInWithPopup returns positive after passing the auth and the provider as arguments ; sets setIsAuth to true and create a storage space in the localstorage
  function googleSignIn() {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      console.log(result);
      navigate("/");
    });
  }
  return (
    <div>
      <input type="email" placeholder="Email address" />
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
      <button className="login-with-google-btn" onClick={googleSignIn}>
        Sign in using Google
      </button>
    </div>
  );
};

export default Login;
