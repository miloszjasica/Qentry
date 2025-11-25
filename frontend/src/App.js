import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from "react";

function App() {

  const [search, setSearch] = useState("");

  return (
    <Router>
      <div style={{ display: "flex" }}>

        <div style={{ flex: 1 }}>
          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
        <Navbar />
        <Header search={search} setSearch={setSearch} />
        <div style={{ flex: 1, marginLeft: "256px", marginTop: "72px" }}>
          <Home search={search} />
        </div>
    </Router>
  );
}

export default App;
