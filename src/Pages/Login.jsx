import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, twitterProvider } from "../FirebaseConfig";
import {
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"; // chooses the the mode at which google authetification happens
import { setUserData, loginAuth, authForm } from "../Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { FaTwitter, FaGithub } from "react-icons/fa";
import { LoginStyle } from "../Styles/LoginStyle";
import { githubAuth, twitterSignIn } from "../Helpers/authHelpers";

const Login = () => {
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
  // x-Ux62jwm3DA7MktUGZAGRSIpVSbm8KqWvCqDuqTYSBz5v3Biw
 

  
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(authForm({ name, value }));
  }

  function logUp() {
    signInWithEmailAndPassword(auth, email, password)
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

  return (
    <LoginStyle>
      <h2>Login / Create An account </h2>
      <form class="form_container">
        <button
          title="Sign In"
          type="button"
          class="sign-in_ggl"
          onClick={() => googleSignIn()}
        >
          <span>
            <FcGoogle />
          </span>

          <span>Sign In with Google</span>
        </button>
        <div class="separator">
          <hr class="line" />
          <span>Or</span>
          <hr class="line" />
        </div>
        <button
          title="Sign In"
          type="button"
          class="sign-in_face"
          onClick={() => twitterSignIn(dispatch, navigate)}
        >
          <span>
            <FaTwitter />
          </span>

          <span>Sign In with twitter</span>
        </button>
        {/* <button
          title="Sign In"
          type="button"
          class="sign-in_apl"
          onClick={() => twitterSignIn()}
        >
          <FaGithub />
          <span>Sign In with Facebook</span>
        </button> */}
        <button
          title="Sign In"
          type="button"
          class="sign-in_apl"
          onClick={() => githubAuth(dispatch, navigate)}
        >
          <span>
            {" "}
            <FaGithub />
          </span>

          <span>Sign In with GitHub</span>
        </button>

        <p class="note">Terms of use &amp; Conditions</p>
      </form>
    </LoginStyle>
  );
};

export default Login;
