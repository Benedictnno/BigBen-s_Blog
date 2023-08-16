import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Movies,
  Music,
  // Latest,
  News,
  Sports,
  Entertainment,
  Login,
  Latest,
} from "../src/Pages";
// import firebase from "firebase/app";
import "firebase/firestore";
import Nav from "./Components/Nav";
import Profile from "./Pages/Profile";
import { loadUser } from "./Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./Components/ProtectedRoute";
import { deleteDoc, getDocs, doc, collection } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import { getPostData } from "./Slices/postSlice";
import Home from "./Pages/Home";

function App() {
  const dispatch = useDispatch();
  const postCollectionRef = collection(db, "blog-posts");

  async function getPost() {
    const data = await getDocs(postCollectionRef);
    /*
    getData iterates through the data and get a selected list of data from the request
    */
    const getData = data.docs.map((items) => ({
      ...items.data(),
      id: items.id,
    }));
    dispatch(getPostData(getData));
  }

  const { userData } = useSelector((store) => store.auth);

  // Retrieve data for a specific user
  // const userId = userData.uuid; // Replace with the user ID you want to retrieve data for

  // const userRef = doc(postCollectionRef, userId);

  // useEffect(() => {
  //   userRef
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         const userData = doc.data();
  //         console.log(userData);
  //       } else {
  //         console.log("User does not exist");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  useEffect(() => {
    dispatch(loadUser());
    getPost();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Latest />} />
          <Route path="News" element={<News />} />
          <Route path="Sports" element={<Sports />} />
          <Route path="Entertainment" element={<Entertainment />} />
          <Route path="Music" element={<Music />} />
        </Route>

        <Route path="Movies" element={<Movies />} />
        <Route path="/Login" element={<Login />} />
        <Route
          path="/Profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
