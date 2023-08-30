// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { FacebookAuthProvider } from "firebase/auth";
import { TwitterAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzbRTaKH4YKcVW8MAa2gbxwsJLegEm3_U",
  authDomain: "bigbens-blog.firebaseapp.com",
  projectId: "bigbens-blog",
  storageBucket: "bigbens-blog.appspot.com",
  messagingSenderId: "571713344477",
  appId: "1:571713344477:web:083cf82cf44d0cdd145c34",
  measurementId: "G-PEBYWV8KKQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const GithubProvider = new GithubAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export const twitterProvider = new TwitterAuthProvider();
// sets up the chosen mode of authentication ready
export const provider = new GoogleAuthProvider();
export const postCollectionRef = collection(db, "blog-posts");

// Now you can use db.collection() and other Firestore methods
