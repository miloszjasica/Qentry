import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NearbyEvents from "./pages/NearbyEvents";
import { useState } from "react";

function App() {

  const [search, setSearch] = useState("");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <Router>
      <div style={{ display: "flex" }}>

        <div style={{ flex: 1, marginLeft: isSidebarExpanded ? 256 : 80, transition: "margin-left 0.3s",  marginTop: "72px" }}>
          <Routes>

            {/* <Route path="/" element={<Home search={search} />} /> */}

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
        <Navbar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded}/>
        <Header search={search} setSearch={setSearch} isExpanded={isSidebarExpanded} />
        <div style={{ flex: 1, marginLeft: isSidebarExpanded ? 256 : 80, transition: "margin-left 0.3s", marginTop: "72px", overflow: "visible" }}>
          <Routes>
            <Route path="/" element={<Home search={search} />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> */}
            <Route path="/w-poblizu" element={<NearbyEvents search={search} />} />
            <Route path="/profil" element={<Profile />} />

          </Routes>
        </div>
    </Router>
  );
}

export default App;
