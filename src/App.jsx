import { useState } from "react";
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Nav from "./Components/Nav";

function App() {
  const [count, setCount] = useState(0);

  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Nav/>}/>
    
  </Routes>
  </BrowserRouter>;
}

export default App;
