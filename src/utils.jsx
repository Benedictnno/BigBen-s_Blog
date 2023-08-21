import { sendEmailVerification } from "firebase/auth";
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