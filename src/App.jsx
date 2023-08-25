import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Movies,
  Music,
  News,
  Sports,
  Entertainment,
  Login,
  Latest,
} from "../src/Pages";
import "firebase/firestore";
import Nav from "./Components/Nav";
import Profile from "./Pages/Profile";
import { loadUser } from "./Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./Components/ProtectedRoute";
import { deleteDoc, getDocs, doc, collection } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import { getPostData, setLoading } from "./Slices/postSlice";
import Home from "./Pages/Home";
import SinglePage from "./Pages/SinglePage";
import ProfilePage from "./Pages/ProfilePage";
import Loading from "../src/Components/Loading";
import { ToastContainer, toast } from "react-toastify";
import { urlArr } from "./utils";
import SignUp from "./Pages/SignUp";
import SetUpProfile from "./Pages/SetUpProfile";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const dispatch = useDispatch();
  const postCollectionRef = collection(db, "blog-posts");
  const { isLoading, setPage } = useSelector((store) => store.post);
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
    dispatch(setLoading(false));
  }

  const {
    singlePageData: { title },
  } = useSelector((store) => store.post);

  useEffect(() => {
    dispatch(loadUser());
    getPost();
    dispatch(setLoading(true));
  }, [setPage]);
  // console.log(urlArr(title));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Latest />} />
          <Route path="/News" element={<News />}></Route>
          <Route path="/Sports" element={<Sports />}></Route>
          <Route path="/Entertainment" element={<Entertainment />}></Route>
          <Route path="/Music" element={<Music />}></Route>
          <Route path="/Movies" element={<Movies />}></Route>
        </Route>

        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path={`/jjj`} element={<SinglePage />} />
        <Route path="/CreatePost" element={<Profile />} />
        <Route path="/SetUpProfile" element={<SetUpProfile />} />
        <Route
          path="/ProfilePage"
          element={
            // <ProtectedRoute>
            <ProfilePage />
            // </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
