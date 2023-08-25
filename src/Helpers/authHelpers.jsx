import { signInWithPopup, GithubAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { GithubProvider, auth, twitterProvider } from "../FirebaseConfig";

export function githubAuth() {
  signInWithPopup(auth, GithubProvider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...

       localStorage.setItem("isAuth", true);
       localStorage.setItem("userData", JSON.stringify(user));

       dispatch(setUserData(user));
       dispatch(loginAuth(true));
       navigate("/");
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    });
}


 export function twitterSignIn(dispatch, navigate) {
   signInWithPopup(auth, twitterProvider)
     .then((result) => {
       console.log(result);
       // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
       // You can use these server side with your app's credentials to access the Twitter API.
       const credential = TwitterAuthProvider.credentialFromResult(result);
       const token = credential.accessToken;
       const secret = credential.secret;

       // The signed-in user info.
       const user = result.user;
       localStorage.setItem("isAuth", true);
       localStorage.setItem("userData", JSON.stringify(user));

       dispatch(setUserData(user));
       dispatch(loginAuth(true));
       navigate("/");

       console.log(user);
       // IdP data available using getAdditionalUserInfo(result)
       // ...
     })
     .catch((error) => {
       // Handle Errors here.
       const errorCode = error.code;
       const errorMessage = error.message;
       console.log(errorMessage);
       // The email of the user's account used.
       // const email = error.customData.email;
       // The AuthCredential type that was used.
       console.log(errorCode);
       const credential = TwitterAuthProvider.credentialFromError(error);
       console.log(credential);
       // ...
     });
 }