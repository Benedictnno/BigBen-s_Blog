import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
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

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav isAuth={isAuth} setIsAuth={setIsAuth} />}>
          <Route index element={<Latest />} />
          <Route path="News" element={<News />} />
          <Route path="Sports" element={<Sports />} />
          <Route path="Entertainment" element={<Entertainment />} />
          <Route path="Music" element={<Music />} />
          <Route path="Movies" element={<Movies />} />
        </Route>

        <Route path="Login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
