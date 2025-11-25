import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Header from "./components/Header";
import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from "react";

function App() {

  const [search, setSearch] = useState("");

  return (
    <Router>
        <Navbar />
        <Header search={search} setSearch={setSearch} />
        <div style={{ flex: 1, marginLeft: "256px", marginTop: "72px" }}>
          <Home search={search} />
        </div>
    </Router>
  );
}

export default App;
