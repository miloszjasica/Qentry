import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CreateEvent from "./pages/CreateEvent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NearbyEvents from "./pages/NearbyEvents";
import TakePartEvents from "./pages/TakePartEvents";
import { useState, useEffect } from "react";

function App() {

  const [search, setSearch] = useState("");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const token = localStorage.getItem("token");


useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  fetch("/api/users/me/", {
    headers: { "Authorization": `Bearer ${token}` },
  })
    .then(res => res.json())
    .then(data => {
      console.log("User fetched:", data);
      setCurrentUser(data);
    })
    .catch(err => console.error(err));
}, []);


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
        <Header search={search} setSearch={setSearch} isExpanded={isSidebarExpanded} user={currentUser}/>
        <div style={{ flex: 1, marginLeft: isSidebarExpanded ? 256 : 80, transition: "margin-left 0.3s", marginTop: "0px", overflow: "visible" }}>
          <Routes>
            <Route path="/" element={<Home search={search} />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> */}
            <Route path="/biore-udzial" element={<TakePartEvents search={search} />} />
            <Route path="/w-poblizu" element={<NearbyEvents search={search} />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/createevent" element={<CreateEvent />} />

          </Routes>
        </div>
    </Router>
  );
}

export default App;
