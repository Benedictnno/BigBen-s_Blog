import { sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "./FirebaseConfig";

export function urlArr(url) {
  // let link = url.toString().join();
  let link = url.split(" ");
  let joint = link.join("-");
  return joint;
}

export function sendEmail() {
  sendEmailVerification(auth.currentUser).then(() => {
    // Email verification sent!
    // ...
    console.log('email sent');
  });
}

export function updateUserProfile({ displayName, photoURL }) {
  updateProfile(auth.currentUser, {
    displayName: "Jane Q. User",
    photoURL: "https://example.com/jane-q-user/profile.jpg",
  })
    .then(() => {
      // Profile updated!
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
    });
}