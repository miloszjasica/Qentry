import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      {/* Usuń outer div style={{ display: "flex" }} jeśli ma sens tylko dla layoutu Home */}
      <Header search={search} setSearch={setSearch} />
      <Navbar />

      {/* Dynamiczny Kontent */}
      <div style={{ flex: 1, marginLeft: "256px", marginTop: "72px" }}>

        <Routes>
          {/* Użyj elementu Home z propsem 'search' tylko na ścieżce głównej */}
          <Route path="/" element={<Home search={search} />} />

          {/* Na tych ścieżkach renderuj tylko komponent Login/Register */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
