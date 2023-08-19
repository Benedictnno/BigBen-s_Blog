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
import SinglePage from "./Pages/SinglePage";

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
          <Route path="Movies" element={<Movies />} />
        </Route>

        <Route path="/Login" element={<Login />} />
        <Route path="/SinglePage" element={<SinglePage />} />
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
