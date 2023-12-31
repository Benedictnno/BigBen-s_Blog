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
import CreatePost from "./Pages/CreatePost";
import { loadUser } from "./Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./Components/ProtectedRoute";
import {  getDocs, collection } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import { getPostData, setLoading } from "./Slices/postSlice";
import Home from "./Pages/Home";
import SinglePage from "./Pages/SinglePage";
import ProfilePage from "./Pages/ProfilePage";
import Loading from "../src/Components/Loading";
import { ToastContainer } from "react-toastify";
import SignUp from "./Pages/SignUp";
import SetUpProfile from "./Pages/SetUpProfile";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./Pages/ErrorPage";
import ShowProfile from "./Pages/ShowProfile";

function App() {
  const dispatch = useDispatch();
  const postCollectionRef = collection(db, "blog-posts");
  const { isLoading, setPage, searchValue } = useSelector(
    (store) => store.post
  );
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

  useEffect(() => {
    dispatch(loadUser());
    getPost();
    dispatch(setLoading(true));
  }, [setPage, searchValue]);


  useEffect(() => {
    getPost();
  }, [searchValue]);
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

        <Route path="/Profile" element={<ShowProfile />} />
        <Route path={`/Detailed`} element={<SinglePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/CreatePost" element={<CreatePost />} />
          <Route path="/SetUpProfile" element={<SetUpProfile />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
        </Route>
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
