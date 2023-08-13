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
} from "../src/Pages";
import Nav from "./Components/Nav";
function App() {
  const [count, setCount] = useState(0);

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
