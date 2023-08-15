import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../FirebaseConfig";
import { signInWithPopup } from "firebase/auth"; // chooses the the mode at which google authetification happens
import { setUserData, loginAuth } from "../Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
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
