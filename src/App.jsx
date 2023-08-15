import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Movies,
  Music,
  Latest,
  News,
  Sports,
  Entertainment,
  Login,
} from "../src/Pages";
import Nav from "./Components/Nav";
import Profile from "./Pages/Profile";
import { loadUser,  } from "./Slices/authSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadUser());
  },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index element={<Latest />} />
          <Route path="News" element={<News />} />
          <Route path="Sports" element={<Sports />} />
          <Route path="Entertainment" element={<Entertainment />} />
          <Route path="Music" element={<Music />} />
          <Route path="Movies" element={<Movies />} />
        </Route>

        <Route path="Login" element={<Login />} />
        <Route path="Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
