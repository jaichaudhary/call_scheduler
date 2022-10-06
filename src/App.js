import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./Components/Main";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recents" element={<Main />} />
      </Routes>
      {/* <Main /> */}
    </div>
  );
}

export default App;
